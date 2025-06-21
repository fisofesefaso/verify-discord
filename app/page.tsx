"use client"

import { useEffect, useState } from "react"

export default function HomePage() {
  const [dots, setDots] = useState("")

  useEffect(() => {
    // Animate the loading dots
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    // Redirect after 3 seconds
    const redirectTimer = setTimeout(() => {
      // Replace this URL with your actual biolink
      window.location.href = "https://your-biolink-url.com"
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(redirectTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
        </div>

        {/* Loading Message */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Please wait, while we process ur request{dots}
          </h1>
          <p className="text-gray-600 text-lg">Redirecting you shortly...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full animate-pulse"
              style={{
                animation: "progress 3s ease-in-out forwards",
              }}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  )
}
