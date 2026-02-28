import { useState } from 'react'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'mjgezlrl'

function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-8 pb-16 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CTA card */}
        <div className="bento-card p-8 bg-text text-white flex flex-col justify-between min-h-[280px]">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Let's connect</p>
            <h2 className="text-2xl font-bold mb-3">
              Got a project in mind?
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              I'm actively looking for full-stack and backend developer roles.
              Let's chat about how I can help.
            </p>
          </div>
          <div className="flex gap-3 mt-6">
            <a
              href="https://github.com/Jsarde"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/jeffrey-sardella"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Contact form - spans 2 cols */}
        <div className="bento-card md:col-span-2 p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[240px] text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl mb-4">
                ✓
              </div>
              <p className="font-semibold text-lg mb-1">Message sent!</p>
              <p className="text-sm text-text-muted mb-4">I'll get back to you soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-sm text-primary hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 bg-bg border border-black/5 rounded-xl text-text placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 bg-bg border border-black/5 rounded-xl text-text placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="What's on your mind?"
                  className="w-full px-4 py-2.5 bg-bg border border-black/5 rounded-xl text-text placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-y"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-2.5 bg-text text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactSection
