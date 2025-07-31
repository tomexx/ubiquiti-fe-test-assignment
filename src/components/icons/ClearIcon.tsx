import { Icon, type IconProps } from './Icon'

type ClearIconProps = Omit<IconProps, 'children' | 'viewBox'>

export function ClearIcon(props: ClearIconProps) {
  return (
    <Icon {...props} viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M6 18L18 6M6 6l12 12'
        stroke='currentColor'
        fill='none'
      />
    </Icon>
  )
}
