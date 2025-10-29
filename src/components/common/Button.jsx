import React from 'react'
import './Button.scss'

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  as = 'button',
  href,
  onClick,
  disabled = false,
  className = '',
  ariaLabel,
  ...props
}) => {
  const Component = as === 'link' ? 'a' : 'button'

  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    className
  ].filter(Boolean).join(' ')

  const buttonProps = {
    className: classes,
    onClick,
    disabled: Component === 'button' ? disabled : undefined,
    'aria-label': ariaLabel,
    ...props
  }

  if (Component === 'a' && href) {
    buttonProps.href = href
  }

  return (
    <Component {...buttonProps}>
      {children}
    </Component>
  )
}

export default Button
