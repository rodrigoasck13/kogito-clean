
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Results from '@/components/results/results'

export default async function ResultsPage() {
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
  
  return <Results assistant={user.assistant} />
}
