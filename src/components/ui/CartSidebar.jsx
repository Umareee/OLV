import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import Button from '../common/Button'
import './CartSidebar.scss'

const CartSidebar = () => {
  const navigate = useNavigate()
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice
  } = useCart()

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Cart Sidebar */}
          <motion.aside
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            {/* Header */}
            <div className="cart-sidebar__header">
              <h2 className="cart-sidebar__title">
                Shopping Cart ({getTotalItems()})
              </h2>
              <button
                className="cart-sidebar__close"
                onClick={closeCart}
                aria-label="Close cart"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="cart-sidebar__items">
              {cartItems.length === 0 ? (
                <div className="cart-sidebar__empty">
                  <div className="cart-sidebar__empty-icon">🛒</div>
                  <p className="cart-sidebar__empty-text">Your cart is empty</p>
                  <Button variant="primary" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="cart-item"
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <div className="cart-item__image">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart-item__details">
                      <h3 className="cart-item__name">{item.name}</h3>
                      <p className="cart-item__size">{item.size}</p>
                      <p className="cart-item__price">{item.price}</p>
                    </div>

                    <div className="cart-item__actions">
                      <div className="cart-item__quantity">
                        <button
                          className="cart-item__qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="cart-item__qty-value">{item.quantity}</span>
                        <button
                          className="cart-item__qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="cart-item__remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer (Total & Checkout) */}
            {cartItems.length > 0 && (
              <div className="cart-sidebar__footer">
                <div className="cart-sidebar__total">
                  <span className="cart-sidebar__total-label">Total:</span>
                  <span className="cart-sidebar__total-price">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="large"
                  className="cart-sidebar__checkout"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>

                <button
                  className="cart-sidebar__continue"
                  onClick={closeCart}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartSidebar
