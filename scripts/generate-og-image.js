/* eslint-disable @typescript-eslint/no-var-requires */
// Generates public/og-image.png (1200x630) and public/apple-touch-icon-180.png.
// Run with: node scripts/generate-og-image.js
const path = require('path')
const sharp = require('sharp')

const ROOT = path.resolve(__dirname, '..')
const PUBLIC = path.join(ROOT, 'public')
const AVATAR = path.join(PUBLIC, 'avatar.jpg')

const BG = '#171717'
const ACCENT = '#2dd4bf'
const FG = '#f5f5f5'
const MUTED = '#a3a3a3'

const W = 1200
const H = 630
const AV = 300 // avatar diameter
const AV_X = 110
const AV_Y = (H - AV) / 2

async function buildOgImage() {
  // Circular avatar with an accent ring.
  const circleMask = Buffer.from(
    `<svg width="${AV}" height="${AV}"><circle cx="${AV / 2}" cy="${AV / 2}" r="${AV / 2}" fill="#fff"/></svg>`
  )
  const avatarCircle = await sharp(AVATAR)
    .resize(AV, AV, { fit: 'cover' })
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer()

  const textX = AV_X + AV + 80

  const overlay = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .name { font: 700 76px 'Segoe UI', 'Poppins', sans-serif; fill: ${FG}; }
        .role { font: 600 44px 'Segoe UI', 'Poppins', sans-serif; fill: ${ACCENT}; letter-spacing: 1px; }
        .url  { font: 400 30px 'Segoe UI', 'Poppins', sans-serif; fill: ${MUTED}; }
      </style>
      <!-- accent ring around avatar -->
      <circle cx="${AV_X + AV / 2}" cy="${AV_Y + AV / 2}" r="${AV / 2 + 8}"
              fill="none" stroke="${ACCENT}" stroke-width="4" />
      <text x="${textX}" y="280" class="name">Shlomi Nugarker</text>
      <text x="${textX}" y="350" class="role">FULL-STACK DEVELOPER</text>
      <text x="${textX}" y="420" class="url">www.shlomi.dev</text>
    </svg>
  `)

  await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: BG,
    },
  })
    .composite([
      { input: avatarCircle, left: AV_X, top: Math.round(AV_Y) },
      { input: overlay, left: 0, top: 0 },
    ])
    .png()
    .toFile(path.join(PUBLIC, 'og-image.png'))

  console.log('✓ public/og-image.png (1200x630)')
}

async function buildAppleTouchIcon() {
  // 180x180 rounded icon from the avatar.
  const size = 180
  const radius = 36
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
  )
  await sharp(AVATAR)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toFile(path.join(PUBLIC, 'apple-touch-icon-180.png'))
  console.log('✓ public/apple-touch-icon-180.png (180x180)')
}

;(async () => {
  await buildOgImage()
  await buildAppleTouchIcon()
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
