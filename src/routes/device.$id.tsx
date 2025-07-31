import { useDevice } from '@/api/queries/devices'
import { ProductImage } from '@/components/common'
import { DeviceDetails } from '@/components/features'
import { BackButton, ContextualHeader } from '@/components/layout'
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  addToast,
  useDisclosure,
} from '@heroui/react'
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/device/$id')({
  component: DeviceDetail,
})

function DeviceDetail() {
  const { id } = useParams({ from: '/device/$id' })
  const navigate = useNavigate()
  const { data: device, isLoading, error } = useDevice(id)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleBack = () => {
    navigate({ to: '/' })
  }

  const handleCopyToClipboard = async () => {
    if (!device) return

    try {
      await navigator.clipboard.writeText(JSON.stringify(device, null, 2))
      addToast({
        title: 'JSON copied to clipboard',
        color: 'success',
      })
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
      addToast({
        title: 'Failed to copy to clipboard',
        color: 'danger',
      })
    }
  }

  return (
    <>
      <ContextualHeader leftContent={<BackButton onBack={handleBack} />} />
      {isLoading && (
        <div className='flex justify-center items-center h-64'>
          <Spinner size='lg' />
        </div>
      )}
      {error && (
        <div className='flex justify-center items-center h-64 text-red-500'>
          <p>Failed to load device: {error.message}</p>
        </div>
      )}
      {!isLoading && !error && !device && (
        <div className='flex justify-center items-center h-64 text-gray-500'>
          <p>Device not found</p>
        </div>
      )}
      {!isLoading && !error && device && (
        <div className='h-full flex flex-col p-4 sm:p-6'>
          <div className='max-w-4xl mx-auto w-full'>
            <div className='flex flex-col sm:flex-row gap-6 sm:gap-8 items-start'>
              <div className='flex-shrink-0 bg-neutral-01 rounded-lg mx-auto sm:mx-0'>
                <ProductImage
                  productId={device.id}
                  imageId={device.images.default}
                  size={300}
                  alt={device.product.name}
                  className='w-[300px] h-[300px] object-cover'
                />
              </div>

              {/* Product Details */}
              <div className='flex-1 space-y-6 w-full'>
                <div>
                  <h1 className='text-xl sm:text-2xl font-bold mb-2'>
                    {device.product.name}
                  </h1>
                  <p className='text-xs text-text-03 mb-4'>
                    {device.line.name}
                  </p>

                  <DeviceDetails device={device} className='mb-6' />

                  <div className='mt-6'>
                    <Link onClick={onOpen} className='cursor-pointer text-sm'>
                      See All Details as JSON
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                    {device.product.name}
                  </ModalHeader>
                  <ModalBody>
                    <pre className='bg-neutral-02 p-4 rounded-lg text-sm overflow-auto font-mono whitespace-pre-wrap'>
                      {JSON.stringify(device, null, 2)}
                    </pre>
                  </ModalBody>
                  <ModalFooter>
                    <Button color='default' variant='light' onPress={onClose}>
                      Close
                    </Button>
                    <Button color={'primary'} onPress={handleCopyToClipboard}>
                      Copy to clipboard
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  )
}
