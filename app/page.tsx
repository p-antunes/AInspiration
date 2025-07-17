'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ mood: '', location: '', style: '' });
  const [generatedText, setGeneratedText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setGeneratedText(data.result);
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-white text-black relative overflow-hidden">
      <header className="flex justify-between items-center py-4 px-8 bg-[#f8f8f8] shadow-md z-10 relative">
        <h1 className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">AI</span>
          nspire
        </h1>
      </header>

      <div className="absolute inset-0 z-0">
        <img
          src="/background.jpg"
          alt="background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-white/80"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center flex-grow px-4 py-12 gap-16 max-w-6xl mx-auto relative z-10">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div>
            <h2 className="text-2xl font-bold mb-2">Vamos criar a descrição para a sua publicação!</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full p-6 rounded-2xl shadow-md space-y-4 max-w-sm mx-auto lg:mx-0 bg-white border border-gray-300 backdrop-blur-sm"
          >
            <input
              type="text"
              name="location"
              onChange={handleChange}
              placeholder="Onde tirou a sua fotografia ou vídeo?"
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm bg-white text-black placeholder:text-gray-500"
              required
            />
            <input
              type="text"
              name="mood"
              onChange={handleChange}
              placeholder="Como se sente?"
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm bg-white text-black placeholder:text-gray-500"
              required
            />
            <input
              type="text"
              name="style"
              onChange={handleChange}
              placeholder="Que estilo queres para a tua frase?"
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm bg-white text-black placeholder:text-gray-500"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-semibold w-full"
            >
              Gerar Descrição
            </button>
          </form>

          {generatedText && (
            <div className="w-full bg-white p-4 rounded-xl shadow-inner text-sm text-black border border-gray-300 max-w-sm mx-auto lg:mx-0">
              {generatedText}
            </div>
          )}
        </div>

        <div className="flex-1">
          <img
            src="/mockup.png"
            alt="exemplo de rede social"
            className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
          />
        </div>
      </div>

      <footer className="w-full text-center text-xs text-gray-500 py-6 bg-[#f8f8f8] relative z-10">
        © 2025 AInspire · Desenvolvido por Pedro Antunes
      </footer>
    </main>
  );
}
