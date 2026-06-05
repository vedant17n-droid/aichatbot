import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 pt-20 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <form onSubmit={handleSubmit} className="glass-dark p-8 space-y-4">
          <input type="text" placeholder="Your name" required className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg" />
          <input type="email" placeholder="Your email" required className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg" />
          <textarea placeholder="Your message" rows={5} required className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg" />
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 rounded-lg">
            Send Message
          </button>
          {submitted && <div className="bg-green-500/20 text-green-300 p-3 rounded-lg">✓ Thank you!</div>}
        </form>
      </div>
    </div>
  )
}