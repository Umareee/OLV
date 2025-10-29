import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import Container from '../common/Container'
import './Testimonials.scss'

const Testimonials = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  const testimonials = [
    {
      id: 1,
      quote: "The finest olive oil I've ever tasted. Rich, complex, and absolutely delicious. It's transformed my cooking.",
      author: "Sarah Mitchell",
      role: "Chef & Food Blogger",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5
    },
    {
      id: 2,
      quote: "Exceptional quality and attention to detail. You can taste the care that goes into every bottle.",
      author: "Marco Rossi",
      role: "Restaurant Owner",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5
    },
    {
      id: 3,
      quote: "I appreciate the sustainable practices and traditional methods. Premium quality with a conscience.",
      author: "Emma Thompson",
      role: "Culinary Enthusiast",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5
    },
    {
      id: 4,
      quote: "Outstanding flavor that brings out the best in every dish. A staple in my kitchen now.",
      author: "David Chen",
      role: "Home Cook",
      avatar: "https://i.pravatar.cc/150?img=33",
      rating: 5
    },
    {
      id: 5,
      quote: "The perfect balance of flavor and quality. Every drop is worth it!",
      author: "Lisa Anderson",
      role: "Food Critic",
      avatar: "https://i.pravatar.cc/150?img=9",
      rating: 5
    },
    {
      id: 6,
      quote: "An essential ingredient in my Mediterranean cooking. Authentic and delicious.",
      author: "Antonio Silva",
      role: "Chef",
      avatar: "https://i.pravatar.cc/150?img=15",
      rating: 5
    }
  ]

  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  // Auto-scroll carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(timer)
  }, [totalPages])

  const getCurrentTestimonials = () => {
    const start = currentIndex * itemsPerPage
    return testimonials.slice(start, start + itemsPerPage)
  }

  return (
    <section className="testimonials section section-dark" id="testimonials" ref={ref}>
      <Container>
        {/* Testimonials */}
        <div className="testimonials__header">
          <span className="testimonials__label">What People Say</span>
          <h2 className="testimonials__title">Trusted by Food Lovers</h2>
        </div>

        <div className="testimonials__carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="testimonials__grid"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {getCurrentTestimonials().map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-card__rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="testimonial-card__star">★</span>
                    ))}
                  </div>
                  <p className="testimonial-card__quote">"{testimonial.quote}"</p>
                  <div className="testimonial-card__author-wrapper">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="testimonial-card__avatar"
                    />
                    <div className="testimonial-card__author">
                      <strong className="testimonial-card__name">{testimonial.author}</strong>
                      <span className="testimonial-card__role">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Carousel Dots */}
          <div className="testimonials__dots">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`testimonials__dot ${index === currentIndex ? 'testimonials__dot--active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </Container>
    </section>
  )
}

export default Testimonials
