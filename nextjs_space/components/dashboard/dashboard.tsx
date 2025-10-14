
'use client'

import { User, Assistant } from '@prisma/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Plus, User2, LogOut, Eye, Edit } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface DashboardProps {
  user: User
  assistant: Assistant | null
}

export default function Dashboard({ user, assistant }: DashboardProps) {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Kogito</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User2 className="h-5 w-5" />
                <span>{user?.email}</span>
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            {assistant ? 'Manage your personalized AI assistant' : 'Ready to create your personalized AI assistant?'}
          </p>
        </div>

        {!assistant ? (
          // No Assistant Created Yet
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="pb-6">
                <div className="w-24 h-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Create Your Kogito</CardTitle>
                <CardDescription className="text-lg">
                  Answer a few thoughtful questions to build an AI assistant that thinks like you do.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/profile-builder">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-5 w-5 mr-2" />
                    Start Building Your Kogito
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Assistant Exists
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{assistant.assistantName}</CardTitle>
                    <CardDescription>
                      Your personalized AI assistant
                    </CardDescription>
                  </div>
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Profile Data Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Communication Style</h4>
                      <p className="text-gray-600">
                        {((assistant.profileData as any)?.tone || 'Professional')} tone with {((assistant.profileData as any)?.vocabulary || 'moderate')} vocabulary
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Decision Making</h4>
                      <p className="text-gray-600">
                        {((assistant.profileData as any)?.decisionStyle || 'Analytical')} approach
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <Link href="/assistant">
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Profile
                      </Button>
                    </Link>
                    <Link href="/results">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Brain className="h-4 w-4 mr-2" />
                        View Assistant Details
                      </Button>
                    </Link>
                    <Link href="/profile-builder">
                      <Button variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Assistant
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Assistant Created</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(assistant.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <User2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Profile Complete</h3>
                  <p className="text-sm text-gray-600">
                    All questions answered
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ready to Deploy</h3>
                  <p className="text-sm text-gray-600">
                    Use anywhere you need AI
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
