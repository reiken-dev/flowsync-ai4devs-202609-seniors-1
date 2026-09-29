import { useState, type FormEvent } from 'react'
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
  error?: string
}

function Field({ id, label, type, autoComplete, error }: FieldProps) {
  const errorId = `${id}-error`
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
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

export function SignupPage() {
  const [errors, setErrors] = useState<FieldErrors>({})
  const [networkError, setNetworkError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [createdUser, setCreatedUser] = useState<User | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNetworkError(false)

    const input = readForm(event.currentTarget)
    const clientErrors = validateSignup(input)
    setErrors(clientErrors)
    if (Object.keys(clientErrors).length > 0) return

    setSubmitting(true)
    const result = await signup(input)
    setSubmitting(false)

    if (result.status === 'ok') setCreatedUser(result.user)
    else if (result.status === 'validation') setErrors(result.errors)
    else setNetworkError(true)
  }

  if (createdUser) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>¡Cuenta creada!</CardTitle>
          <CardDescription role="status">
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
        <CardTitle>Crear cuenta</CardTitle>
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
            error={errors.email}
          />
          <Field
            id="password"
            label="Clave"
            type="password"
            autoComplete="new-password"
            error={errors.password}
          />
          <Field
            id="passwordConfirmation"
            label="Confirmar clave"
            type="password"
            autoComplete="new-password"
            error={errors.passwordConfirmation}
          />
          {networkError && (
            <p role="alert" className="text-sm text-destructive">
              No pudimos conectar con el servidor. Inténtalo de nuevo en unos
              minutos.
            </p>
          )}
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
