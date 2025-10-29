import React from 'react'
import './PageHero.scss'

const PageHero = ({ title, backgroundImage }) => {
  return (
    <div className="page-hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="page-hero__overlay"></div>
      <div className="page-hero__content">
        <h1 className="page-hero__title">{title}</h1>
      </div>
    </div>
  )
}

export default PageHero
