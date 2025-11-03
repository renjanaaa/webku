"use client"

import { useState } from "react"
import QuestionCard from "@/components/question-card"

const QUESTIONS = [
  {
    id: 1,
    emoji: "💭",
    question: "Apa perubahan terbesar yang kamu rasain setelah kenal aku?",
    placeholder: "Bagikan perubahannya...",
  },
  {
    id: 2,
    emoji: "❤️",
    question: "Sebut tiga hal yang paling kamu suka dari aku.",
    placeholder: "Apa saja yang kamu suka?",
  },
  {
    id: 3,
    emoji: "🔥",
    question: "Sebut tiga hal yang paling kamu benci dari aku — jujur aja, nggak papa.",
    placeholder: "Apa yang kamu benci? Jujur aja...",
  },
  {
    id: 4,
    emoji: "🌠",
    question: "Kalau aku bisa mewujudkan satu keinginan kamu sekarang juga, kamu mau apa?",
    placeholder: "Apa keinginanmu?",
  },
  {
    id: 5,
    emoji: "⏳",
    question: "Ada hal yang kamu pengen aku tahu, tapi belum pernah kamu berani ngomongin?",
    placeholder: "Hal apa yang belum pernah kamu berani bilang?",
  },
  {
    id: 6,
    emoji: "🌧️",
    question: "Kalau suatu hari nanti kita ribut besar, apa yang bikin kamu tetap pengen bertahan?",
    placeholder: "Apa yang membuatmu tetap ingin bertahan?",
  },
  {
    id: 7,
    emoji: "🕊️",
    question: "Apa hal paling kecil yang aku lakuin tapi ternyata berarti banget buat kamu?",
    placeholder: "Hal kecil apa yang berarti?",
  },
  {
    id: 8,
    emoji: "🌙",
    question: "Kalau kamu bisa nyimpen satu momen dari kita selamanya, momen apa itu?",
    placeholder: "Momen apa yang ingin kamu simpan?",
  },
  {
    id: 9,
    emoji: "🪞",
    question: "Menurut kamu, hal apa yang harus aku perbaiki biar hubungan kita lebih baik?",
    placeholder: "Apa yang bisa aku perbaiki?",
  },
  {
    id: 10,
    emoji: "🌹",
    question: "Kalau cinta itu cermin, hal apa dari kita yang paling kamu lihat di situ?",
    placeholder: "Apa yang kamu lihat?",
  },
]

interface QnASectionProps {
  responses: Record<number, string>
  setResponses: (responses: Record<number, string>) => void
  onComplete: () => void
}

export default function QnASection({ responses, setResponses, onComplete }: QnASectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleAnswer = (questionId: number, answer: string) => {
    setResponses({ ...responses, [questionId]: answer })
  }

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const currentQuestion = QUESTIONS[currentIndex]
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-muted-foreground tracking-widest">
              QUESTION {currentIndex + 1} OF {QUESTIONS.length}
            </p>
            <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
          </div>
          <div className="w-full h-px bg-border">
            <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="mb-8 animate-fade-in">
          <QuestionCard
            question={currentQuestion}
            answer={responses[currentQuestion.id] || ""}
            onChange={(answer) => handleAnswer(currentQuestion.id, answer)}
          />
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-6 py-2 text-sm tracking-widest font-light border border-foreground/20 text-foreground/60 disabled:opacity-30 hover:bg-foreground/5 transition-all duration-300 rounded-full"
          >
            PREVIOUS
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2 text-sm tracking-widest font-light bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 rounded-full"
          >
            {currentIndex === QUESTIONS.length - 1 ? "FINISH" : "NEXT"}
          </button>
        </div>

        {/* Question counter */}
        <p className="text-center text-xs text-muted-foreground mt-8 tracking-widest">
          {responses[currentQuestion.id] ? "✓ ANSWERED" : "NOT ANSWERED"}
        </p>
      </div>
    </main>
  )
}
