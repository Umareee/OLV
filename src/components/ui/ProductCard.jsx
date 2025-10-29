import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Button from '../common/Button'
import './ProductCard.scss'

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate()

  const handleSelectOptions = () => {
    navigate(`/product/${product.slug}`)
  }

  // Get starting price from smallest size
  const startingPrice = product.sizes ? product.sizes[0].price : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="product-card" hoverable>
        <div className="product-card__image-wrapper">
          <img
            src={product.image}
            alt={`${product.name} bottle`}
            className="product-card__image"
            loading="lazy"
          />
        </div>

        <div className="product-card__content">
          <h3 className="product-card__title">{product.name}</h3>

          <div className="product-card__footer">
            <span className="product-card__price">From ${startingPrice.toFixed(2)}</span>
            <Button
              variant="primary"
              size="small"
              onClick={handleSelectOptions}
            >
              Select Options
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ProductCard
