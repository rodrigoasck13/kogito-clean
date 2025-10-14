
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ProfileBuilder from '@/components/profile-builder/profile-builder'

export default async function ProfileBuilderPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/login')
  }
  
  return <ProfileBuilder />
}
