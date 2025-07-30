import { LogoIcon } from '@/components/icons'
import { Link } from '@heroui/react'

const Header = () => {
  return (
    <div className='flex bg-neutral-02 text-text-03 items-center'>
      <Link
        href='/'
        className='flex items-center focus:outline-ublue-06 focus:outline-1'
      >
        <LogoIcon
          size={50}
          className='text-neutral-10 p-[5px] hover:text-ublue-06 '
        />
      </Link>
      <Link href='/' className='inline-block ml-2'>
        Devices
      </Link>
      <div className='ml-auto'>
        Author:{' '}
        <a
          href='https://listiak.dev'
          target='_blank'
          rel='noopener noreferrer'
          className='mr-8 underline'
        >
          Tomas Listiak
        </a>
      </div>
    </div>
  )
}

export default Header
