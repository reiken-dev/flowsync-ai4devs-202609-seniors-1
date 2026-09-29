import type { FieldErrors, SignupInput } from '@/lib/api'

// Mirrors signupValidator in backend/app/validators/user.ts so invalid data
// never reaches the API. Uniqueness of the email can only be checked server-side.
const EMAIL_MAX_LENGTH = 254
const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 32
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateSignup(input: SignupInput): FieldErrors {
  const errors: FieldErrors = {}

  if (!input.email) {
    errors.email = 'Ingresa tu correo.'
  } else if (!EMAIL_PATTERN.test(input.email)) {
    errors.email = 'Ingresa un correo válido.'
  } else if (input.email.length > EMAIL_MAX_LENGTH) {
    errors.email = `El correo no puede superar los ${EMAIL_MAX_LENGTH} caracteres.`
  }

  if (!input.password) {
    errors.password = 'Ingresa una clave.'
  } else if (input.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `La clave debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`
  } else if (input.password.length > PASSWORD_MAX_LENGTH) {
    errors.password = `La clave no puede superar los ${PASSWORD_MAX_LENGTH} caracteres.`
  }

  if (!input.passwordConfirmation) {
    errors.passwordConfirmation = 'Repite la clave.'
  } else if (input.passwordConfirmation !== input.password) {
    errors.passwordConfirmation = 'Las claves no coinciden.'
  }

  return errors
}
