import { Box, Image as ChkImage, Text, Link } from '@chakra-ui/react'
import { useColorModeValue } from 'components/ui/color-mode'
import { motion, AnimatePresence } from 'framer-motion'
import { avatarAnimation } from 'config/animations'

const AvatarImages = {
  DarkMode: '/KL_avatar.png',
  LightMode: '/KL_avatar_light.png',
}

const MotionBox = motion.create(Box)

const Avatar = () => {
  const imgAvatar = useColorModeValue(
    AvatarImages.LightMode,
    AvatarImages.DarkMode
  )
  return (
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
        <ChkImage
          src={imgAvatar}
          alt="KL Lawingco Avatar"
          htmlWidth="250"
          htmlHeight="250"
          margin="auto"
        />
        <Text textAlign="center" fontSize="smaller" color="kl.description">
          Art by{' '}
          <Link
            href="https://twitter.com/kojiro_ai"
            target="_blank"
            aria-label="KojiroArt"
            rel="noreferrer"
          >
            KojiroArt
          </Link>
        </Text>
      </MotionBox>
    </AnimatePresence>
  )
}

export default Avatar
