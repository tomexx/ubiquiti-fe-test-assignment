import { UI_CONSTANTS } from '@/config'
import { Image } from '@heroui/react'
import { useEffect, useRef, useState } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
  placeholder?: React.ReactNode
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc,
  placeholder,
}: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: UI_CONSTANTS.SEARCH.INTERSECTION_ROOT_MARGIN, // Start loading before the image comes into view
        threshold: UI_CONSTANTS.SEARCH.INTERSECTION_THRESHOLD,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setHasLoaded(true)
  }

  const handleError = () => {
    setHasLoaded(true) // Still consider it "loaded" to remove placeholder
  }

  return (
    <div ref={imgRef} className='relative' style={{ width, height }}>
      {/* Placeholder shown while not visible or loading */}
      {(!isVisible || !hasLoaded) && (
        <div
          className='absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse'
          style={{ width, height }}
        >
          {placeholder || (
            <div className='w-8 h-8 bg-gray-300 rounded animate-pulse' />
          )}
        </div>
      )}

      {/* Actual image - only rendered when visible */}
      {isVisible && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${className} ${
            hasLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-${
            UI_CONSTANTS.ANIMATION.FADE_DURATION
          }`}
          fallbackSrc={fallbackSrc}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  )
}
