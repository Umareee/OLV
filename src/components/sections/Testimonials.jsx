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
      quote: "OLIVANZA has redefined my understanding of olive oil. The depth of flavor and quality is remarkable. This Pakistani gem deserves all its international accolades!",
      author: "Ayesha Rahman",
      role: "Executive Chef, Lahore",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5
    },
    {
      id: 2,
      quote: "I'm proud to serve OLIVANZA at my restaurant. Customers immediately notice the difference. It's incredible that such world-class oil comes from Pakistan!",
      author: "Hassan Ali",
      role: "Restaurant Owner, Karachi",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5
    },
    {
      id: 3,
      quote: "As someone who values authenticity, OLIVANZA delivers on every front. Locally produced, globally recognized - exactly what Pakistan needs!",
      author: "Zainab Khan",
      role: "Food Journalist, Islamabad",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5
    },
    {
      id: 4,
      quote: "The flavor profile is extraordinary - fruity, peppery, perfectly balanced. OLIVANZA has become an essential part of my healthy cooking routine.",
      author: "Imran Malik",
      role: "Nutrition Expert",
      avatar: "https://i.pravatar.cc/150?img=33",
      rating: 5
    },
    {
      id: 5,
      quote: "Witnessing Pakistan's agricultural excellence through OLIVANZA fills me with pride. The awards speak volumes about its superior quality!",
      author: "Saima Farooq",
      role: "Culinary Instructor",
      avatar: "https://i.pravatar.cc/150?img=9",
      rating: 5
    },
    {
      id: 6,
      quote: "OLIVANZA rivals the finest international brands I've tasted. Supporting local while enjoying premium quality - it's a win-win!",
      author: "Ahmed Raza",
      role: "Hotel Chef, Multan",
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
          <span className="testimonials__label">Customer Experiences</span>
          <h2 className="testimonials__title">Celebrated Nationwide</h2>
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
