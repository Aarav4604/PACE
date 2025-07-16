import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements with depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-gray-500 to-gray-800 rounded-lg transform rotate-12 opacity-60 shadow-2xl blur-sm"></div>
        <div className="absolute top-40 right-8 w-24 h-40 bg-gradient-to-br from-gray-600 to-gray-900 rounded-lg transform -rotate-12 opacity-50 shadow-xl"></div>
        <div className="absolute bottom-60 left-6 w-20 h-32 bg-gradient-to-br from-gray-400 to-gray-700 rounded-lg transform rotate-45 opacity-40 shadow-lg blur-xs"></div>

        {/* Additional depth layers */}
        <div className="absolute top-32 left-20 w-16 h-24 bg-gradient-to-br from-gray-700 to-black rounded-lg transform rotate-6 opacity-30 shadow-xl"></div>
        <div className="absolute bottom-40 right-16 w-28 h-20 bg-gradient-to-br from-gray-600 to-gray-900 rounded-lg transform -rotate-6 opacity-35 shadow-2xl"></div>
      </div>

      {/* Ambient lighting effect */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-800/20 via-transparent to-transparent"></div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-sm mx-auto">
        {/* Logo/Icon area with enhanced depth */}
        <div className="mb-16 flex justify-center">
          <div className="relative">
            {/* Trading chart icon with layered depth */}
            <div className="w-28 h-28 relative drop-shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-700 rounded-xl transform rotate-12 shadow-2xl"></div>
              <div className="absolute top-2 left-2 w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-500 rounded-xl transform -rotate-6 shadow-xl"></div>
              <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-xl shadow-lg"></div>
              {/* Trading line overlay with glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-black drop-shadow-lg">
                  <path
                    d="M2 18 L7 12 L12 14 L22 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    className="drop-shadow-sm"
                  />
                  <circle cx="7" cy="12" r="2.5" fill="currentColor" className="drop-shadow-sm" />
                  <circle cx="12" cy="14" r="2.5" fill="currentColor" className="drop-shadow-sm" />
                  <circle cx="22" cy="6" r="2.5" fill="currentColor" className="drop-shadow-sm" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main heading with modern typography */}
        <h1 className="text-5xl font-extralight mb-6 leading-tight tracking-tight">
          <span className="font-thin">Trade</span>{" "}
          <span className="font-light bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-lg">
            Smarter
          </span>
          <span className="text-gray-300">.</span>
          <br />
          <span className="font-extralight tracking-wide">Quickly</span>
          <span className="text-gray-400">.</span> <span className="font-light">Globally</span>
          <span className="text-gray-500">.</span>
        </h1>

        {/* Subtitle with enhanced typography */}
        <p className="text-gray-300 text-lg mb-20 leading-relaxed font-light tracking-wide max-w-xs mx-auto">
          Enjoy confident and effortless trading, wherever you are, whenever you need it,{" "}
          <span className="text-white font-normal">always</span>.
        </p>

        {/* CTA Button - positioned lower and darker */}
        <div className="mt-8">
          <Link href="/signin">
            <Button className="w-full bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 text-white hover:bg-gray-800/90 rounded-2xl py-7 text-lg font-light tracking-wide flex items-center justify-between px-8 shadow-2xl hover:shadow-gray-900/50 transition-all duration-300 hover:scale-[1.02]">
              <span className="font-normal">Revolutionize Your Trading</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom indicator with glow */}
      <div className="absolute bottom-8 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full shadow-lg shadow-white/20"></div>
    </div>
  )
} 