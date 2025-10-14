
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Brain, Users, Lightbulb, Zap, ArrowRight, MessageCircle } from 'lucide-react'

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Kogito</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Think. Reflect. <span className="text-blue-600">Create Your AI.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Kogito helps you build a personal assistant that thinks like you do.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Start Building Yours
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Four simple steps to create your personalized AI assistant</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-blue-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Discover Yourself</h3>
              <p className="text-gray-600">Complete our thoughtful questionnaire to explore your goals, interests, and values.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-blue-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Define Your Voice</h3>
              <p className="text-gray-600">Map your communication style, tone preferences, and decision-making approach.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-blue-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Train Your Agent</h3>
              <p className="text-gray-600">Our system generates a comprehensive prompt that captures your unique thinking patterns.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-blue-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Deploy Anywhere</h3>
              <p className="text-gray-600">Use your personalized AI assistant across different platforms and applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">The Philosophy Behind Kogito</h2>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <Lightbulb className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Kogito comes from René Descartes' famous phrase <em>"Cogito, ergo sum"</em> — "I think, therefore I am."
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe your AI assistant should be born from your thinking, not replace it. Kogito creates human-centered AI that reflects your personality, captures your emotional and behavioral patterns, and amplifies your unique decision-making process.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Kogito</span>
            </div>
            <div className="flex space-x-6">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Login
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-600">
            <p>&copy; 2024 Kogito. Think. Reflect. Create Your AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
