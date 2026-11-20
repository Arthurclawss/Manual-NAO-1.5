"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Flame, Gamepad2, RotateCcw, Timer, Trophy, X, XCircle } from "lucide-react";
import { QUIZ_PASS_SCORE, QUIZ_TIMES, scoreQuiz } from "@/data/moduleQuizzes";

const primary = "inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:bg-sky-300 dark:text-slate-950 dark:hover:bg-sky-200";

function shuffledIndices(length) {
  const indices = Array.from({ length }, (_, index) => index);
  for (let index = length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [indices[index], indices[other]] = [indices[other], indices[index]];
  }
  return indices;
}

function QuizClock({ deadline, duration, onExpire }) {
  const [remaining, setRemaining] = useState(duration);
  const expire = useRef(onExpire);

  useEffect(() => {
    expire.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) {
        clearInterval(interval);
        expire.current();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div role="timer" className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-extrabold tabular-nums ${remaining <= 10 ? "bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-200" : "bg-sky-100 text-sky-950 dark:bg-sky-950 dark:text-sky-200"}`}>
      <Timer size={16} aria-hidden="true" /> <span className="sr-only">Tempo restante </span>{remaining} s
    </div>
  );
}

function QuizResult({ points, total, passed, bestStreak, results, headingRef, onComplete, onRetry }) {
  return (
    <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ type: "tween", duration: 0.3 }} className="space-y-4 p-5 sm:p-7">
      <div className="flex flex-wrap gap-2">
        <span className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-lg font-black ${passed ? "bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-200" : "bg-sky-100 text-sky-950 dark:bg-sky-950 dark:text-sky-200"}`}><Trophy size={21} aria-hidden="true" /> {points} de {total}</span>
        {bestStreak > 1 && <span className="inline-flex items-center gap-2 rounded-xl bg-orange-100 px-3 py-2 text-sm font-extrabold text-orange-950 dark:bg-orange-950 dark:text-orange-200"><Flame size={18} aria-hidden="true" /> {bestStreak} acertos seguidos</span>}
      </div>
      <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-black text-slate-950 focus:outline-none dark:text-white">{passed ? "Você passou no quiz!" : "Continue praticando"}</h3>
      <p className="text-slate-700 dark:text-slate-200">{passed ? "Você já pode concluir o módulo." : `Você precisa de ${QUIZ_PASS_SCORE} acertos para concluir. Você pode voltar à leitura ou tentar novamente.`}</p>
      <ol aria-label="Resultado por pergunta" className="flex flex-wrap gap-2">
        {results.map(({ questionId, correct, expired }, position) => (
          <li key={questionId} className={`grid h-8 w-8 place-items-center rounded-lg text-sm font-extrabold ${correct ? "bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-200" : "bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-200"}`}>
            <span className="sr-only">Pergunta </span>{position + 1}<span className="sr-only">, {correct ? "correta" : expired ? "tempo esgotado" : "incorreta"}</span>
          </li>
        ))}
      </ol>
      {passed
        ? <button type="button" className={primary} onClick={onComplete}>Concluir módulo <CheckCircle2 size={17} aria-hidden="true" /></button>
        : <button type="button" className={primary} onClick={onRetry}><RotateCcw size={17} aria-hidden="true" /> Tentar novamente</button>}
    </motion.div>
  );
}

