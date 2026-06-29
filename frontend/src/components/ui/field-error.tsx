interface FieldErrorProps {
  message?: string | undefined
}

const FieldError = ({ message }: FieldErrorProps) =>
  message ? (
    <p className='mt-1.5 text-xs text-destructive animate-fade-in'>{message}</p>
  ) : null

export { FieldError }
