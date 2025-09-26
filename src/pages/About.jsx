import React from "react";
import { Button } from "../components/Button";
import { motion } from "framer-motion";

export const About = () => {
  return (
    
    <div className="min-h-screen flex flex-col bg-[#a3b9c4]"> {/* Fundo azul acinzentado */}
      

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-12 items-start flex-1 px-10 py-16">
        {/* Texto principal */}
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
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
            className="text-gray-100 text-lg leading-relaxed max-w-lg"
          >
            No <span className="font-semibold text-cyan-200">Seamind</span>, cada pessoa é única.
            Nosso espaço oferece acolhimento, conforto e segurança para que você se reconecte com suas emoções e descubra seu potencial de forma saudável e equilibrada.
            O Projeto Seamind é uma iniciativa voltada à promoção da saúde mental e bem-estar psicológico, idealizado por profissionais o Seu principal objetivo é ajudar as pessoas, oferecendo apoio e acolhimento a todos, por meio de atividades como [tipos de ações: atendimentos, oficinas, rodas de conversa, etc.]
            Sobre o site
            O projeto acontece online, e busca proporcionar [benefícios esperados, como desenvolvimento emocional, prevenção de transtornos, fortalecimento de vínculos sociais]. É gratuito e aberto para quem se enquadra nos critérios de participação.
            Para se inscrever ou saber mais, entre em contato pelo [e-mail/redes sociais/telefone] .
            Objetivo
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl shadow-lg transition">
              Saiba mais
            </Button>
          </motion.div>
        </div>

        {/* Cards animados */}
        <div className="grid grid-cols-1 gap-6">
          {[
            {
              title: "Acolhimento",
              description: "Espaço seguro onde você pode se expressar livremente e ser ouvido sem julgamentos."
            },
            {
              title: "Conforto",
              description: "Ambientes planejados para transmitir tranquilidade e favorecer o bem-estar."
            },
            {
              title: "Segurança",
              description: "Priorizamos a confidencialidade e proteção emocional em todos os atendimentos."
            },
            {
              title: "Cuidado Personalizado",
              description: "Acompanhamento individualizado respeitando suas necessidades e objetivos."
            }
          ].map((card, index) => (
            <motion.div
              key={card.title}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/90 rounded-xl shadow-lg p-6 cursor-pointer"
            >
              <h3 className="text-xl font-bold text-cyan-700 mb-2">{card.title}</h3>
              <p className="text-gray-700">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};