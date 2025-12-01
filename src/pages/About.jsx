import React from "react";
import { Button } from "../components/Button";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <main className="min-h-screen flex flex-col bg-[#a3b9c4]">
      {/* Hero Section */}
      <section
        aria-labelledby="about-title"
        className="grid md:grid-cols-2 gap-12 items-start flex-1 px-10 py-16"
      >
        {/* Texto principal */}
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            id="about-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-extrabold text-slate-800"
          >
            Seamind
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-3xl text-cyan-800 font-semibold italic"
          >
            Transformando vidas <br /> com cuidado e atenção
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-black text-lg leading-relaxed max-w-lg"
          >
            No <span className="font-semibold text-dark">Seamind</span>, cada
            pessoa é única. Nosso espaço oferece acolhimento, conforto e
            segurança para que você se reconecte com suas emoções e descubra seu
            potencial de forma saudável e equilibrada.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
          
          </motion.div>
        </div>

        {/* Cards animados */}
        <section aria-label="Valores do projeto" className="grid grid-cols-1 gap-6">
          {[
            {
              title: "Acolhimento",
              description:
                "Espaço seguro onde você pode se expressar livremente e ser ouvido sem julgamentos.",
            },
            {
              title: "Conforto",
              description:
                "Ambientes planejados para transmitir tranquilidade e favorecer o bem-estar.",
            },
            {
              title: "Segurança",
              description:
                "Priorizamos a confidencialidade e proteção emocional em todos os atendimentos.",
            },
            {
              title: "Cuidado Personalizado",
              description:
                "Acompanhamento individualizado respeitando suas necessidades e objetivos.",
            },
          ].map((card, index) => (
            <motion.article
              key={card.title}
              role="region"
              aria-labelledby={`card-${index}`}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/90 rounded-xl shadow-lg p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-600"
              tabIndex={0} // permite navegação por teclado
            >
              <h3
                id={`card-${index}`}
                className="text-xl font-bold text-cyan-700 mb-2"
              >
                {card.title}
              </h3>
              <p className="text-gray-700">{card.description}</p>
            </motion.article>
          ))}
        </section>
      </section>
    </main>
  );
};
