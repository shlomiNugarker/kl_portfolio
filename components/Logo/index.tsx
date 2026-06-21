import { memo } from 'react'
import { Box } from '@chakra-ui/react'
import NextImage from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'

// A single SVG monogram works in both color modes, so no theme switch or
// load-state is needed.
const Logo = () => (
  <Link href="/" passHref aria-label="Home">
    <Box className={styles.logo} boxSize={{ base: '30px', lg: '50px' }}>
      <NextImage
        src="/logo.svg"
        alt="Shlomi Nugarker logo"
        width={50}
        height={50}
        priority
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  </Link>
)

export default memo(Logo)
