import React, { useState } from 'react'
import { motion } from 'framer-motion'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import Container from '../common/Container'
import Button from '../common/Button'
import './Contact.scss'

const Contact = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you'd send this to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <section className="contact section section-light" id="contact" ref={ref}>
      <Container>
        <div className="contact__content">
          {/* Contact Info */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="contact__label">Get In Touch</span>
            <h2 className="contact__title">Let's Talk About Premium Olive Oil</h2>
            <p className="contact__description">
              Have questions about our products, wholesale orders, or shipping?
              We'd love to hear from you.
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <span className="contact__detail-icon">📍</span>
                <div className="contact__detail-content">
                  <strong className="contact__detail-title">Visit Us</strong>
                  <p className="contact__detail-text">
                    Mediterranean Grove Estate<br />
                    Tuscany, Italy
                  </p>
                </div>
              </div>

              <div className="contact__detail">
                <span className="contact__detail-icon">📧</span>
                <div className="contact__detail-content">
                  <strong className="contact__detail-title">Email Us</strong>
                  <p className="contact__detail-text">
                    <a href="mailto:hello@premiumoliveoil.com">hello@premiumoliveoil.com</a>
                  </p>
                </div>
              </div>

              <div className="contact__detail">
                <span className="contact__detail-icon">📞</span>
                <div className="contact__detail-content">
                  <strong className="contact__detail-title">Call Us</strong>
                  <p className="contact__detail-text">
                    <a href="tel:+390123456789">+39 (0) 123 456 789</a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="How can we help?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="6"
                  required
                  placeholder="Tell us what you'd like to know..."
                />
              </div>

              {isSubmitted && (
                <div className="form-success">
                  Thank you! We'll get back to you soon.
                </div>
              )}

              <Button
                variant="primary"
                size="large"
                type="submit"
                disabled={isSubmitted}
              >
                {isSubmitted ? 'Message Sent!' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default Contact
