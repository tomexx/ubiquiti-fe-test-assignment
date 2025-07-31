import { LazyImage } from '@/components/ui'

interface ProductImageProps {
  productId: string
  imageId: string
  size: number
  alt: string
  className?: string
  placeholder?: React.ReactNode
  fallbackSrc?: string
}

const buildImageUrl = (id: string, imageHash: string, width: number) => {
  const baseUrl = 'https://static.ui.com/fingerprint/ui/images'
  const imagePath = `${baseUrl}/${id}/default/${imageHash}.png`
  const encodedImagePath = encodeURIComponent(imagePath)

  return `https://images.svc.ui.com/?u=${encodedImagePath}&w=${width}&q=75`
}

export function ProductImage({
  productId,
  imageId,
  size,
  alt,
  className,
  placeholder,
  fallbackSrc,
}: ProductImageProps) {
  const imageUrl = buildImageUrl(productId, imageId, size)

  const lazyImageProps = {
    src: imageUrl,
    alt,
    width: size,
    height: size,
    ...(className && { className }),
    ...(placeholder && { placeholder }),
    ...(fallbackSrc && { fallbackSrc }),
  }

  return <LazyImage {...lazyImageProps} />
}
