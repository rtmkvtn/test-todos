import { FunctionComponent, SVGProps } from 'react'

import CheckIcon from './icons/check.svg?react'
import TrashIcon from './icons/trash.svg?react'

import checkIcon from './icons/check.svg'
import trashIcon from './icons/trash.svg'

type SvgIconComponent = FunctionComponent<SVGProps<SVGSVGElement>>

export type IconTypes = 'check' | 'trash'

type IProps = {
  tag?: 'svg' | 'img'
  alt?: string
  type: IconTypes
  className?: string
  color?: string
  size?: number
  width?: number
  height?: number
}

const Icon = ({
  tag = 'svg',
  alt = '',
  type,
  className,
  color,
  size = 24,
  width = size,
  height = size,
}: IProps) => {
  const isSvg = tag === 'svg'

  let result: { img: string; svg: SvgIconComponent | null } = {
    img: '',
    svg: null,
  }

  if (type === 'check') result = { img: checkIcon, svg: CheckIcon }
  else if (type === 'trash') result = { img: trashIcon, svg: TrashIcon }

  if (isSvg && result.svg) {
    return (
      <result.svg
        width={width}
        height={height}
        className={className}
        color={color}
      />
    )
  }

  if (result.img) {
    return (
      <img
        src={result.img}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    )
  }

  return null
}

export default Icon
