import React from 'react'
import Hero from '../components/sections/Hero'
import MarqueeLogos from '../components/ui/MarqueeLogos'
import About from '../components/sections/About'
import Products from '../components/sections/Products'
import Features from '../components/sections/Features'
import Testimonials from '../components/sections/Testimonials'
import Contact from '../components/sections/Contact'

const Home = () => {
  return (
    <>
      <Hero />
      <MarqueeLogos />
      <About />
      <Products />
      <Features />
      <Testimonials />
      <Contact />
    </>
  )
}

export default Home
