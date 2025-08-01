import { LogoIcon } from '@/components/icons'
import { Link as HeroLink } from '@heroui/react'
import { Link as RouterLink } from '@tanstack/react-router'

const Header = () => {
  return (
    <div className='w-full h-[50px]'>
      <div className='flex bg-neutral-02 text-text-03 items-center flex-shrink-0'>
        <HeroLink
          as={RouterLink}
          to='/'
          className='flex items-center focus:outline-ublue-06 focus:outline-1'
        >
          <LogoIcon
            size={50}
            className='text-neutral-10 p-[5px] hover:text-ublue-06 '
          />
        </HeroLink>
        <HeroLink
          size='sm'
          as={RouterLink}
          to='/'
          className='inline-block ml-2 text-text-03'
        >
          Devices
        </HeroLink>
        <div className='ml-auto'>
          Author:{' '}
          <a
            href='https://listiak.dev'
            target='_blank'
            rel='noopener noreferrer'
            className='mr-8 underline focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ublue-06 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-ublue-06 focus-visible:ring-offset-2'
          >
            Tomas Listiak
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header
