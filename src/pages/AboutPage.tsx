export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 pt-20 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          About <span className="gradient-text">OMINOUS</span>
        </h1>
        <div className="space-y-8">
          <div className="glass-dark p-8">
            <h2 className="text-2xl font-bold text-white mb-4">What is OMINOUS?</h2>
            <p className="text-slate-300 leading-relaxed">
              OMINOUS is an advanced AI assistant designed to help students learn faster, solve problems,
              generate ideas, and explore knowledge through cutting-edge artificial intelligence technology.
            </p>
          </div>
          <div className="glass-dark p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Created by Vedant Nalawade</h2>
            <p className="text-slate-300 leading-relaxed">
              This platform represents the future of intelligent learning, where technology and education
              come together seamlessly to help students excel.
            </p>
          </div>
          <div className="glass-dark p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Powered by Groq</h2>
            <p className="text-slate-300 leading-relaxed">
              OMINOUS uses Groq's lightning-fast AI inference engine to provide instant, accurate responses
              to your questions without any complicated setup or login required.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}