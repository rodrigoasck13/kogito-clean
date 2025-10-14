
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import AssistantView from '@/components/assistant/assistant-view'

export default async function AssistantPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/login')
  }
  
  // Get the user's assistant
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      assistant: true,
    },
  })
  
  if (!user?.assistant) {
    redirect('/dashboard')
  }
  
  return <AssistantView assistant={user.assistant} />
}
