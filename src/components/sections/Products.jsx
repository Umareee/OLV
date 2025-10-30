import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../common/Container'
import ProductCard from '../ui/ProductCard'
import Button from '../common/Button'
import productsData from '../../data/products.json'
import './Products.scss'

const Products = () => {
  const navigate = useNavigate()

  const handleSeeAll = () => {
    navigate('/shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="products section section-dark" id="products">
      <Container>
        <div className="products__header">
          <span className="products__label">Explore OLIVANZA</span>
          <h2 className="products__title">Award-Winning Excellence</h2>
          <p className="products__subtitle">
            Experience the taste of Pakistan's finest extra virgin olive oil collection,
            internationally recognized for superior quality and authentic flavor.
          </p>
        </div>

        <div className="products__grid">
          {productsData.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="products__see-all">
          <Button
            variant="primary"
            size="large"
            onClick={handleSeeAll}
          >
            View Full Collection
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default Products
