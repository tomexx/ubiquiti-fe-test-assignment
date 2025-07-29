import { LogoIcon } from '@/components/icons'

const Header = () => {
  return (
    <div className='flex bg-neutral-02 text-text-03 items-center'>
      <div className='flex items-center'>
        <LogoIcon size={50} className='text-neutral-10 p-[5px]' />
      </div>
      <div className='flex-1 ml-2'>Devices</div>
      <div className=''>
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
