"use client"

import { useState } from "react"

interface QuestionCardProps {
  question: {
    id: number
    emoji: string
    question: string
    placeholder: string
  }
  answer: string
  onChange: (answer: string) => void
}

export default function QuestionCard({ question, answer, onChange }: QuestionCardProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="space-y-6">
      {/* Emoji and question */}
      <div className="text-center space-y-4">
        <p className="text-4xl">{question.emoji}</p>
        <h2 className="text-2xl md:text-3xl font-light leading-relaxed text-foreground">{question.question}</h2>
      </div>

      {/* Text input area */}
      <div
        className={`transition-all duration-300 border rounded-lg p-6 ${
          isFocused ? "border-accent/50 bg-accent/5" : "border-border bg-transparent hover:border-border/50"
        }`}
      >
        <textarea
          value={answer}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={question.placeholder}
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none font-light text-lg leading-relaxed"
          rows={5}
        />
      </div>

      {/* Character count */}
      <p className="text-right text-xs text-muted-foreground">{answer.length} characters</p>
    </div>
  )
}
