import { Box } from '@chakra-ui/react'
import NextImage from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { avatarAnimation } from 'config/animations'

const MotionBox = motion.create(Box)

const Avatar = () => (
  <AnimatePresence>
    <MotionBox
      id="klAvatar"
      boxSize={{ base: 64, lg: 'sm' }}
      padding={{ base: 8 }}
      marginBottom={{ base: 10, md: 0, lg: 0 }}
      initial="initial"
      animate={'animate'}
      variants={avatarAnimation}
      exit={{ opacity: 0 }}
    >
      <NextImage
        src="/avatar.jpg"
        alt="Shlomi Nugarker"
        width={463}
        height={486}
        priority
        style={{
          width: '100%',
          height: 'auto',
          margin: 'auto',
          borderRadius: '50%',
        }}
      />
    </MotionBox>
  </AnimatePresence>
)

export default Avatar
