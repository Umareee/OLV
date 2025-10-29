import React from 'react'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import ProductCard from '../components/ui/ProductCard'
import productsData from '../data/products.json'
import './Shop.scss'

const Shop = () => {
  return (
    <div className="shop-page">
      <PageHero
        title="Shop Our Collection"
        backgroundImage="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1920&q=80"
      />

      <section className="shop-page__content section">
        <Container>
          <div className="shop-page__intro">
            <p className="shop-page__description">
              Discover our carefully curated selection of premium extra-virgin olive oils.
              Each bottle represents our commitment to quality, tradition, and sustainable practices.
            </p>
          </div>

          <div className="shop-page__grid">
            {productsData.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Shop
