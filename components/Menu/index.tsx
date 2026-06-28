import Logo from '../Logo'
import styles from './styles.module.css'
import Navigation from './Navigation'
import { useIsMobile } from 'hooks/useMediaQuery'
import useScrollDirection, { ScrollDirection } from 'hooks/useScrollDirection'

const Menu = () => {
  const isMobile = useIsMobile()
  const scrollDirection = useScrollDirection(true, isMobile)
  // Hide the mobile header on scroll-down (functional, not an animation):
  // translate it out of view.
  const hidden = isMobile && scrollDirection === ScrollDirection.Down
  return (
    <div
      className={isMobile ? styles.mobileMenuContainer : ''}
      style={
        isMobile
          ? { transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }
          : undefined
      }
    >
      {/* Match the site background so the mobile header blends in (kl.bg).
          Roomier horizontal padding on tablet keeps the logo and nav from
          hugging the far screen edges. */}
      <header
        className={`m-0 flex w-full items-center justify-between px-5 py-5 md:px-12 lg:px-20 lg:py-0 ${
          isMobile ? 'bg-kl-bg' : 'bg-transparent'
        }`}
      >
        <Logo />
        <Navigation />
      </header>
    </div>
  )
}

export default Menu
