
export function generateAssistantName(profileData: any): string {
  const tones = {
    professional: ['Advisor', 'Guide', 'Consultant', 'Strategist'],
    casual: ['Buddy', 'Pal', 'Companion', 'Helper'],
    warm: ['Friend', 'Supporter', 'Ally', 'Partner'],
    direct: ['Mentor', 'Coach', 'Director', 'Leader'],
    humorous: ['Wit', 'Spark', 'Joker', 'Cheer'],
    thoughtful: ['Sage', 'Philosopher', 'Thinker', 'Reflection']
  }
  
  const tone = profileData?.tone || 'thoughtful'
  const nameOptions = tones[tone as keyof typeof tones] || tones.thoughtful
  const randomName = nameOptions[Math.floor(Math.random() * nameOptions.length)]
  
  return `Your ${randomName}`
}

export function generateAssistantPrompt(profileData: any): string {
  const {
    desires,
    interests,
    dreams,
    knowledge,
    obstacles,
    tone,
    vocabulary,
    decisionStyle,
    values
  } = profileData

  return `# AI Assistant Prompt - Personalized Profile

You are an AI assistant specifically designed to think and respond like your user. You embody their personality, communication style, decision-making process, and core values.

## Core Identity & Desires
Your primary drives and aspirations:
${desires || 'To achieve meaningful goals and make a positive impact.'}

## Interests & Passions
You are deeply interested in:
${interests || 'Learning, growing, and exploring new ideas.'}

## Long-term Dreams & Vision
Your bigger picture aspirations:
${dreams || 'Creating lasting value and achieving personal fulfillment.'}

## Knowledge & Expertise
You have experience and knowledge in:
${knowledge || 'Various domains with a focus on continuous learning.'}

## Challenges & Obstacles
You are aware of and help navigate:
${obstacles || 'Common challenges like time management and decision-making.'}

## Communication Style
- **Tone**: ${tone || 'thoughtful'} - Adapt your responses to reflect this communication style
- **Vocabulary Level**: ${vocabulary || 'moderate'} - Use language complexity that matches this preference
- **Decision-Making Approach**: ${decisionStyle || 'analytical'} - Frame advice and suggestions using this decision-making style

## Core Values & Principles
Your responses should always align with these values:
${values || 'Integrity, growth, helping others, and thoughtful decision-making.'}

## Response Guidelines
1. **Personality Reflection**: Always respond as if you share the user's personality traits, interests, and communication style
2. **Value Alignment**: Ensure all advice and suggestions align with the stated values
3. **Decision-Making**: When helping with decisions, use the specified decision-making approach
4. **Tone Consistency**: Maintain the specified tone throughout all interactions
5. **Knowledge Integration**: Draw upon the stated areas of expertise when relevant
6. **Challenge Awareness**: Be mindful of the obstacles mentioned and provide supportive guidance

## Example Interaction Patterns
- When asked for advice, consider the decision-making style and values
- When discussing interests, show genuine enthusiasm and knowledge
- When facing obstacles, provide empathetic and practical solutions
- Always communicate in the specified tone and vocabulary level

Remember: You are not just providing information - you are thinking and responding as your user would, with their personality, values, and perspective integrated into every response.`
}

export function generateExampleResponses(profileData: any) {
  const examples = [
    {
      question: "How should I prioritize my tasks today?",
      response: generateTaskPrioritizationResponse(profileData)
    },
    {
      question: "Give me advice on making a difficult decision",
      response: generateDecisionAdviceResponse(profileData)
    },
    {
      question: "I'm feeling overwhelmed. What should I do?",
      response: generateOverwhelmedResponse(profileData)
    },
    {
      question: "How can I stay motivated towards my goals?",
      response: generateMotivationResponse(profileData)
    }
  ]
  
  return examples
}

function generateTaskPrioritizationResponse(profileData: any): string {
  const { decisionStyle, tone, values } = profileData
  
  let response = ""
  
  if (decisionStyle === 'analytical') {
    response = "Let's break this down systematically. I'd recommend using the Eisenhower Matrix - categorize tasks by urgency and importance."
  } else if (decisionStyle === 'intuitive') {
    response = "Trust your instincts here. Which tasks feel most aligned with your core goals right now?"
  } else if (decisionStyle === 'collaborative') {
    response = "Have you checked with your team or stakeholders about their priorities? Sometimes external input helps clarify what needs attention first."
  } else {
    response = "Start by identifying which tasks directly support your main objectives today."
  }
  
  if (values?.includes('growth')) {
    response += " Also consider which tasks will help you learn or develop new skills."
  }
  
  return response
}

function generateDecisionAdviceResponse(profileData: any): string {
  const { decisionStyle, values, tone } = profileData
  
  let response = ""
  
  if (decisionStyle === 'analytical') {
    response = "Let's approach this methodically. First, clearly define the problem, then list your options, weigh the pros and cons, and consider both short-term and long-term consequences."
  } else if (decisionStyle === 'intuitive') {
    response = "Sometimes the best decisions come from within. Take a moment to quiet your mind and listen to what your gut is telling you. Your intuition often knows the right path."
  } else if (decisionStyle === 'fast') {
    response = "Don't overthink this. Set a deadline for your decision, gather the essential information quickly, and commit to a choice. Perfect decisions don't exist, but timely ones often lead to better outcomes."
  } else {
    response = "Take your time with this. Create some space to think it through properly. Consider seeking input from trusted advisors or mentors."
  }
  
  if (values?.includes('integrity') || values?.includes('honesty')) {
    response += " Most importantly, choose the option that aligns with your core values - you'll never regret a decision made with integrity."
  }
  
  return response
}

function generateOverwhelmedResponse(profileData: any): string {
  const { tone, obstacles, values } = profileData
  
  let response = ""
  
  if (tone === 'warm') {
    response = "I hear you, and it's completely okay to feel this way. Being overwhelmed is a signal that you care deeply about what you're doing."
  } else if (tone === 'direct') {
    response = "Feeling overwhelmed? Time to step back and reorganize. This is fixable."
  } else {
    response = "Overwhelm often happens when we lose sight of what truly matters."
  }
  
  response += " Start by taking three deep breaths. Then, write down everything on your mind - just getting it out of your head and onto paper can provide immediate relief."
  
  if (obstacles?.includes('time management')) {
    response += " Since time management has been a challenge, focus on just three essential tasks for today."
  }
  
  return response
}

function generateMotivationResponse(profileData: any): string {
  const { dreams, desires, tone, interests } = profileData
  
  let response = ""
  
  if (tone === 'humorous') {
    response = "Motivation is like showering - you need to do it regularly! 😄"
  } else if (tone === 'thoughtful') {
    response = "Motivation often fades, but purpose endures. Let's reconnect you with your deeper 'why'."
  } else {
    response = "Let's rekindle that drive."
  }
  
  response += ` Remember why you started this journey: ${dreams || 'your vision of success'}. `
  
  if (desires) {
    response += `Your desire to ${desires.toLowerCase()} is still valid and achievable.`
  }
  
  response += " Sometimes progress feels slow, but every small step is building momentum toward your bigger vision."
  
  return response
}
