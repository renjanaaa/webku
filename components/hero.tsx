"use client"

import { useState, useEffect } from "react"

interface HeroProps {
  onStart: () => void
}

export default function Hero({ onStart }: HeroProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Opening subtitle */}
        <p className="text-sm tracking-widest text-muted-foreground mb-6 font-light">BETWEEN US</p>

        {/* Opening quote */}
        <p className="text-accent/70 italic text-lg mb-16 font-light leading-relaxed">"This Question Only For U"</p>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-light mb-8 text-foreground tracking-tight">Malam Ini</h1>

        {/* Intro text */}
        <div className="text-foreground/70 space-y-4 mb-12 font-light leading-relaxed">
          <p>
            Bukan tentang benar atau salah. Aku cuma pengen tahu sedikit lebih banyak tentang hatimu—
            <br />
            lewat kata, lewat kejujuran kecil yang mungkin nggak pernah sempat diucapkan.
          </p>
          <p className="text-accent/60">Jadi... jawab dengan tenang, ya. 🖤</p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="px-8 py-3 border border-foreground/30 text-foreground hover:bg-foreground/5 transition-all duration-300 rounded-full text-sm tracking-widest font-light"
        >
          BEGIN THE CONVERSATION
        </button>

        {/* Scroll indicator */}
        <div className={`mt-16 text-center transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}>
          <p className="text-xs text-muted-foreground tracking-widest animate-pulse">SCROLL TO CONTINUE</p>
        </div>
      </div>
    </main>
  )
}
