module.exports = {
  reactStrictMode: true,
  // Disable the dev-only static route indicator. With ISR enabled it emits a
  // noisy (harmless) HMR warning in Next 16's Pages Router dev overlay.
  devIndicators: false,
  // Serve next/image output as modern formats when supported.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Tree-shake the barrel imports of these heavy packages so only the used
  // modules ship, cutting the initial JS bundle and main-thread bootup time.
  experimental: {
    optimizePackageImports: [
      '@chakra-ui/react',
      'framer-motion',
      'react-icons',
    ],
  },
}
