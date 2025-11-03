"use client"

import { useState } from "react"
import Hero from "@/components/hero"
import QnASection from "@/components/qna-section"
import Closing from "@/components/closing"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"hero" | "qna" | "closing">("hero")
  const [responses, setResponses] = useState<Record<number, string>>({})

  return (
    <div className="min-h-screen bg-background text-foreground">
      {currentStep === "hero" && <Hero onStart={() => setCurrentStep("qna")} />}
      {currentStep === "qna" && (
        <QnASection responses={responses} setResponses={setResponses} onComplete={() => setCurrentStep("closing")} />
      )}
      {currentStep === "closing" && (
        <Closing
          responses={responses}
          onRestart={() => {
            setCurrentStep("hero")
            setResponses({})
          }}
        />
      )}
    </div>
  )
}
