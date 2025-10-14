
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Dashboard from '@/components/dashboard/dashboard'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/login')
  }
  
  // Get user and their assistant
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      assistant: true,
    },
  })
  
  if (!user) {
    redirect('/login')
  }
  
  return <Dashboard user={user} assistant={user.assistant} />
}
