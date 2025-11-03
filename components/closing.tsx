"use client"
import { useState } from "react"

interface ClosingProps {
  responses: Record<number, string>
  onRestart: () => void
}

export default function Closing({ responses, onRestart }: ClosingProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSaveToSheets = async () => {
    setIsSaving(true)
    setError(null)
    try {
      const gasUrl = process.env.NEXT_PUBLIC_GAS_URL

      if (!gasUrl) {
        setError("Google Apps Script URL not configured. Please follow setup instructions.")
        setIsSaving(false)
        return
      }

      const response = await fetch(gasUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          responses: responses,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSaved(true)
      } else {
        setError("Failed to save responses. Please try again.")
      }
    } catch (err) {
      console.error("[v0] Error saving to sheets:", err)
      setError("Connection error. Make sure your Google Apps Script is deployed correctly.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Closing message */}
        <div className="space-y-6">
          <p className="text-lg font-light text-foreground/80 leading-relaxed">
            Jawaban-jawabanmu bukan hanya kata-kata — mereka adalah gema dari sesuatu yang nyata.
          </p>

          <div className="space-y-4 text-foreground/60 font-light">
            <p>
              Mungkin aku tidak akan mengerti segalanya yang kamu bilang,
              <br />
              tapi aku akan menjaganya dengan baik —
            </p>
            <p>ketenangan, kejujuran, cinta yang tersembunyi di antara setiap baris.</p>
          </div>

          <p className="text-accent italic">
            Karena di antara kata-katamu dan kesunyian kami,
            <br />
            ada <span className="font-semibold">kita</span>.
            <br />
            Dan itu sudah cukup. 🌙
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="px-4 py-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive text-left">
            <p className="font-light">{error}</p>
          </div>
        )}

        {/* Save and restart buttons */}
        <div className="space-y-4 mt-12">
          <button
            onClick={handleSaveToSheets}
            disabled={isSaving || saved}
            className="w-full px-6 py-3 text-sm tracking-widest font-light bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-all duration-300 rounded-full"
          >
            {saved ? "✓ SAVED TO SHEETS" : isSaving ? "SAVING..." : "SAVE RESPONSES"}
          </button>

          <button
            onClick={onRestart}
            className="w-full px-6 py-3 text-sm tracking-widest font-light border border-foreground/30 text-foreground hover:bg-foreground/5 transition-all duration-300 rounded-full"
          >
            START AGAIN
          </button>
        </div>
      </div>
    </main>
  )
}
