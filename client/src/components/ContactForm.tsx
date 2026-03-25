import { useState } from 'react'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const formspreeId = import.meta.env.VITE_FORMSPREE_ID || 'mjgolzlrl'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [validationError, setValidationError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setValidationError('')

    if (!EMAIL_RE.test(email)) {
      setValidationError('Please enter a valid email address.')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const labelClass = 'block font-mono text-xs text-text-muted uppercase tracking-wider mb-1.5'
  const inputClass =
    'w-full bg-bg-surface border border-border rounded-lg px-4 py-3 text-text focus:border-accent-warm focus:outline-none transition-colors'

  return (
    <form
      onSubmit={handleSubmit}
      action={`https://formspree.io/f/${formspreeId}`}
      method="POST"
      noValidate
    >
      {/* Name */}
      <div className="mb-5">
        <label htmlFor="cf-name" className={labelClass}>
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          disabled={status === 'loading' || status === 'success'}
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="cf-email" className={labelClass}>
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          disabled={status === 'loading' || status === 'success'}
        />
      </div>

      {/* Message */}
      <div className="mb-6">
        <label htmlFor="cf-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} min-h-[120px] resize-y`}
          disabled={status === 'loading' || status === 'success'}
        />
      </div>

      {/* Validation error */}
      {validationError && (
        <p className="mb-4 text-sm text-amber-400" role="alert">
          {validationError}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="bg-accent-warm text-bg font-semibold px-6 py-3 rounded-lg hover:bg-accent-warm-hover transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {/* Success message */}
      {status === 'success' && (
        <p className="mt-4 text-sm text-green-400" role="status">
          Message sent — I'll get back to you soon.
        </p>
      )}

      {/* Error message */}
      {status === 'error' && (
        <p className="mt-4 text-sm text-amber-400" role="alert">
          Something went wrong. Try emailing me directly at{' '}
          <a
            href="mailto:sardellajeffrey123@gmail.com"
            className="underline hover:text-text transition-colors"
          >
            sardellajeffrey123@gmail.com
          </a>
          .
        </p>
      )}
    </form>
  )
}
