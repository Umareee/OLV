import React from 'react'
import { motion } from 'framer-motion'
import useScrollParallax from '../../hooks/useScrollParallax'
import useTypewriter from '../../hooks/useTypewriter'
import Button from '../common/Button'
import './Hero.scss'

const Hero = () => {
  const offsetY = useScrollParallax(0.3)

  // Rotating titles with typewriter effect
  const titles = [
    'Globally Celebrated. Locally Crafted.',
    'From Pakistani Orchards to Global Prestige.',
    'Pure. Authentic. Internationally Honored.',
  ]

  const typedText = useTypewriter(titles, 120, 60, 2500)

  const scrollToProducts = () => {
    const element = document.getElementById('products')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" id="hero">
      {/* Parallax Background */}
      <div
        className="hero__background"
        style={{ transform: `translateY(${offsetY}px)` }}
      >
        <div className="hero__overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero__content">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className="hero__label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Olivanza — Where Nature Meets Global Recognition.
          </motion.span>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {typedText}
            <span className="hero__title-cursor">|</span>
          </motion.h1>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button
              variant="primary"
              size="large"
              onClick={scrollToProducts}
              ariaLabel="Shop our products"
              className="hero__explore-btn"
            >
              Shop Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