export default function ModuleQuiz({ quiz, onComplete }) {
  const [duration, setDuration] = useState(QUIZ_TIMES[0]);
  const [attempt, setAttempt] = useState(null);
  const [focusMode, setFocusMode] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const dialogRef = useRef(null);
  const startButton = useRef(null);
  const returnFocus = useRef(false);
  const questionHeading = useRef(null);
  const resultHeading = useRef(null);
  const exitHeading = useRef(null);
  const nextButton = useRef(null);
  const index = attempt?.index;
  const finished = index === quiz.length;
  const answered = attempt?.answers.length > index;

  useEffect(() => {
    if (!focusMode) return;
    const dialog = dialogRef.current;
    const root = document.documentElement;
    const overflow = root.style.overflowY;
    dialog.showModal();
    root.style.overflowY = "hidden";
    return () => {
      dialog.close();
      root.style.overflowY = overflow;
    };
  }, [focusMode]);

  useEffect(() => {
    if (!focusMode) {
      if (returnFocus.current) {
        (finished ? resultHeading.current : startButton.current)?.focus();
        returnFocus.current = false;
      }
    } else if (confirmExit) exitHeading.current?.focus();
    else if (finished) resultHeading.current?.focus();
    else if (answered) nextButton.current?.focus();
    else questionHeading.current?.focus();
  }, [focusMode, confirmExit, index, finished, answered]);

  function start() {
    returnFocus.current = true;
    setAttempt({
      index: 0,
      deadline: Date.now() + duration * 1000,
      answers: [],
      order: shuffledIndices(quiz.length).map((id) => ({ id, options: shuffledIndices(quiz[id].options.length) })),
    });
    setFocusMode(true);
  }

  function discard() {
    returnFocus.current = true;
    setConfirmExit(false);
    setFocusMode(false);
    setAttempt(null);
  }

  function requestExit() {
    if (finished) setFocusMode(false);
    else setConfirmExit((current) => !current);
  }

  function answer(option) {
    const now = Date.now();
    setAttempt((current) => {
      if (!current || current.index !== index || current.answers.length !== index) return current;
      const response = now < current.deadline ? option : null;
      return { ...current, answers: [...current.answers, response] };
    });
  }

  function advance() {
    const deadline = Date.now() + duration * 1000;
    setAttempt((current) => {
      if (!current || current.index !== index || current.answers.length !== index + 1) return current;
      return { ...current, index: index + 1, deadline };
    });
  }

  const entry = attempt?.order[index];
  const question = entry && quiz[entry.id];
  const selected = attempt?.answers[index];
  const isCorrect = answered && selected === question?.correct;
  let resultProps;

  if (finished) {
    const mappedAnswers = [];
    let streak = 0;
    let bestStreak = 0;
    const results = attempt.answers.map((response, position) => {
      const questionId = attempt.order[position].id;
      mappedAnswers[questionId] = response;
      const correct = quiz[questionId].correct === response;
      streak = correct ? streak + 1 : 0;
      bestStreak = Math.max(bestStreak, streak);
      return { questionId, correct, expired: response === null };
    });
    const points = scoreQuiz(quiz, mappedAnswers);
    resultProps = { points, total: quiz.length, passed: points >= QUIZ_PASS_SCORE, bestStreak, results, onComplete: () => onComplete(mappedAnswers), onRetry: discard };
  }

  return (
    <section id="revisao" aria-labelledby="module-quiz-heading" className="scroll-mt-20 overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <header className="space-y-2 bg-gradient-to-br from-[#102b49] to-[#153f60] p-5 text-white sm:p-7">
        <h2 id="module-quiz-heading" className="flex items-center gap-2.5 text-2xl font-black"><Gamepad2 size={24} className="shrink-0 text-sky-300" aria-hidden="true" /> Quiz do módulo</h2>
        <p className="text-sm font-semibold text-sky-100">{quiz.length} perguntas · {QUIZ_PASS_SCORE} acertos para avançar</p>
      </header>

      {!attempt && (
        <div className="space-y-4 p-5 sm:p-7">
          <p className="leading-relaxed text-slate-700 dark:text-slate-200">Uma pergunta por vez. Escolha uma alternativa dentro do tempo e veja a resposta antes de seguir.</p>
          <div className="flex flex-wrap items-end gap-3">
            <label className="grid gap-1.5 text-sm font-bold text-slate-800 dark:text-slate-100">Tempo por pergunta
              <select className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800" value={duration} onChange={(event) => setDuration(Number(event.target.value))}>
                {QUIZ_TIMES.map((time) => <option key={time} value={time}>{time} segundos{time === QUIZ_TIMES[0] ? "" : " · tempo estendido"}</option>)}
              </select>
            </label>
            <button ref={startButton} type="button" className={primary} onClick={start}>Iniciar quiz <ArrowRight size={17} aria-hidden="true" /></button>
          </div>
        </div>
      )}

      {finished && !focusMode && <QuizResult {...resultProps} headingRef={resultHeading} />}

      <dialog ref={dialogRef} aria-labelledby="quiz-focus-title" onCancel={(event) => { event.preventDefault(); requestExit(); }} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-[#eef4fb] p-0 text-slate-950 backdrop:bg-slate-950 dark:bg-[#081522] dark:text-white">
        {focusMode && (
          <div className="flex min-h-full flex-col">
            <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
              <div className="mx-auto flex min-h-16 w-full max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
                <h2 id="quiz-focus-title" className="flex items-center gap-2 text-lg font-black"><Gamepad2 size={23} className="shrink-0 text-sky-700 dark:text-sky-300" aria-hidden="true" /> Quiz do módulo</h2>
                <button type="button" className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-extrabold text-slate-700 hover:bg-slate-100 focus-visible:outline-2 dark:text-slate-200 dark:hover:bg-slate-800" onClick={requestExit}><X size={17} aria-hidden="true" /> {finished ? "Voltar ao manual" : "Sair do quiz"}</button>
              </div>
            </header>

            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-6 sm:px-6 sm:py-10">
              <div className="rounded-2xl border border-sky-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                {confirmExit && (
                  <div className="space-y-4 p-5 sm:p-7">
                    <h3 ref={exitHeading} tabIndex={-1} className="text-2xl font-black">Sair do quiz?</h3>
                    <p className="text-slate-700 dark:text-slate-200">Ao sair, sua tentativa atual será encerrada.{!answered && " O tempo continua contando até você decidir."}</p>
                    <div className="flex flex-wrap gap-2.5">
                      <button type="button" className={primary} onClick={() => setConfirmExit(false)}>Continuar quiz</button>
                      <button type="button" className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-extrabold hover:bg-slate-100 focus-visible:outline-2 dark:border-slate-600 dark:hover:bg-slate-800" onClick={discard}>Encerrar tentativa</button>
                    </div>
                  </div>
                )}

                {question && (
                  <div hidden={confirmExit} className="space-y-4 p-5 sm:p-7">
                    <div className="flex min-h-8 flex-wrap items-center justify-between gap-2 text-sm font-extrabold text-slate-700 dark:text-slate-200">
                      <span>Pergunta {index + 1} de {quiz.length}</span>
                      {!answered && <QuizClock key={`clock-${index}`} deadline={attempt.deadline} duration={duration} onExpire={() => answer(null)} />}
                    </div>

                    <motion.div key={`question-${index}`} initial={{ y: 8 }} animate={{ y: 0 }} transition={{ type: "tween", duration: 0.22 }} className="space-y-3">
                      <h3 ref={questionHeading} tabIndex={-1} className="text-xl font-extrabold leading-snug text-slate-950 focus:outline-none dark:text-white sm:text-2xl">{question.prompt}</h3>
                      <div role="group" aria-label="Alternativas" className="space-y-2">
                        {entry.options.map((option, position) => {
                          const correct = answered && option === question.correct;
                          const incorrect = answered && option === selected && !correct;
                          return (
                            <button key={option} type="button" disabled={answered} onClick={() => answer(option)} className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 motion-reduce:transition-none ${correct ? "border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-200" : incorrect ? "border-amber-600 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-200" : "border-slate-200 bg-white text-slate-800 enabled:hover:border-sky-600 enabled:hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:enabled:hover:bg-slate-800"}`}>
                              <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-slate-500/10">{String.fromCharCode(65 + position)}</span>
                              <span className="min-w-0 flex-1 break-words">{question.options[option]}</span>
                              {correct && <CheckCircle2 size={18} className="shrink-0" aria-hidden="true" />}
                              {incorrect && <XCircle size={18} className="shrink-0" aria-hidden="true" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                    {answered && (
                      <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ type: "tween", duration: 0.22 }} className="space-y-3">
                        <div role="status" className={`rounded-xl p-3 text-sm ${isCorrect ? "bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-200" : "bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-200"}`}>
                          <p className="font-black">{isCorrect ? "Resposta certa!" : selected === null ? "O tempo acabou." : "Resposta incorreta."}</p>
                          <p>{question.explanation || `Resposta correta: ${question.options[question.correct]}`}</p>
                        </div>
                        <button ref={nextButton} type="button" className={primary} onClick={advance}>{index + 1 === quiz.length ? "Ver resultado" : "Próxima pergunta"} <ArrowRight size={17} aria-hidden="true" /></button>
                      </motion.div>
                    )}
                  </div>
                )}
                {finished && <QuizResult {...resultProps} headingRef={resultHeading} />}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
