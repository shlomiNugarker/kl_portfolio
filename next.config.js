module.exports = {
  reactStrictMode: true,
  // Disable the dev-only static route indicator. With ISR enabled it emits a
  // noisy (harmless) HMR warning in Next 16's Pages Router dev overlay.
  devIndicators: false,
  eslint: {
    // ESLint is run separately via `yarn lint`. Skipping it during build avoids
    // a plugin-resolution crash from the legacy eslint-plugin-react chain; the
    // ESLint stack is modernized to flat config in a later upgrade stage.
    ignoreDuringBuilds: true,
  },
}
