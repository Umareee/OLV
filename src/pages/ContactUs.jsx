import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import './ContactUs.scss'

const ContactUs = () => {
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
    <div className="contact-page">
      <PageHero
        title="Connect with OLIVANZA"
        backgroundImage="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1920&q=80"
      />

      <section className="contact-page__content section">
        <Container>
          <div className="contact-page__intro">
            <p className="contact-page__description">
              Questions about our award-winning olive oil, partnerships, or bulk orders?
              The OLIVANZA team is here to assist you.
            </p>
          </div>

          <div className="contact-page__grid">
            {/* Contact Info */}
            <motion.div
              className="contact-page__info"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="contact-page__info-title">Reach Out</h3>

              <div className="contact-page__details">
                <div className="contact-page__detail">
                  <span className="contact-page__detail-icon">📍</span>
                  <div className="contact-page__detail-content">
                    <strong className="contact-page__detail-title">Location</strong>
                    <p className="contact-page__detail-text">
                      OLIVANZA Production Center<br />
                      Pothohar Region, Pakistan
                    </p>
                  </div>
                </div>

                <div className="contact-page__detail">
                  <span className="contact-page__detail-icon">📧</span>
                  <div className="contact-page__detail-content">
                    <strong className="contact-page__detail-title">Email</strong>
                    <p className="contact-page__detail-text">
                      <a href="mailto:Syedabdullahshah149@gmail.com">Syedabdullahshah149@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="contact-page__detail">
                  <span className="contact-page__detail-icon">📞</span>
                  <div className="contact-page__detail-content">
                    <strong className="contact-page__detail-title">Phone</strong>
                    <p className="contact-page__detail-text">
                      <a href="tel:+92512345678">+92 3128214950</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-page__hours">
                <h4 className="contact-page__hours-title">Available Hours</h4>
                <p>Monday - Saturday: 9:00 AM - 6:00 PM PKT</p>
                <p>Sunday: 10:00 AM - 2:00 PM PKT</p>
                <p>Closed on Public Holidays</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="contact-page__form-wrapper"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="contact-page__form-title">Share Your Inquiry</h3>

              <form className="contact-page__form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Topic
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="What's this regarding?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="6"
                    required
                    placeholder="Share your thoughts or questions..."
                  />
                </div>

                {isSubmitted && (
                  <div className="form-success">
                    Received! OLIVANZA will respond soon.
                  </div>
                )}

                <Button
                  variant="primary"
                  size="large"
                  type="submit"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? 'Message Delivered!' : 'Submit Inquiry'}
                </Button>
              </form>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default ContactUs
