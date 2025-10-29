import React from 'react'
import './MarqueeLogos.scss'

const MarqueeLogos = () => {
  // Certification and partner logos
  const items = [
    { id: 1, type: 'text', content: 'Tested, Trusted & Certified!' },
    { id: 2, type: 'logo', name: 'Certification Logo', image: '/assets/imgi_12_Fr.png' },
    { id: 4, type: 'logo', name: 'Certification Logo', image: '/assets/imgi_13_Fra1.png' },
    { id: 6, type: 'logo', name: 'Certification Logo', image: '/assets/imgi_14_Fr2.png' },
    { id: 8, type: 'logo', name: 'Certification Logo', image: '/assets/imgi_15_Fr3.png' },
    { id: 10, type: 'logo', name: 'Certification Logo', image: '/assets/imgi_16_Sindh_Food_AuthorityBW.png' },
        { id: 9, type: 'text', content: 'Tested, Trusted & Certified!' },
  ]

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items]

  return (
    <section className="marquee" aria-label="Certifications and quality badges">
      <div className="marquee__container">
        <div className="marquee__track">
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="marquee__item"
              aria-label={item.name || item.content}
            >
              {item.type === 'text' ? (
                <span className="marquee__text">{item.content}</span>
              ) : (
                <div className="marquee__logo">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="marquee__logo-img"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MarqueeLogos
