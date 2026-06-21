import { useEffect, useRef, useState } from 'react'

type UseInViewOptions = {
  threshold?: number | number[]
  rootMargin?: string
  /** Stop observing after the element first enters the viewport. */
  triggerOnce?: boolean
}

// Lightweight replacement for react-intersection-observer's useInView, built on
// the native IntersectionObserver so the extra dependency stays out of the
// bundle. Returns a ref to attach and whether the element is in view.
export const useInView = <T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {}
) => {
  const { threshold, rootMargin, triggerOnce } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) observer.disconnect()
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return [ref, inView] as const
}
