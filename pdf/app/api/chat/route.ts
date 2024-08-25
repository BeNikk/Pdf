import { NextResponse } from "next/server";
import { generateObject } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { z } from 'zod';
const groq = createGroq({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });

export async function POST(req:Request){
    try {
        const {prompt}=await req.json();
        const { object } = await generateObject({
            model: groq('llama-3.1-70b-versatile'),
            schema: z.object({
                practicalFile: z.object({
                    aimOfTheExperiment:z.string(),
                
                  theoryOfTheExperimentInDetailedPoints:z.array(z.string()),
                  
                  FullAlgorithmExplainInSteps: z.array(z.string()),
              
                  OptimisedCodeWithUserInput: z.string(),
                  VivaQuestionsWithAnswers:z.array(z.string())
                }),

              }),
            prompt: prompt,
          });
          

          return NextResponse.json(object);
        
        
    } catch (error) {
        console.log(error);
        return new NextResponse("Error Occured");
    }
}