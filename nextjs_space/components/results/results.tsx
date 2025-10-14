
'use client'

import { useState } from 'react'
import { Assistant } from '@prisma/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Copy, CheckCircle, ArrowLeft, MessageCircle, Lightbulb, Target, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { generateExampleResponses } from '@/lib/prompt-generator'

interface ResultsProps {
  assistant: Assistant
}

export default function Results({ assistant }: ResultsProps) {
  const [copied, setCopied] = useState(false)
  const profileData = assistant.profileData as any
  const exampleResponses = generateExampleResponses(profileData)

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

  const personalityTraits = [
    { 
      icon: MessageCircle, 
      label: 'Communication Style', 
      value: `${profileData?.tone || 'Thoughtful'} tone, ${profileData?.vocabulary || 'moderate'} vocabulary`,
      color: 'bg-blue-50 text-blue-700'
    },
    { 
      icon: Target, 
      label: 'Decision Making', 
      value: profileData?.decisionStyle || 'Analytical approach',
      color: 'bg-green-50 text-green-700'
    },
    { 
      icon: Lightbulb, 
      label: 'Core Interests', 
      value: profileData?.interests ? profileData.interests.slice(0, 100) + '...' : 'Learning and growth',
      color: 'bg-purple-50 text-purple-700'
    },
    { 
      icon: Brain, 
      label: 'Expertise Areas', 
      value: profileData?.knowledge ? profileData.knowledge.slice(0, 100) + '...' : 'Various domains',
      color: 'bg-orange-50 text-orange-700'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/dashboard">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Kogito</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Congratulations Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Kogito is Ready!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Meet <strong>{assistant.assistantName}</strong> - your personalized AI assistant
          </p>
        </div>

        {/* Personality Summary */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Personality Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalityTraits.map((trait, index) => {
              const Icon = trait.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${trait.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{trait.label}</h3>
                        <p className="text-gray-600 text-sm">{trait.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Generated Assistant Prompt */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Generated Assistant Prompt
              </CardTitle>
              <CardDescription>
                This comprehensive prompt captures your unique thinking patterns and can be used with any AI platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-50 p-6 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
                  <code>{assistant.generatedPrompt}</code>
                </pre>
                <Button
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 bg-white hover:bg-gray-50 text-gray-700 border"
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
                      Copy to Clipboard
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Example Responses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Example Responses</h2>
          <p className="text-gray-600 mb-6">
            See how your personalized AI assistant would respond to common questions, reflecting your unique style and approach.
          </p>
          <div className="space-y-6">
            {exampleResponses.map((example, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge variant="outline" className="mb-2">Question {index + 1}</Badge>
                    <h3 className="font-semibold text-gray-900">{example.question}</h3>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-800 leading-relaxed">{example.response}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Deployment Options */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Deployment Options
              </CardTitle>
              <CardDescription>
                Use your personalized AI assistant across different platforms (Coming Soon)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  disabled 
                  className="h-20 flex flex-col items-center justify-center space-y-2 opacity-50"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span>Deploy to WhatsApp</span>
                  <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                </Button>
                
                <Button 
                  variant="outline" 
                  disabled 
                  className="h-20 flex flex-col items-center justify-center space-y-2 opacity-50"
                >
                  <Brain className="h-6 w-6" />
                  <span>Add to Notion</span>
                  <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                </Button>
                
                <Button 
                  variant="outline" 
                  disabled 
                  className="h-20 flex flex-col items-center justify-center space-y-2 opacity-50"
                >
                  <Zap className="h-6 w-6" />
                  <span>Browser Widget</span>
                  <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                </Button>
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
          <Link href="/assistant">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              View Full Profile
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
