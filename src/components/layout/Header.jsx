import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Container from '../common/Container'
import Button from '../common/Button'
import { useCart } from '../../context/CartContext'
import './Header.scss'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { toggleCart, getTotalItems } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (page) => {
    if (page === 'shop') {
      navigate('/shop')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (page === 'contact') {
      navigate('/contact')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // For home page sections (like 'products')
      if (location.pathname !== '/') {
        navigate('/')
        // Wait for navigation then scroll
        setTimeout(() => {
          const element = document.getElementById(page)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        // Already on home, just scroll
        const element = document.getElementById(page)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    setIsMobileMenuOpen(false)
  }

  const handleLogoClick = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navItems = [
    { label: 'Shop', id: 'shop' },
  ]

  // Only use transparent navbar on home page
  const isHomePage = location.pathname === '/'
  const shouldBeScrolled = isScrolled || !isHomePage

  return (
    <header className={`header ${shouldBeScrolled ? 'header--scrolled' : ''}`}>
      <a href="#main" className="skip-to-content">
        Skip to main content
      </a>

      <Container>
        <nav className="header__nav" aria-label="Main navigation">
          {/* Logo */}
          <div className="header__logo">
            <button
              onClick={handleLogoClick}
              className="header__logo-link"
              aria-label="Go to homepage"
            >
              <img
                src={shouldBeScrolled ? "/assets/olv-logo-2.png" : "/assets/olv-logo.png"}
                alt="Premium Olive Oil"
                className="header__logo-img"
              />
            </button>
          </div>

          {/* Spacer */}
          <div className="header__spacer"></div>

          {/* CTA & Cart */}
          <div className="header__actions">
            {/* Shop Link */}
            <button
              onClick={() => handleNavigation('shop')}
              className="header__menu-link"
            >
              Shop
            </button>

            {/* Cart Icon */}
            <button
              className="header__cart"
              onClick={toggleCart}
              aria-label={`Shopping cart with ${getTotalItems()} items`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="header__cart-badge">{getTotalItems()}</span>
              )}
            </button>

            <Button
              variant="primary"
              size="small"
              onClick={() => handleNavigation('contact')}
              ariaLabel="Contact us"
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="header__hamburger-line"></span>
            <span className="header__hamburger-line"></span>
            <span className="header__hamburger-line"></span>
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <Container>
          {/* Close Button */}
          <button
            className="header__mobile-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <ul className="header__mobile-list">
            {navItems.map((item) => (
              <li key={item.id} className="header__mobile-item">
                <button
                  onClick={() => handleNavigation(item.id)}
                  className="header__mobile-link"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="header__mobile-item">
              <button
                onClick={() => {
                  toggleCart()
                  setIsMobileMenuOpen(false)
                }}
                className="header__mobile-link header__mobile-cart-link"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span>Cart</span>
                {getTotalItems() > 0 && (
                  <span className="header__mobile-cart-badge">{getTotalItems()}</span>
                )}
              </button>
            </li>
            <li className="header__mobile-item header__mobile-item--cta">
              <Button
                variant="primary"
                onClick={() => handleNavigation('contact')}
                className="header__mobile-cta"
              >
                Contact Us
              </Button>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  )
}

export default Header
