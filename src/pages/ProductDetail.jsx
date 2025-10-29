import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import PageHero from '../components/common/PageHero'
import ProductCard from '../components/ui/ProductCard'
import { useCart } from '../context/CartContext'
import productsData from '../data/products.json'
import './ProductDetail.scss'

const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = productsData.find(p => p.slug === slug)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (product && product.sizes) {
      setSelectedSize(product.sizes[1]) // Default to 500ml
    }
  }, [product])

  if (!product) {
    return (
      <div className="product-not-found">
        <Container>
          <h1>Product Not Found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </Container>
      </div>
    )
  }

  const currentImage = selectedSize ? selectedSize.image : product.sizes[1].image
  const currentPrice = selectedSize ? selectedSize.price * quantity : 0

  const handleAddToCart = () => {
    if (selectedSize) {
      const cartItem = {
        id: `${product.id}-${selectedSize.size}`,
        name: product.name,
        size: selectedSize.size,
        price: `$${selectedSize.price.toFixed(2)}`,
        image: selectedSize.image
      }

      for (let i = 0; i < quantity; i++) {
        addToCart(cartItem)
      }
    }
  }

  // Get related products (excluding current product)
  const relatedProducts = productsData.filter(p => p.id !== product.id).slice(0, 3)

  // Dummy reviews
  const reviews = [
    {
      id: 1,
      author: "John Doe",
      rating: 5,
      date: "2024-10-15",
      comment: "Absolutely fantastic olive oil! The flavor is rich and the quality is outstanding. Will definitely purchase again."
    },
    {
      id: 2,
      author: "Maria Garcia",
      rating: 5,
      date: "2024-10-10",
      comment: "Best olive oil I've ever used. Perfect for salads and cooking. Highly recommend!"
    },
    {
      id: 3,
      author: "Alex Chen",
      rating: 4,
      date: "2024-10-05",
      comment: "Great product, excellent packaging. The taste is amazing. Only wish it came in larger sizes."
    }
  ]

  return (
    <div className="product-detail">
      {/* Page Hero */}
      <PageHero
        title={product.name}
        backgroundImage="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1920&q=80"
      />

      <Container>
        {/* Main Product Section */}
        <div className="product-detail__main">
          {/* Left: Image */}
          <motion.div
            className="product-detail__image-section"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="product-detail__image-wrapper">
              <img
                src={currentImage}
                alt={product.name}
                className="product-detail__image"
              />
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            className="product-detail__info-section"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="product-detail__title">{product.name}</h1>
            <p className="product-detail__short-desc">{product.description.split('.')[0]}.</p>

            {/* Size Selection */}
            <div className="product-detail__size-section">
              <label className="product-detail__label">
                Select Size: <span className="product-detail__selected-size">{selectedSize?.size}</span>
              </label>
              <div className="product-detail__sizes">
                {product.sizes.map((sizeOption) => (
                  <button
                    key={sizeOption.size}
                    className={`product-detail__size-btn ${
                      selectedSize?.size === sizeOption.size ? 'active' : ''
                    }`}
                    onClick={() => setSelectedSize(sizeOption)}
                  >
                    {sizeOption.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="product-detail__quantity-section">
              <label className="product-detail__label">Quantity:</label>
              <div className="product-detail__quantity">
                <button
                  className="product-detail__qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <span className="product-detail__qty-value">{quantity}</span>
                <button
                  className="product-detail__qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="product-detail__price-section">
              <span className="product-detail__price-label">Total Price:</span>
              <span className="product-detail__price">${currentPrice.toFixed(2)}</span>
            </div>

            {/* Add to Cart Button */}
            <Button
              variant="primary"
              size="large"
              onClick={handleAddToCart}
              className="product-detail__add-to-cart"
            >
              Add to Cart
            </Button>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="product-detail__tabs-section">
          <div className="product-detail__tabs">
            <button
              className={`product-detail__tab ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`product-detail__tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviews.length})
            </button>
            <button
              className={`product-detail__tab ${activeTab === 'additional' ? 'active' : ''}`}
              onClick={() => setActiveTab('additional')}
            >
              Additional Information
            </button>
          </div>

          <div className="product-detail__tab-content">
            {activeTab === 'description' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="product-detail__description"
              >
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <h4>Features:</h4>
                <ul>
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="product-detail__reviews"
              >
                <h3>Customer Reviews</h3>
                {reviews.map((review) => (
                  <div key={review.id} className="review">
                    <div className="review__header">
                      <div className="review__author">{review.author}</div>
                      <div className="review__rating">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="review__star">★</span>
                        ))}
                      </div>
                    </div>
                    <div className="review__date">{review.date}</div>
                    <p className="review__comment">{review.comment}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'additional' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="product-detail__additional"
              >
                <h3>Additional Information</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>Origin:</th>
                      <td>{product.additionalInfo.origin}</td>
                    </tr>
                    <tr>
                      <th>Acidity:</th>
                      <td>{product.additionalInfo.acidity}</td>
                    </tr>
                    <tr>
                      <th>Harvest:</th>
                      <td>{product.additionalInfo.harvest}</td>
                    </tr>
                    <tr>
                      <th>Storage:</th>
                      <td>{product.additionalInfo.storage}</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            )}
          </div>
        </div>

        {/* You Might Be Interested Section */}
        <div className="product-detail__related">
          <h2 className="product-detail__related-title">You Might Be Interested In</h2>
          <div className="product-detail__related-grid">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ProductDetail
