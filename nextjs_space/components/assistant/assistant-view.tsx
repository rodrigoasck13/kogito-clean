
'use client'

import { useState } from 'react'
import { Assistant } from '@prisma/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Copy, CheckCircle, ArrowLeft, Edit, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface AssistantViewProps {
  assistant: Assistant
}

export default function AssistantView({ assistant }: AssistantViewProps) {
  const [copied, setCopied] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const profileData = assistant.profileData as any
  const router = useRouter()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(assistant.generatedPrompt)
      setCopied(true)
      toast.success('Prompt copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const regeneratePrompt = async () => {
    setRegenerating(true)
    
    try {
      const response = await fetch('/api/assistant', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileData }),
      })

      if (response.ok) {
        toast.success('Prompt regenerated successfully!')
        router.refresh()
      } else {
        const data = await response.json()
        toast.error(data.message || 'Failed to regenerate prompt')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setRegenerating(false)
    }
  }

  const profileSections = [
    {
      title: 'Desires & Goals',
      content: profileData?.desires || 'Not specified',
      icon: '🎯'
    },
    {
      title: 'Core Interests',
      content: profileData?.interests || 'Not specified',
      icon: '💡'
    },
    {
      title: 'Dreams & Vision',
      content: profileData?.dreams || 'Not specified',
      icon: '🌟'
    },
    {
      title: 'Knowledge & Expertise',
      content: profileData?.knowledge || 'Not specified',
      icon: '🧠'
    },
    {
      title: 'Obstacles & Challenges',
      content: profileData?.obstacles || 'Not specified',
      icon: '🚧'
    },
    {
      title: 'Values & Principles',
      content: profileData?.values || 'Not specified',
      icon: '⚖️'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button variant="ghost" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">Kogito</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link href="/profile-builder">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Button
                onClick={regeneratePrompt}
                disabled={regenerating}
                variant="outline"
              >
                <RotateCcw className={`h-4 w-4 mr-2 ${regenerating ? 'animate-spin' : ''}`} />
                {regenerating ? 'Regenerating...' : 'Regenerate Prompt'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Assistant Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <Brain className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{assistant.assistantName}</h1>
          <p className="text-xl text-gray-600 mb-4">Your personalized AI assistant</p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline">{profileData?.tone || 'thoughtful'} tone</Badge>
            <Badge variant="outline">{profileData?.vocabulary || 'moderate'} vocabulary</Badge>
            <Badge variant="outline">{profileData?.decisionStyle || 'analytical'} decisions</Badge>
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Communication Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="font-semibold text-gray-900 mb-2">Tone</h3>
                <p className="text-gray-600 capitalize">{profileData?.tone || 'Thoughtful'}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="font-semibold text-gray-900 mb-2">Vocabulary</h3>
                <p className="text-gray-600 capitalize">{profileData?.vocabulary || 'Moderate'}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">🤔</div>
                <h3 className="font-semibold text-gray-900 mb-2">Decision Style</h3>
                <p className="text-gray-600 capitalize">{profileData?.decisionStyle || 'Analytical'}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Profile Details */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileSections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Generated Prompt */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Complete AI Assistant Prompt
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </CardTitle>
              <CardDescription>
                This is your complete, personalized AI assistant prompt ready for use with any AI platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
                  <code>{assistant.generatedPrompt}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Back to Dashboard
            </Button>
          </Link>
          <Link href="/results">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              View Results Page
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
