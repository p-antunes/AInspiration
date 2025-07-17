import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

export async function POST(req: Request) {
  const { mood, location, style } = await req.json();

  const prompt = `Cria uma legenda criativa para redes sociais com base nas seguintes informações:
- Local: ${location}
- Emoção: ${mood}
- Estilo: ${style}`;

  try {
    const response = await cohere.chat({
      model: 'command-r', // ou 'command-r-plus' se tiveres acesso
      message: prompt,
    });

    const generated = response.text;

    return NextResponse.json({ result: generated });
  } catch (error) {
    console.error('Erro ao gerar descrição:', error);
    return NextResponse.json({ error: 'Erro ao gerar descrição' }, { status: 500 });
  }
}




