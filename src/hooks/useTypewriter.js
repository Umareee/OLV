import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook for typewriter effect with multiple rotating texts
 * @param {string[]} texts - Array of texts to rotate through
 * @param {number} typingSpeed - Speed of typing in ms (default: 100)
 * @param {number} erasingSpeed - Speed of erasing in ms (default: 50)
 * @param {number} delayBetween - Delay between erase and next type in ms (default: 2000)
 */
const useTypewriter = (
  texts = [],
  typingSpeed = 100,
  erasingSpeed = 50,
  delayBetween = 2000
) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const charIndexRef = useRef(0)

  useEffect(() => {
    if (texts.length === 0) return

    const currentText = texts[currentIndex]

    if (isPaused) {
      // Pause before starting to erase
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsTyping(false)
      }, delayBetween)

      return () => clearTimeout(pauseTimer)
    }

    if (isTyping) {
      // Typing animation
      if (charIndexRef.current < currentText.length) {
        const typingTimer = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndexRef.current + 1))
          charIndexRef.current += 1
        }, typingSpeed)

        return () => clearTimeout(typingTimer)
      } else {
        // Finished typing, pause before erasing
        setIsPaused(true)
      }
    } else {
      // Erasing animation
      if (charIndexRef.current > 0) {
        const erasingTimer = setTimeout(() => {
          charIndexRef.current -= 1
          setDisplayText(currentText.slice(0, charIndexRef.current))
        }, erasingSpeed)

        return () => clearTimeout(erasingTimer)
      } else {
        // Finished erasing, move to next text
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        setIsTyping(true)
      }
    }
  }, [
    displayText,
    currentIndex,
    isTyping,
    isPaused,
    texts,
    typingSpeed,
    erasingSpeed,
    delayBetween
  ])

  return displayText
}

export default useTypewriter
