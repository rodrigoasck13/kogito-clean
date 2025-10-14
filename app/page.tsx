
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Homepage from '@/components/homepage'

export default async function Page() {
  const session = await getServerSession(authOptions)
  
  // If user is logged in, redirect to dashboard
  if (session?.user) {
    redirect('/dashboard')
  }
  
  return <Homepage />
}
