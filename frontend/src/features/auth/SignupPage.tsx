import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  signup,
  SIGNUP_FIELDS,
  type FieldErrors,
  type SignupInput,
  type User,
} from '@/lib/api'
import { validateSignup } from './signup-validation'

type FieldProps = {
  id: keyof SignupInput
  label: string
  type: 'text' | 'email' | 'password'
  autoComplete: string
  required?: boolean
  error?: string
}

function Field({ id, label, type, autoComplete, required, error }: FieldProps) {
  const errorId = `${id}-error`
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function readForm(form: HTMLFormElement): SignupInput {
  const data = new FormData(form)
  const value = (key: keyof SignupInput) => String(data.get(key) ?? '')
  const fullName = value('fullName').trim()
  return {
    // The backend requires the key to be present; null means "not provided".
    fullName: fullName === '' ? null : fullName,
    email: value('email').trim(),
    password: value('password'),
    passwordConfirmation: value('passwordConfirmation'),
  }
}

/** Moves focus to the first invalid field so screen readers announce its error. */
function focusFirstInvalid(form: HTMLFormElement, errors: FieldErrors) {
  const field = SIGNUP_FIELDS.find((name) => errors[name])
  if (!field) return
  const element = form.elements.namedItem(field)
  if (element instanceof HTMLElement) element.focus()
}

export function SignupPage() {
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [createdUser, setCreatedUser] = useState<User | null>(null)
  // State updates are async, so a ref blocks a second submit in the same tick.
  const inFlight = useRef(false)
  const successTitle = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (createdUser) successTitle.current?.focus()
  }, [createdUser])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current) return
    const form = event.currentTarget
    setFormError(null)

    const input = readForm(form)
    const clientErrors = validateSignup(input)
    setErrors(clientErrors)
    if (Object.keys(clientErrors).length > 0) {
      focusFirstInvalid(form, clientErrors)
      return
    }

    inFlight.current = true
    setSubmitting(true)
    try {
      const result = await signup(input)
      if (result.status === 'ok') {
        setCreatedUser(result.user)
      } else if (result.status === 'validation') {
        setErrors(result.errors)
        focusFirstInvalid(form, result.errors)
      } else {
        setFormError(result.message)
      }
    } finally {
      inFlight.current = false
      setSubmitting(false)
    }
  }

  if (createdUser) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <h1 ref={successTitle} tabIndex={-1} className="outline-none">
              ¡Cuenta creada!
            </h1>
          </CardTitle>
          <CardDescription>
            Tu usuario <strong>{createdUser.email}</strong> se creó
            correctamente.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <h1>Crear cuenta</h1>
        </CardTitle>
        <CardDescription>Regístrate con tu correo y una clave.</CardDescription>
      </CardHeader>
      <form noValidate onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <Field
            id="fullName"
            label="Nombre (opcional)"
            type="text"
            autoComplete="name"
            error={errors.fullName}
          />
          <Field
            id="email"
            label="Correo"
            type="email"
            autoComplete="email"
            required
            error={errors.email}
          />
          <Field
            id="password"
            label="Clave"
            type="password"
            autoComplete="new-password"
            required
            error={errors.password}
          />
          <Field
            id="passwordConfirmation"
            label="Confirmar clave"
            type="password"
            autoComplete="new-password"
            required
            error={errors.passwordConfirmation}
          />
          <p role="alert" className="text-sm text-destructive empty:hidden">
            {formError}
          </p>
        </CardContent>
        <CardFooter className="mt-4">
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
