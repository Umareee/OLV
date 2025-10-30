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
            <span className="about__label">Our Legacy</span>
            <h2 className="about__title">
              From Pakistani Soil to International Glory
            </h2>
            <p className="about__description">
              OLIVANZA represents a groundbreaking achievement in Pakistan's agricultural history. Cultivated
              in the fertile valleys of Pakistan, our olive groves thrive under ideal conditions, producing
              olives of exceptional quality that rival the finest Mediterranean varieties.
            </p>
            <p className="about__description">
              Through meticulous cultivation practices and cutting-edge extraction technology, we've created
              an extra virgin olive oil that has earned prestigious international awards. Each bottle embodies
              our vision of putting Pakistan on the global olive oil map while supporting local farming communities.
            </p>

            <div className="about__stats">
              <div className="about__stat">
                <span className="about__stat-number">First</span>
                <span className="about__stat-label">Award-Winning in Pakistan</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">100%</span>
                <span className="about__stat-label">Pakistani Grown</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">Global</span>
                <span className="about__stat-label">Recognition</span>
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
                alt="OLIVANZA - Pakistan's award-winning olive oil"
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
