import { useEffect, useRef, useState } from 'react'

export function useInViewAnimation<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [isInView])

  return { ref, isInView }
}
