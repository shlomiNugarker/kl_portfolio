/* eslint-disable @typescript-eslint/no-var-requires */
// Generates the per-locale social share images (1200x630) and
// public/apple-touch-icon-180.png. Run with: node scripts/generate-og-image.js
//
//   public/og-image.png     (en — default)
//   public/og-image-he.png  (Hebrew, mirrored RTL layout)
//   public/og-image-ar.png  (Arabic, mirrored RTL layout)
//
// components/Misc/OpenGraphHead.tsx picks the file per active locale.
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
const AV_MARGIN = 110 // gap between avatar and the near edge
const AV_Y = (H - AV) / 2
const TEXT_GAP = 80 // gap between avatar ring and text block

// Localized copy. RTL locales get a mirrored layout: avatar on the right,
// text right-aligned flowing left.
const LOCALES = [
  {
    file: 'og-image.png',
    rtl: false,
    name: 'Shlomi Nugarker',
    role: 'FULL-STACK DEVELOPER',
    url: 'www.shlomi.dev',
  },
  {
    file: 'og-image-he.png',
    rtl: true,
    name: 'שלומי נוגרקר',
    role: 'מפתח פולסטאק',
    url: 'www.shlomi.dev/he',
  },
  {
    file: 'og-image-ar.png',
    rtl: true,
    name: 'شلومي نوجاركر',
    role: 'مطور FULL-STACK',
    url: 'www.shlomi.dev/ar',
  },
]

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

async function buildOgImage(avatarCircle, { file, rtl, name, role, url }) {
  const avX = rtl ? W - AV_MARGIN - AV : AV_MARGIN
  const textX = rtl ? avX - TEXT_GAP : avX + AV + TEXT_GAP
  // text-anchor works on the LOGICAL start/end: for RTL text, `start` is the
  // visual right edge — so `start` + direction:rtl anchors the text at textX
  // and flows it leftward, mirroring the LTR layout. The URL stays LTR, so in
  // RTL layouts it needs `end` to keep its right edge at textX.
  const dir = rtl ? 'direction: rtl;' : ''
  const urlAnchor = rtl ? 'end' : 'start'

  const overlay = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <style>
        text { text-anchor: start; ${dir} }
        .name { font: 700 76px 'Segoe UI', 'Poppins', sans-serif; fill: ${FG}; }
        .role { font: 600 44px 'Segoe UI', 'Poppins', sans-serif; fill: ${ACCENT}; letter-spacing: 1px; }
        .url  { font: 400 30px 'Segoe UI', 'Poppins', sans-serif; fill: ${MUTED}; direction: ltr; text-anchor: ${urlAnchor}; }
      </style>
      <!-- accent ring around avatar -->
      <circle cx="${avX + AV / 2}" cy="${AV_Y + AV / 2}" r="${AV / 2 + 8}"
              fill="none" stroke="${ACCENT}" stroke-width="4" />
      <text x="${textX}" y="280" class="name">${esc(name)}</text>
      <text x="${textX}" y="350" class="role">${esc(role)}</text>
      <text x="${textX}" y="420" class="url">${esc(url)}</text>
    </svg>
  `)

  await sharp({
    create: { width: W, height: H, channels: 4, background: BG },
  })
    .composite([
      { input: avatarCircle, left: avX, top: Math.round(AV_Y) },
      { input: overlay, left: 0, top: 0 },
    ])
    .png()
    .toFile(path.join(PUBLIC, file))

  console.log(`✓ public/${file} (${W}x${H})`)
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
  // Circular avatar with an accent ring, shared by all locales.
  const circleMask = Buffer.from(
    `<svg width="${AV}" height="${AV}"><circle cx="${AV / 2}" cy="${AV / 2}" r="${AV / 2}" fill="#fff"/></svg>`
  )
  const avatarCircle = await sharp(AVATAR)
    .resize(AV, AV, { fit: 'cover' })
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer()

  for (const locale of LOCALES) {
    await buildOgImage(avatarCircle, locale)
  }
  await buildAppleTouchIcon()
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
