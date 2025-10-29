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
      title: 'Harvesting',
      description: 'Our groves are cultivated using eco-friendly practices that protect the land for future generations.'
    },
    {
      id: 2,
      image: '/assets/washing.jpeg',
      title: 'Washing',
      description: 'Each olive is carefully picked by hand at peak ripeness to ensure optimal flavor and quality.'
    },
    {
      id: 3,
      image: '/assets/grinding.jpeg',
      title: 'Grinding',
      description: 'Processed within 24 hours using traditional cold-press methods to preserve natural antioxidants.'
    },
    {
      id: 4,
      image: '/assets/malaxation.jpeg',
      title: 'Malaxation',
      description: 'Recognized internationally for exceptional quality, taste, and commitment to excellence.'
    },
    {
      id: 5,
      image: '/assets/extraction.jpeg',
      title: 'Extraction',
      description: 'Every batch is rigorously tested to ensure purity, authenticity, and superior nutritional value.'
    },
    {
      id: 6,
      image: '/assets/seperation.jpeg',
      title: 'Separation',
      description: 'Four generations of expertise in cultivating the finest Mediterranean olive oil.'
    },
    {
      id: 7,
      image: '/assets/storage.jpeg',
      title: 'Storage',
      description: 'Four generations of expertise in cultivating the finest Mediterranean olive oil.'
    },
    {
      id: 8,
      image: '/assets/transportation.jpeg',
      title: 'Transportation',
      description: 'Swiftly moved in controlled conditions to maintain freshness and prevent damage before reaching your doorstep.'
    },
  ]

  return (
    <section className="features section section-light" id="features" ref={ref}>
      <Container>
        <div className="features__header">
          <span className="features__label">Why Choose Us</span>
          <h2 className="features__title">Quality You Can Trust</h2>
          <p className="features__subtitle">
            From our groves to your table, every step is guided by our passion for
            excellence and respect for tradition.
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
