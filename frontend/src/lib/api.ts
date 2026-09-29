const API_URL: string =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api/v1'

/** User shape returned by the backend's UserTransformer. */
export type User = {
  id: number
  fullName: string | null
  email: string
  createdAt: string
  updatedAt: string
  initials: string
}

export type SignupInput = {
  fullName: string | null
  email: string
  password: string
  passwordConfirmation: string
}

/** Form fields in display order; used to validate API field names. */
export const SIGNUP_FIELDS = [
  'fullName',
  'email',
  'password',
  'passwordConfirmation',
] as const satisfies readonly (keyof SignupInput)[]

/** One entry of the 422 body produced by VineJS validation failures. */
type ApiValidationError = { message: string; field: string; rule: string }

export type FieldErrors = Partial<Record<keyof SignupInput, string>>

export type SignupResult =
  | { status: 'ok'; user: User }
  | { status: 'validation'; errors: FieldErrors }
  | { status: 'error'; message: string }

const MESSAGES = {
  network:
    'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
  rateLimited:
    'Demasiados intentos seguidos. Espera un momento antes de volver a intentarlo.',
  server:
    'El servidor tuvo un problema al crear la cuenta. Inténtalo de nuevo en unos minutos.',
  invalidData: 'Revisa los datos del formulario e inténtalo de nuevo.',
}

const SERVER_MESSAGES: Record<string, string> = {
  'email:required': 'Ingresa tu correo.',
  'email:email': 'Ingresa un correo válido.',
  'email:maxLength': 'El correo no puede superar los 254 caracteres.',
  'email:database.unique': 'Este correo ya está registrado.',
  'password:required': 'Ingresa una clave.',
  'password:minLength': 'La clave debe tener al menos 8 caracteres.',
  'password:maxLength': 'La clave no puede superar los 32 caracteres.',
  'passwordConfirmation:required': 'Repite la clave.',
  'passwordConfirmation:sameAs': 'Las claves no coinciden.',
}
const FALLBACK_FIELD_MESSAGE = 'Revisa este campo.'

function isSignupField(field: string): field is keyof SignupInput {
  return (SIGNUP_FIELDS as readonly string[]).includes(field)
}

function toFieldErrors(errors: ApiValidationError[]): FieldErrors {
  const result: FieldErrors = {}
  for (const { field, rule } of errors) {
    if (!isSignupField(field)) continue
    result[field] ??=
      SERVER_MESSAGES[`${field}:${rule}`] ?? FALLBACK_FIELD_MESSAGE
  }
  return result
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export async function signup(input: SignupInput): Promise<SignupResult> {
  let response: Response
  try {
    response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    })
  } catch {
    return { status: 'error', message: MESSAGES.network }
  }

  const body = await readJson(response)

  if (response.ok) {
    const user = (body as { data?: { user?: User } } | null)?.data?.user
    return user
      ? { status: 'ok', user }
      : { status: 'error', message: MESSAGES.server }
  }

  if (response.status === 422) {
    const apiErrors = (body as { errors?: unknown } | null)?.errors
    const errors = Array.isArray(apiErrors)
      ? toFieldErrors(apiErrors as ApiValidationError[])
      : {}
    // A 422 the form cannot attach to any field still needs a visible message.
    return Object.keys(errors).length > 0
      ? { status: 'validation', errors }
      : { status: 'error', message: MESSAGES.invalidData }
  }

  if (response.status === 429) {
    return { status: 'error', message: MESSAGES.rateLimited }
  }

  return { status: 'error', message: MESSAGES.server }
}
