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
          <span className="products__label">Shop</span>
          <h2 className="products__title">Premium Olive Oils</h2>
          <p className="products__subtitle">
            Discover our carefully curated selection of extra-virgin olive oils,
            each bottle a testament to our commitment to quality and tradition.
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
            See All Products
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default Products
