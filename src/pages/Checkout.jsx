import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import './Checkout.scss'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getTotalPrice, clearCart, toggleCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields validation
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'address', 'city', 'state', 'zipCode', 'country',
      'cardNumber', 'cardName', 'expiryDate', 'cvv'
    ]

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required'
      }
    })

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Phone validation
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Card number validation (basic)
    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number'
    }

    // CVV validation
    if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      alert('Your cart is empty')
      return
    }

    if (validateForm()) {
      // Here you would normally process the payment
      // For now, we'll just simulate success
      alert('Order placed successfully!')
      clearCart()
      navigate('/')
    }
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <Container>
          <div className="checkout-page__empty">
            <h2>Your cart is empty</h2>
            <p>Add some products to proceed to checkout</p>
            <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <Container>
        <div className="checkout-page__header">
          <h1 className="checkout-page__title">Checkout</h1>
          <button
            className="checkout-page__back"
            onClick={toggleCart}
          >
            ← Back to Cart
          </button>
        </div>

        <div className="checkout-page__content">
          {/* Checkout Form */}
          <div className="checkout-page__form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Contact Information */}
              <section className="checkout-form__section">
                <h2 className="checkout-form__section-title">Contact Information</h2>
                <div className="checkout-form__row">
                  <div className="checkout-form__field">
                    <label htmlFor="firstName" className="checkout-form__label">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`checkout-form__input ${errors.firstName ? 'checkout-form__input--error' : ''}`}
                    />
                    {errors.firstName && (
                      <span className="checkout-form__error">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="checkout-form__field">
                    <label htmlFor="lastName" className="checkout-form__label">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`checkout-form__input ${errors.lastName ? 'checkout-form__input--error' : ''}`}
                    />
                    {errors.lastName && (
                      <span className="checkout-form__error">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="checkout-form__row">
                  <div className="checkout-form__field">
                    <label htmlFor="email" className="checkout-form__label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`checkout-form__input ${errors.email ? 'checkout-form__input--error' : ''}`}
                    />
                    {errors.email && (
                      <span className="checkout-form__error">{errors.email}</span>
                    )}
                  </div>

                  <div className="checkout-form__field">
                    <label htmlFor="phone" className="checkout-form__label">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`checkout-form__input ${errors.phone ? 'checkout-form__input--error' : ''}`}
                    />
                    {errors.phone && (
                      <span className="checkout-form__error">{errors.phone}</span>
                    )}
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="checkout-form__section">
                <h2 className="checkout-form__section-title">Shipping Address</h2>
                <div className="checkout-form__field">
                  <label htmlFor="address" className="checkout-form__label">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`checkout-form__input ${errors.address ? 'checkout-form__input--error' : ''}`}
                  />
                  {errors.address && (
                    <span className="checkout-form__error">{errors.address}</span>
                  )}
                </div>

                <div className="checkout-form__row">
                  <div className="checkout-form__field">
                    <label htmlFor="city" className="checkout-form__label">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`checkout-form__input ${errors.city ? 'checkout-form__input--error' : ''}`}
                    />
                    {errors.city && (
                      <span className="checkout-form__error">{errors.city}</span>
                    )}
                  </div>

                  <div className="checkout-form__field">
                    <label htmlFor="state" className="checkout-form__label">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`checkout-form__input ${errors.state ? 'checkout-form__input--error' : ''}`}
                    />
                    {errors.state && (
                      <span className="checkout-form__error">{errors.state}</span>
                    )}
                  </div>
                </div>

                <div className="checkout-form__row">
                  <div className="checkout-form__field">
                    <label htmlFor="zipCode" className="checkout-form__label">
                      ZIP/Postal Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`checkout-form__input ${errors.zipCode ? 'checkout-form__input--error' : ''}`}
                    />
                    {errors.zipCode && (
                      <span className="checkout-form__error">{errors.zipCode}</span>
                    )}
                  </div>

                  <div className="checkout-form__field">
                    <label htmlFor="country" className="checkout-form__label">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`checkout-form__input ${errors.country ? 'checkout-form__input--error' : ''}`}
                    />
                    {errors.country && (
                      <span className="checkout-form__error">{errors.country}</span>
                    )}
                  </div>
                </div>
              </section>

              {/* Payment Information */}
              <section className="checkout-form__section">
                <h2 className="checkout-form__section-title">Payment Information</h2>
                <div className="checkout-form__field">
                  <label htmlFor="cardNumber" className="checkout-form__label">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className={`checkout-form__input ${errors.cardNumber ? 'checkout-form__input--error' : ''}`}
                  />
                  {errors.cardNumber && (
                    <span className="checkout-form__error">{errors.cardNumber}</span>
                  )}
                </div>

                <div className="checkout-form__field">
                  <label htmlFor="cardName" className="checkout-form__label">
                    Name on Card *
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={`checkout-form__input ${errors.cardName ? 'checkout-form__input--error' : ''}`}
                  />
                  {errors.cardName && (
                    <span className="checkout-form__error">{errors.cardName}</span>
                  )}
                </div>

                <div className="checkout-form__row">
                  <div className="checkout-form__field">
                    <label htmlFor="expiryDate" className="checkout-form__label">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className={`checkout-form__input ${errors.expiryDate ? 'checkout-form__input--error' : ''}`}
                    />
                    {errors.expiryDate && (
                      <span className="checkout-form__error">{errors.expiryDate}</span>
                    )}
                  </div>

                  <div className="checkout-form__field">
                    <label htmlFor="cvv" className="checkout-form__label">
                      CVV *
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="4"
                      className={`checkout-form__input ${errors.cvv ? 'checkout-form__input--error' : ''}`}
                    />
                    {errors.cvv && (
                      <span className="checkout-form__error">{errors.cvv}</span>
                    )}
                  </div>
                </div>
              </section>

              <Button
                type="submit"
                variant="primary"
                size="large"
                className="checkout-form__submit"
              >
                Place Order - ${total.toFixed(2)}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="checkout-page__summary-section">
            <div className="order-summary">
              <h2 className="order-summary__title">Order Summary</h2>

              <div className="order-summary__items">
                {cartItems.map(item => (
                  <div key={item.id} className="order-summary__item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-summary__item-image"
                    />
                    <div className="order-summary__item-details">
                      <h3 className="order-summary__item-name">{item.name}</h3>
                      <p className="order-summary__item-size">{item.size}</p>
                      <p className="order-summary__item-quantity">Qty: {item.quantity}</p>
                    </div>
                    <p className="order-summary__item-price">
                      ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="order-summary__totals">
                <div className="order-summary__row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="order-summary__row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="order-summary__row">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="order-summary__row order-summary__row--total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="order-summary__free-shipping">
                  🎉 You've qualified for free shipping!
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Checkout
