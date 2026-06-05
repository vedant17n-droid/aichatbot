import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Zap, Brain } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-purple-500/50">
            <Sparkles size={16} className="text-purple-400" />
            <span className="text-sm text-purple-300">Powered by Groq AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white">
            <span className="gradient-text">OMINOUS</span>
          </h1>

          <p className="text-2xl md:text-3xl text-slate-300">
            The Future of Intelligent Learning and AI Assistance
          </p>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Advanced AI assistant designed to help students learn faster, solve problems, and explore knowledge.
          </p>

          <p className="text-sm text-purple-400 font-semibold">Created by Vedant Nalawade</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/chat" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              Start Chatting
              <ArrowRight size={20} />
            </Link>
            <Link to="/features" className="inline-flex items-center justify-center gap-2 px-8 py-3 glass-dark text-white font-semibold rounded-lg hover:bg-white/20 transition-all">
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose OMINOUS?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: 'Lightning Fast', desc: 'Powered by Groq for ultra-fast responses' },
            { icon: Brain, title: 'Smart Learning', desc: 'Designed for students with homework help' },
            { icon: Sparkles, title: 'Beautiful UI', desc: 'Modern futuristic design' },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="glass-dark p-6 hover:bg-white/20 transition-all">
              <Icon size={32} className="text-purple-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-slate-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}