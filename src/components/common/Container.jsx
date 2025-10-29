import React from 'react'
import './Container.scss'

const Container = ({ children, className = '', ...props }) => {
  return (
    <div className={`container ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Container
