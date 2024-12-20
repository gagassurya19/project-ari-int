'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/sign/beach-background.png"
        alt="Beach background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-[#0A1172] md:text-6xl lg:text-7xl">
          Thanks for signing up!
        </h1>
        <p className="mb-8 font-serif text-3xl text-[#0A1172] md:text-4xl lg:text-5xl">
          Ready to start?
        </p>
        <Button 
          asChild
          className="bg-[#0A1172] px-8 py-6 text-lg font-semibold hover:bg-[#0A1172]/90"
        >
          <Link href="/">
            HOMEPAGE
          </Link>
        </Button>
      </div>
    </div>
  )
}

