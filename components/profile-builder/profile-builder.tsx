
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Brain, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface ProfileData {
  desires: string
  interests: string
  dreams: string
  knowledge: string
  obstacles: string
  tone: string
  vocabulary: string
  decisionStyle: string
  values: string
}

const questions = [
  {
    id: 'desires',
    title: 'What are your main desires and goals?',
    description: 'Tell us about your primary aspirations and what you want to achieve.',
    type: 'textarea',
    placeholder: 'e.g., I want to build a successful business, help others learn, create meaningful work...'
  },
  {
    id: 'interests',
    title: 'What are your core interests?',
    description: 'Share the topics, activities, or areas that genuinely fascinate you.',
    type: 'textarea',
    placeholder: 'e.g., Technology, psychology, creative writing, entrepreneurship, philosophy...'
  },
  {
    id: 'dreams',
    title: 'What dreams drive you?',
    description: 'Describe your bigger picture vision and long-term dreams.',
    type: 'textarea',
    placeholder: 'e.g., Making a positive impact, achieving financial freedom, creating lasting relationships...'
  },
  {
    id: 'knowledge',
    title: 'What knowledge and expertise do you have?',
    description: 'Tell us about your skills, experience, and areas of expertise.',
    type: 'textarea',
    placeholder: 'e.g., Software development, marketing strategy, team leadership, data analysis...'
  },
  {
    id: 'obstacles',
    title: 'What obstacles do you face?',
    description: 'Share the challenges or barriers you encounter in reaching your goals.',
    type: 'textarea',
    placeholder: 'e.g., Time management, fear of failure, lack of resources, imposter syndrome...'
  },
  {
    id: 'tone',
    title: 'How would you describe your communication tone?',
    description: 'Choose the tone that best represents how you prefer to communicate.',
    type: 'select',
    options: [
      { value: 'professional', label: 'Professional' },
      { value: 'casual', label: 'Casual' },
      { value: 'warm', label: 'Warm' },
      { value: 'direct', label: 'Direct' },
      { value: 'humorous', label: 'Humorous' },
      { value: 'thoughtful', label: 'Thoughtful' }
    ]
  },
  {
    id: 'vocabulary',
    title: 'What\'s your vocabulary preference?',
    description: 'Select the complexity level that feels most natural to you.',
    type: 'select',
    options: [
      { value: 'simple', label: 'Simple and Clear' },
      { value: 'moderate', label: 'Moderate Complexity' },
      { value: 'advanced', label: 'Advanced Vocabulary' },
      { value: 'technical', label: 'Technical and Precise' }
    ]
  },
  {
    id: 'decisionStyle',
    title: 'How do you make decisions?',
    description: 'Choose the approach that best describes your decision-making process.',
    type: 'select',
    options: [
      { value: 'analytical', label: 'Analytical - I analyze data and facts' },
      { value: 'intuitive', label: 'Intuitive - I trust my gut feeling' },
      { value: 'collaborative', label: 'Collaborative - I seek input from others' },
      { value: 'fast', label: 'Fast - I make quick decisions' },
      { value: 'deliberate', label: 'Deliberate - I take time to consider options' }
    ]
  },
  {
    id: 'values',
    title: 'What values guide your choices?',
    description: 'Describe the core values and principles that influence your decisions.',
    type: 'textarea',
    placeholder: 'e.g., Honesty, growth mindset, helping others, excellence, work-life balance...'
  }
]

export default function ProfileBuilder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [profileData, setProfileData] = useState<ProfileData>({
    desires: '',
    interests: '',
    dreams: '',
    knowledge: '',
    obstacles: '',
    tone: '',
    vocabulary: '',
    decisionStyle: '',
    values: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100
  const isLastStep = currentStep === questions.length - 1

  const handleInputChange = (value: string) => {
    setProfileData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const canProceed = () => {
    const currentValue = profileData[currentQuestion.id as keyof ProfileData]
    return currentValue?.trim().length > 0
  }

  const handleNext = () => {
    if (canProceed()) {
      setCurrentStep(prev => Math.min(prev + 1, questions.length - 1))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    if (!canProceed()) return
    
    setLoading(true)
    
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileData }),
      })

      if (response.ok) {
        toast.success('Your Kogito has been created!')
        router.push('/results')
      } else {
        const data = await response.json()
        toast.error(data.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-10 w-10 text-blue-600" />
            <span className="ml-3 text-3xl font-bold text-gray-900">Kogito</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Build Your AI Assistant</h1>
          <p className="text-gray-600">Help us understand who you are and how you think</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
            <CardDescription className="text-base">
              {currentQuestion.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestion.type === 'textarea' && (
              <div>
                <Textarea
                  value={profileData[currentQuestion.id as keyof ProfileData]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  rows={4}
                  className="min-h-[120px]"
                />
              </div>
            )}
            
            {currentQuestion.type === 'select' && currentQuestion.options && (
              <div>
                <Select
                  value={profileData[currentQuestion.id as keyof ProfileData] || ''}
                  onValueChange={handleInputChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    {currentQuestion.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {!isLastStep ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || loading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? 'Creating Your Kogito...' : 'Generate My Kogito'}
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
