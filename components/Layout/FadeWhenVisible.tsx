import React from 'react'
import { useInView } from 'hooks/useInView'
import styles from './FadeWhenVisible.module.css'

// Reveal-on-scroll wrapper. Uses a CSS transition driven by IntersectionObserver
// instead of framer-motion, so it adds no JS animation cost — this wraps every
// section, so keeping it framer-free meaningfully cuts main-thread work.
const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <div
      ref={ref}
      className={`${styles.fade} ${inView ? styles.visible : ''}`}
    >
      {children}
    </div>
  )
}

export default FadeInWhenVisible
