import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for Intersection Observer
 * Detects when an element enters the viewport
 * Used for scroll-triggered animations
 */
const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      // Once visible, keep it visible (don't re-animate on scroll up)
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    })

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [options])

  return [elementRef, isVisible]
}

export default useIntersectionObserver
