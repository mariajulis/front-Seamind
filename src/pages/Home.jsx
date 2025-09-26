import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#e3f0f8] flex items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-8 md:px-16 py-20 gap-10">

        {/* Coluna do texto agora à esquerda */}
        <div className="w-full md:w-1/2 space-y-6 order-2 md:order-1">
          <h1 className="text-6xl font-serif italic text-black">
            seamind
          </h1>
          <h2 className="text-2xl font-bold text-[#1976a5]">
            Um Espaço seguro para você se reencontrar
          </h2>

          <div className="space-y-4 text-slate-900 text-lg">
            <p><strong>Contato:</strong> Dar o primeiro passo é um gesto de coragem. Estamos aqui para acolher você.</p>
            <p><strong>Serviços:</strong> A psicoterapia é um caminho para compreender suas emoções e construir novas possibilidades.</p>
            <p><strong>Sobre nós:</strong> Aqui você encontra um espaço seguro para se conhecer, refletir e crescer.</p>
          </div>

          <Link to="/register">
            <Button size="lg" variant="blue" className="mt-6 px-10 py-4 rounded-2xl font-semibold">
              Entrar
            </Button>
          </Link>
        </div>

        {/* Coluna da imagem agora à direita */}
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <img
            src="/bg.png" // substitua pelo caminho real da imagem
            alt="Mulher sorrindo"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};
