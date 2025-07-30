import { Link } from '@heroui/react'

export function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-01'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-text-01 mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-text-02 mb-2'>
          Page Not Found
        </h2>
        <p className='text-text-03 mb-8'>
          The page you're looking for doesn't exist.
        </p>
        <Link
          href='/'
          className='inline-flex items-center px-4 py-2 bg-ublue-06 text-white rounded-lg hover:bg-ublue-07 transition-colors'
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
