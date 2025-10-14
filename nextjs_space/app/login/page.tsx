
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/auth/login-form'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  
  if (session?.user) {
    redirect('/dashboard')
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your Kogito</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
