
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { generateAssistantPrompt, generateAssistantName } from '@/lib/prompt-generator'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { profileData } = await request.json()

    if (!profileData) {
      return NextResponse.json(
        { message: 'Profile data is required' },
        { status: 400 }
      )
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { assistant: true }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Generate assistant name and prompt
    const assistantName = generateAssistantName(profileData)
    const generatedPrompt = generateAssistantPrompt(profileData)

    // Create or update assistant
    let assistant
    if (user.assistant) {
      // Update existing assistant
      assistant = await prisma.assistant.update({
        where: { userId: user.id },
        data: {
          assistantName,
          profileData,
          generatedPrompt,
        },
      })
    } else {
      // Create new assistant
      assistant = await prisma.assistant.create({
        data: {
          userId: user.id,
          assistantName,
          profileData,
          generatedPrompt,
        },
      })
    }

    return NextResponse.json(
      { message: 'Assistant created successfully', assistant },
      { status: 201 }
    )
  } catch (error) {
    console.error('Assistant creation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { profileData } = await request.json()

    if (!profileData) {
      return NextResponse.json(
        { message: 'Profile data is required' },
        { status: 400 }
      )
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { assistant: true }
    })

    if (!user?.assistant) {
      return NextResponse.json(
        { message: 'Assistant not found' },
        { status: 404 }
      )
    }

    // Regenerate assistant name and prompt
    const assistantName = generateAssistantName(profileData)
    const generatedPrompt = generateAssistantPrompt(profileData)

    // Update assistant
    const assistant = await prisma.assistant.update({
      where: { userId: user.id },
      data: {
        assistantName,
        profileData,
        generatedPrompt,
      },
    })

    return NextResponse.json(
      { message: 'Assistant updated successfully', assistant },
      { status: 200 }
    )
  } catch (error) {
    console.error('Assistant update error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
