"use client"

import { useEffect, useRef, useState } from "react"

export default function VideoSection() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(false)
  const [openVideo, setOpenVideo] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
        }
      },
      { threshold: 0.4 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* SECTION */}
      <section
        ref={sectionRef}
        className="relative h-[90vh] w-full overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/video/video-bg.png')",
          }}
        />

        {/* Animated Overlay */}
        <div
          className={`
            absolute inset-0
            bg-gradient-to-b from-transparent to-[#094745]
            transition-all duration-1000 ease-out
            ${active ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}
          `}
        />

        {/* Content */}
        <div className="relative z-5 flex h-full flex-col items-center justify-center text-center text-white px-4">
          
          {/* Play Button */}
          <button
            onClick={() => setOpenVideo(true)}
            className="mb-8"
          >
            <img
              src="/images/video/play-btn.png"
              alt="Play Video"
              className="h-20 w-20 hover:scale-110 transition"
            />
          </button>

          {/* Text */}
          <div className="absolute bottom-[75px]">
            <h5
                className={`
                text-[36px] leading-[1.2] tracking-wide transition-all duration-700 delay-200
                ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
            >
                Discover the Precision of the
            </h5>

            <h2
                className={`
                mt-2 text-[80px] font-bold leading-[1.2] transition-all duration-700 delay-300
                ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
            >
                AJAX SERIES
            </h2>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {openVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-4xl aspect-video bg-black">
            
            {/* Close */}
            <button
              onClick={() => setOpenVideo(false)}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              ✕
            </button>

            {/* Video */}
            <video
              src="/images/video/video.mp4" // replace
              controls
              autoPlay
              muted
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </>
  )
}
