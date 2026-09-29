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

/** One entry of the 422 body produced by VineJS validation failures. */
type ApiValidationError = { message: string; field: string; rule: string }

export type FieldErrors = Partial<Record<keyof SignupInput, string>>

export type SignupResult =
  | { status: 'ok'; user: User }
  | { status: 'validation'; errors: FieldErrors }
  | { status: 'network' }

const SERVER_MESSAGES: Record<string, string> = {
  'email:database.unique': 'Este correo ya está registrado.',
  'email:email': 'Ingresa un correo válido.',
  'password:minLength': 'La clave debe tener al menos 8 caracteres.',
  'password:maxLength': 'La clave no puede superar los 32 caracteres.',
  'passwordConfirmation:sameAs': 'Las claves no coinciden.',
}

function toFieldErrors(errors: ApiValidationError[]): FieldErrors {
  const result: FieldErrors = {}
  for (const { field, rule, message } of errors) {
    const key = field as keyof SignupInput
    result[key] ??= SERVER_MESSAGES[`${field}:${rule}`] ?? message
  }
  return result
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
    return { status: 'network' }
  }

  if (response.ok) {
    const body: { data: { user: User } } = await response.json()
    return { status: 'ok', user: body.data.user }
  }

  if (response.status === 422) {
    const body: { errors?: ApiValidationError[] } = await response.json()
    return { status: 'validation', errors: toFieldErrors(body.errors ?? []) }
  }

  return { status: 'network' }
}
