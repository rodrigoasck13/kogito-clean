"use strict";(()=>{var e={};e.id=410,e.ids=[410],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},63477:e=>{e.exports=require("querystring")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},50497:(e,s,t)=>{t.r(s),t.d(s,{originalPathname:()=>v,patchFetch:()=>q,requestAsyncStorage:()=>y,routeModule:()=>f,serverHooks:()=>x,staticGenerationAsyncStorage:()=>w});var a={};t.r(a),t.d(a,{POST:()=>g,PUT:()=>h,dynamic:()=>m});var n=t(49303),r=t(88716),i=t(60670),o=t(87070),u=t(45609),l=t(90455),d=t(52663);function p(e){let s={professional:["Advisor","Guide","Consultant","Strategist"],casual:["Buddy","Pal","Companion","Helper"],warm:["Friend","Supporter","Ally","Partner"],direct:["Mentor","Coach","Director","Leader"],humorous:["Wit","Spark","Joker","Cheer"],thoughtful:["Sage","Philosopher","Thinker","Reflection"]},t=s[e?.tone||"thoughtful"]||s.thoughtful,a=t[Math.floor(Math.random()*t.length)];return`Your ${a}`}function c(e){let{desires:s,interests:t,dreams:a,knowledge:n,obstacles:r,tone:i,vocabulary:o,decisionStyle:u,values:l}=e;return`# AI Assistant Prompt - Personalized Profile

You are an AI assistant specifically designed to think and respond like your user. You embody their personality, communication style, decision-making process, and core values.

## Core Identity & Desires
Your primary drives and aspirations:
${s||"To achieve meaningful goals and make a positive impact."}

## Interests & Passions
You are deeply interested in:
${t||"Learning, growing, and exploring new ideas."}

## Long-term Dreams & Vision
Your bigger picture aspirations:
${a||"Creating lasting value and achieving personal fulfillment."}

## Knowledge & Expertise
You have experience and knowledge in:
${n||"Various domains with a focus on continuous learning."}

## Challenges & Obstacles
You are aware of and help navigate:
${r||"Common challenges like time management and decision-making."}

## Communication Style
- **Tone**: ${i||"thoughtful"} - Adapt your responses to reflect this communication style
- **Vocabulary Level**: ${o||"moderate"} - Use language complexity that matches this preference
- **Decision-Making Approach**: ${u||"analytical"} - Frame advice and suggestions using this decision-making style

## Core Values & Principles
Your responses should always align with these values:
${l||"Integrity, growth, helping others, and thoughtful decision-making."}

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

Remember: You are not just providing information - you are thinking and responding as your user would, with their personality, values, and perspective integrated into every response.`}let m="force-dynamic";async function g(e){try{let s;let t=await (0,u.Z1)(l.L);if(!t?.user?.email)return o.NextResponse.json({message:"Unauthorized"},{status:401});let{profileData:a}=await e.json();if(!a)return o.NextResponse.json({message:"Profile data is required"},{status:400});let n=await d._.user.findUnique({where:{email:t.user.email},include:{assistant:!0}});if(!n)return o.NextResponse.json({message:"User not found"},{status:404});let r=p(a),i=c(a);return s=n.assistant?await d._.assistant.update({where:{userId:n.id},data:{assistantName:r,profileData:a,generatedPrompt:i}}):await d._.assistant.create({data:{userId:n.id,assistantName:r,profileData:a,generatedPrompt:i}}),o.NextResponse.json({message:"Assistant created successfully",assistant:s},{status:201})}catch(e){return console.error("Assistant creation error:",e),o.NextResponse.json({message:"Internal server error"},{status:500})}}async function h(e){try{let s=await (0,u.Z1)(l.L);if(!s?.user?.email)return o.NextResponse.json({message:"Unauthorized"},{status:401});let{profileData:t}=await e.json();if(!t)return o.NextResponse.json({message:"Profile data is required"},{status:400});let a=await d._.user.findUnique({where:{email:s.user.email},include:{assistant:!0}});if(!a?.assistant)return o.NextResponse.json({message:"Assistant not found"},{status:404});let n=p(t),r=c(t),i=await d._.assistant.update({where:{userId:a.id},data:{assistantName:n,profileData:t,generatedPrompt:r}});return o.NextResponse.json({message:"Assistant updated successfully",assistant:i},{status:200})}catch(e){return console.error("Assistant update error:",e),o.NextResponse.json({message:"Internal server error"},{status:500})}}let f=new n.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/assistant/route",pathname:"/api/assistant",filename:"route",bundlePath:"app/api/assistant/route"},resolvedPagePath:"C:\\kogito-clean\\app\\api\\assistant\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:y,staticGenerationAsyncStorage:w,serverHooks:x}=f,v="/api/assistant/route";function q(){return(0,i.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:w})}},90455:(e,s,t)=>{t.d(s,{L:()=>o});var a=t(13539),n=t(52663),r=t(53797),i=t(98691);let o={adapter:(0,a.N)(n._),providers:[(0,r.Z)({name:"credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let s=await n._.user.findUnique({where:{email:e.email}});return s&&s.password&&await i.ZP.compare(e.password,s.password)?{id:s.id,email:s.email,name:s.name}:null}})],session:{strategy:"jwt"},pages:{signIn:"/login"},secret:process.env.NEXTAUTH_SECRET}},52663:(e,s,t)=>{t.d(s,{_:()=>n});let a=require("@prisma/client"),n=globalThis.prisma??new a.PrismaClient}};var s=require("../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),a=s.X(0,[948,885,184,972],()=>t(50497));module.exports=a})();