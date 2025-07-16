'use client';

import { useState } from 'react';

export default function Home() {
  const [sentimento, setSentimento] = useState('');
  const [imagem, setImagem] = useState('');
  const [estilo, setEstilo] = useState('inspiradora');
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);

  const gerarFrases = async () => {
    setLoading(true);
    setResultado('');

    const prompt = `Gera 3 frases ${estilo} para usar como legenda numa publicação sobre ${imagem}, refletindo um sentimento de ${sentimento}.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResultado(data.text || 'Erro ao gerar resposta.');
    } catch (err) {
      console.error('Erro ao gerar frases:', err);
      setResultado('Ocorreu um erro. Tenta novamente.');
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Gerador de Frases para Publicações</h1>

      <label>Como te sentes?</label>
      <input
        type="text"
        value={sentimento}
        onChange={(e) => setSentimento(e.target.value)}
        placeholder="ex: nostálgico, feliz, em paz..."
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <label>O que aparece na imagem?</label>
      <input
        type="text"
        value={imagem}
        onChange={(e) => setImagem(e.target.value)}
        placeholder="ex: pôr-do-sol, amigos, mar..."
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <label>Estilo da frase</label>
      <select
        value={estilo}
        onChange={(e) => setEstilo(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      >
        <option value="inspiradora">Inspiradora</option>
        <option value="engraçada">Engraçada</option>
        <option value="romântica">Romântica</option>
        <option value="profunda">Profunda</option>
        <option value="feliz">Feliz</option>
      </select>

      <button onClick={gerarFrases} disabled={loading}>
        {loading ? 'A gerar...' : 'Gerar frases'}
      </button>

      {resultado && (
  <div style={{ marginTop: '2rem' }}>
    <h3>Resultado:</h3>
    <ul style={{ listStyle: 'decimal', paddingLeft: '1.5rem' }}>
      {resultado
        .split('\n')
        .filter((linha) => linha.trim() !== '')
        .map((frase, idx) => (
          <li key={idx} style={{ marginBottom: '1rem' }}>
            <span>{frase.trim()}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(frase.trim());
              }}
              style={{
                marginLeft: '1rem',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
              }}
            >
              Copiar
            </button>
          </li>
        ))}
    </ul>
  </div>
)}
    </main>
  );
}
