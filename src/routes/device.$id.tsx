import { useDevice } from '@/api/queries/devices'
import { ProductImage } from '@/components/common'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from '@heroui/react'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/device/$id')({
  component: DeviceDetail,
})

function DeviceDetail() {
  const { id } = useParams({ from: '/device/$id' })
  const { data: device, isLoading, error } = useDevice(id)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopyToClipboard = async () => {
    if (!device) return

    try {
      await navigator.clipboard.writeText(JSON.stringify(device, null, 2))
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <Spinner size='lg' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-64 text-red-500'>
        <p>Failed to load device: {error.message}</p>
      </div>
    )
  }

  if (!device) {
    return (
      <div className='flex justify-center items-center h-64 text-gray-500'>
        <p>Device not found</p>
      </div>
    )
  }

  return (
    <div className='h-full flex flex-col'>
      {/* Header */}
      <div className='flex-shrink-0 p-6 pb-4 bg-white border-b border-gray-200'>
        <h1 className='text-2xl font-bold mb-2'>{device.product.name}</h1>
        <p className='text-sm text-gray-600'>
          Product Line: {device.line.name}
        </p>
      </div>

      {/* Content */}
      <div className='flex-1 min-h-0 p-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex gap-8 items-start'>
            {/* Product Image */}
            <div className='flex-shrink-0'>
              <ProductImage
                productId={device.id}
                imageId={device.images.default}
                size={300}
                alt={device.product.name}
                className='rounded-lg shadow-md'
              />
            </div>

            {/* Product Details */}
            <div className='flex-1 space-y-6'>
              <div>
                <h2 className='text-lg font-semibold mb-4'>Product Details</h2>
                <div className='space-y-3'>
                  <div>
                    <span className='font-medium text-gray-700'>ID:</span>
                    <span className='ml-2 font-mono text-sm'>{device.id}</span>
                  </div>
                  <div>
                    <span className='font-medium text-gray-700'>Name:</span>
                    <span className='ml-2'>{device.product.name}</span>
                  </div>
                  <div>
                    <span className='font-medium text-gray-700'>
                      Abbreviation:
                    </span>
                    <span className='ml-2 font-mono text-sm'>
                      {device.product.abbrev}
                    </span>
                  </div>
                  <div>
                    <span className='font-medium text-gray-700'>
                      Product Line:
                    </span>
                    <span className='ml-2'>
                      {device.line.name} ({device.line.id})
                    </span>
                  </div>
                  {device.shortnames?.length > 0 && (
                    <div>
                      <span className='font-medium text-gray-700'>
                        Short Names:
                      </span>
                      <div className='ml-2 mt-1'>
                        {device.shortnames.map((name, index) => (
                          <span
                            key={index}
                            className='inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-2 mb-1 font-mono'
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className='pt-4 border-t border-gray-200'>
                <Button onPress={onOpen} color='primary' variant='bordered'>
                  View Full JSON
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='3xl'
        scrollBehavior='inside'
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Device JSON - {device.product.name}
              </ModalHeader>
              <ModalBody>
                <pre className='bg-gray-50 p-4 rounded-lg text-sm overflow-auto font-mono whitespace-pre-wrap'>
                  {JSON.stringify(device, null, 2)}
                </pre>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button
                  color={copySuccess ? 'success' : 'primary'}
                  onPress={handleCopyToClipboard}
                >
                  {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
