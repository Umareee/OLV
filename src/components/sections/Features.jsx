import React from 'react'
import { motion } from 'framer-motion'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import Container from '../common/Container'
import './Features.scss'

const Features = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  const features = [
    {
      id: 1,
      image: '/assets/harvesting.jpeg',
      title: 'Selective Harvesting',
      description: 'Premium olives handpicked at optimal ripeness from Pakistan\'s finest orchards, ensuring superior quality from the start.'
    },
    {
      id: 2,
      image: '/assets/washing.jpeg',
      title: 'Purification Process',
      description: 'Thoroughly cleansed using advanced filtration systems to remove impurities while maintaining natural properties.'
    },
    {
      id: 3,
      image: '/assets/grinding.jpeg',
      title: 'Precision Milling',
      description: 'State-of-the-art grinding technology transforms fresh olives into paste within hours of harvest, preserving vital nutrients.'
    },
    {
      id: 4,
      image: '/assets/malaxation.jpeg',
      title: 'Controlled Mixing',
      description: 'Carefully monitored malaxation at optimal temperatures releases oil droplets while protecting delicate flavor compounds.'
    },
    {
      id: 5,
      image: '/assets/extraction.jpeg',
      title: 'Cold Extraction',
      description: 'Revolutionary centrifugation method extracts pure oil at controlled temperatures, maintaining award-winning quality standards.'
    },
    {
      id: 6,
      image: '/assets/seperation.jpeg',
      title: 'Natural Filtering',
      description: 'Advanced separation techniques remove water and solids, yielding crystal-clear extra virgin olive oil.'
    },
    {
      id: 7,
      image: '/assets/storage.jpeg',
      title: 'Protected Storage',
      description: 'Stored in temperature-controlled stainless steel tanks under nitrogen blanket to preserve freshness and antioxidants.'
    },
    {
      id: 8,
      image: '/assets/transportation.jpeg',
      title: 'Secure Distribution',
      description: 'Carefully transported in climate-controlled conditions, ensuring every bottle reaches you in perfect condition.'
    },
  ]

  return (
    <section className="features section section-light" id="features" ref={ref}>
      <Container>
        <div className="features__header">
          <span className="features__label">Our Production Journey</span>
          <h2 className="features__title">From Orchard to Excellence</h2>
          <p className="features__subtitle">
            Witness the meticulous eight-stage process that transforms Pakistani olives
            into internationally acclaimed extra virgin olive oil.
          </p>
        </div>

        <div className="features__grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className={`feature-card ${
                index !== 3 && index < features.length - 1 ? 'feature-card--with-arrow' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="feature-card__icon">
                <img src={feature.image} alt={feature.title} />
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>

              {/* Arrow after card (except after 4th card and last card) */}
              {index !== 3 && index < features.length - 1 && (
                <motion.div
                  className="feature-card__arrow"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Features
