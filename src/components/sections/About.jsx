import React from 'react'
import { motion } from 'framer-motion'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import Container from '../common/Container'
import './About.scss'

const About = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section className="about section section-light" id="about" ref={ref}>
      <Container>
        <div className="about__content">
          {/* Text Content */}
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="about__label">Our Story</span>
            <h2 className="about__title">
              Crafted with Tradition, Delivered with Excellence
            </h2>
            <p className="about__description">
              For generations, our family has cultivated ancient olive groves in the heart of the Mediterranean.
              Each bottle represents our commitment to preserving traditional methods while embracing sustainable practices.
            </p>
            <p className="about__description">
              Our olives are hand-picked at peak ripeness and cold-pressed within hours to preserve their
              natural antioxidants, polyphenols, and distinctive flavor profile. The result is a premium
              extra-virgin olive oil that captures the essence of our sun-drenched groves.
            </p>

            <div className="about__stats">
              <div className="about__stat">
                <span className="about__stat-number">100+</span>
                <span className="about__stat-label">Years of Heritage</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">5,000+</span>
                <span className="about__stat-label">Olive Trees</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">24hrs</span>
                <span className="about__stat-label">From Harvest to Press</span>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="about__image-wrapper"
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="about__image">
              <img
                src="assets\Bottle.jpg"
                alt="Olive grove with ancient trees in Mediterranean sunlight"
                loading="lazy"
              />
            </div>
            <div className="about__image-accent"></div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default About
