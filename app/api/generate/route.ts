import { CohereClient } from 'cohere-ai';
import { NextResponse } from 'next/server';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt inválido' }, { status: 400 });
    }

    const response = await cohere.generate({
      model: 'command',
      prompt,
      max_tokens: 150,
    });

    return NextResponse.json({ text: response.generations[0].text });
  } catch (error) {
    console.error('Erro Cohere:', error);
    return NextResponse.json({ error: 'Erro ao contactar Cohere' }, { status: 500 });
  }
}



