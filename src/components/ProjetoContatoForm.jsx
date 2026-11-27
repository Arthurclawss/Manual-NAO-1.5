"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Info, MessageCircle, RotateCcw } from "lucide-react";

const WHATSAPP_NUMBER = "5584991792323";

const QUESTIONS = [
  {
    key: "Motivo do contato",
    title: "Qual é o principal motivo do seu contato?",
    options: [
      "Dor lombar ou sintomas que irradiam para a perna.",
      "Dor cervical ou nos ombros.",
      "Hérnia de disco previamente diagnosticada.",
      "Lesão musculoesquelética ou recuperação funcional.",
      "Dor relacionada ao esporte ou treinamento.",
      "Outra condição ou interesse em avaliação.",
    ],
  },
  {
    key: "Tempo dos sintomas",
    title: "Há quanto tempo você apresenta esses sintomas?",
    options: [
      "Há poucos dias.",
      "Há algumas semanas.",
      "Há alguns meses.",
      "Há mais de um ano.",
      "Não se aplica.",
    ],
  },
  {
    key: "Período de preferência",
    title: "Qual período costuma ser mais conveniente para você?",
    options: [
      "Manhã.",
      "Tarde.",
      "Noite.",
      "Sábado.",
      "Tenho flexibilidade de horário.",
    ],
  },
];

const TOTAL_STEPS = QUESTIONS.length + 1;
const LETTERS = "ABCDEF";

export default function ProjetoContatoForm({ cardSurface }) {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");

  const currentQuestion = step < QUESTIONS.length ? QUESTIONS[step] : null;

  const handleSelectOption = (option) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.key]: option.replace(/\.$/, ""),
    }));
    setStep((s) => s + 1);
  };

  const handleFinishName = (e) => {
    e?.preventDefault();
    setName((prev) => prev.trim());
    setStep(TOTAL_STEPS);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
  };

  const directMessage =
    "Olá, Dr. Rudy! Vim pelo site e gostaria de verificar a disponibilidade para uma avaliação.";

  const finalMessage =
    `Olá, Dr. Rudy! ${name.trim() ? `Meu nome é ${name.trim()} e ` : ""}vim pelo site.\n` +
    QUESTIONS.map((q) => `${q.key}: ${answers[q.key] || ""}`).join("\n") +
    "\nGostaria de verificar a disponibilidade de horários para uma avaliação.";

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 ${cardSurface}`}
    >
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-10 items-start">
        <div className="space-y-3 sm:space-y-4">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-extrabold tracking-widest uppercase border border-sky-500/20">
            <MessageCircle size={13} />
            Primeiro contato
          </span>

          <h2
            id="contato-title"
            className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight"
          >
            Conte um pouco sobre o que motivou sua busca por atendimento.
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Responda a algumas perguntas simples para facilitar o primeiro contato e o agendamento da sua avaliação.
          </p>

          <div className="flex items-start gap-2.5 rounded-2xl border border-sky-200/80 bg-sky-50/80 p-3.5 text-xs sm:text-sm text-sky-900 dark:border-sky-800/50 dark:bg-sky-950/35 dark:text-sky-100">
            <Info size={18} className="shrink-0 mt-0.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            <span>Este formulário não substitui uma consulta ou avaliação fisioterapêutica.</span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Prefere falar diretamente?{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(directMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Chame no WhatsApp sem responder às perguntas
            </a>
            .
          </p>

          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            As respostas servem apenas para montar a mensagem que você mesmo envia pelo WhatsApp. Nada fica gravado neste site.
          </p>
        </div>

        <div
          aria-live="polite"
          className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-6 dark:border-neutral-700/70 dark:bg-neutral-900/60"
        >
          <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
            {Array.from({ length: TOTAL_STEPS }, (_, idx) => (
              <span
                key={idx}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  idx <= step ? "bg-sky-500" : "bg-slate-200 dark:bg-neutral-700"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {currentQuestion ? (
              <motion.div
                key={`step-${step}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <p className="text-xs font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Pergunta {step + 1} de {TOTAL_STEPS}
                </p>
                <h3 id="qz-title" className="text-lg font-extrabold text-neutral-900 dark:text-white leading-snug">
                  {currentQuestion.title}
                </h3>

                <div role="group" aria-labelledby="qz-title" className="space-y-2 pt-1">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption(option)}
                      className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left text-sm font-semibold text-neutral-800 shadow-xs transition-all hover:border-sky-500 hover:bg-sky-50/70 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:border-sky-400 dark:hover:bg-sky-950/40"
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-xs font-extrabold text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white dark:text-sky-400"
                      >
                        {LETTERS[idx]}
                      </span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-sky-600 dark:text-neutral-400 dark:hover:text-sky-400"
                    >
                      <ArrowLeft size={14} />
                      Voltar
                    </button>
                  </div>
                )}
              </motion.div>
            ) : step === QUESTIONS.length ? (
              <motion.form
                key="step-name"
                onSubmit={handleFinishName}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <p className="text-xs font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Pergunta {TOTAL_STEPS} de {TOTAL_STEPS}
                </p>
                <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white leading-snug">
                  Como podemos chamar você?
                </h3>

                <div className="space-y-1.5">
                  <label
                    htmlFor="qz-nome"
                    className="block text-xs font-bold text-neutral-600 dark:text-neutral-300"
                  >
                    Primeiro nome
                  </label>
                  <input
                    id="qz-nome"
                    type="text"
                    autoComplete="given-name"
                    maxLength={40}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite seu primeiro nome"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-sky-600 dark:text-neutral-400 dark:hover:text-sky-400"
                  >
                    <ArrowLeft size={14} />
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-nao-secondary px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-orange-600"
                  >
                    Concluir
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="step-done"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 py-2"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white">
                  Obrigado pelas informações!
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  O próximo passo é entrar em contato pelo WhatsApp para verificar a disponibilidade de horários e obter orientações sobre o agendamento.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-md transition-colors hover:bg-emerald-700"
                  >
                    <MessageCircle size={17} />
                    Continuar pelo WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-sky-600 dark:text-neutral-400 dark:hover:text-sky-400"
                  >
                    <RotateCcw size={14} />
                    Refazer as respostas
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
