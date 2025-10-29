import { useEffect, useState } from 'react'

/**
 * Custom hook for parallax scroll effect
 * Returns a scroll offset value for subtle parallax animations
 */
const useScrollParallax = (speed = 0.5) => {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset * speed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return offsetY
}

export default useScrollParallax
