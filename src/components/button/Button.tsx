import React, { ButtonHTMLAttributes, FC } from 'react'

import classNames from 'classnames'

import styles from './Button.module.scss'

type IButtonMode = 'primary'
type IButtonSize = 'sm'

type IProps = {
  text: string
  mode?: IButtonMode
  size?: IButtonSize
  className?: string
  disabled?: boolean
  onClick?: () => void
  loading?: boolean
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled' | 'className' | 'size'
>

const Button: FC<IProps> = ({
  text,
  mode = 'primary',
  size = 'sm',
  className,
  disabled,
  onClick,
  loading,
  ...props
}) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      className={classNames(
        styles.btn,
        styles[mode],
        styles[size],
        loading && styles.loading,
        className && className
      )}
      disabled={disabled}
      onClick={handleOnClick}
      {...props}
    >
      {text}
    </button>
  )
}

export default Button
