import type { ComponentPropsWithoutRef } from 'react'
import { useEffect, useState } from 'react'

interface SvgIconProps extends ComponentPropsWithoutRef<'div'> {
  src: string
  size?: number | string
  alt?: string
}

export function SvgIcon({
  src,
  size = 24,
  alt = '',
  className = '',
  ...props
}: SvgIconProps) {
  const [svgContent, setSvgContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSvg = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Import the SVG as a string
        const response = await fetch(src)
        if (!response.ok) {
          throw new Error(`Failed to load SVG: ${response.statusText}`)
        }

        const svgText = await response.text()

        // Modify the SVG to include size and currentColor
        const modifiedSvg = svgText
          .replace(/width="[^"]*"/, `width="${size}"`)
          .replace(/height="[^"]*"/, `height="${size}"`)
          .replace(/fill="[^"]*"/g, 'fill="currentColor"')

        setSvgContent(modifiedSvg)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load SVG')
      } finally {
        setIsLoading(false)
      }
    }

    if (src) {
      loadSvg()
    }
  }, [src, size])

  if (isLoading) {
    return (
      <div
        className={`inline-block ${className}`}
        style={{ width: size, height: size }}
        {...props}
      >
        <div
          className='animate-pulse bg-gray-300 rounded'
          style={{ width: size, height: size }}
        />
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={`inline-block text-red-500 ${className}`}
        style={{ width: size, height: size }}
        title={error}
        {...props}
      >
        ⚠
      </div>
    )
  }

  return (
    <div
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      role='img'
      aria-label={alt}
      {...props}
    />
  )
}
