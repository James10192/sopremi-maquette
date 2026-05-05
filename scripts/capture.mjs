/**
 * Captures réelles du cockpit SOPREMI sur la prod Vercel.
 * - Connecte automatiquement le profil DG (Aïcha Konan) en injectant l'état
 *   du store dans localStorage avant le premier render.
 * - Prend une capture desktop 1440×900 et une capture mobile iPhone 13 (390×844).
 * - Couvre 3 écrans clés: cockpit DG, file de validation, pointage rapide.
 *
 * Usage: node scripts/capture.mjs [BASE_URL]
 *  BASE_URL par défaut: https://sopremi-maquette.vercel.app
 */
import { mkdir, writeFile } from 'node:fs/promises'
import puppeteer from 'puppeteer'

const BASE = process.argv[2] ?? 'https://sopremi-maquette.vercel.app'
const OUT = 'captures'

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
}

const ROUTES = [
  { id: 'cockpit', path: '/' },
  { id: 'validation', path: '/validation' },
  { id: 'pointage', path: '/ressources/pointage' },
  { id: 'projets', path: '/projets' },
  { id: 'audit', path: '/audit' },
]

const BUILT_IN_STATE = {
  // Force-login as DG (Aïcha Konan) so RBAC opens up the full UI
  // The reducer accepts a 'state/replace' but here we inject directly via localStorage.
  // The shape mirrors src/lib/store/state.ts initialState plus currentUser set.
}

async function withAuth(page) {
  // Login programmatically: visit /login then click first profile + submit.
  // This is more robust than injecting state because the auth flow may evolve.
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle2', timeout: 30000 })
  await page.waitForSelector('button[type="submit"]', { timeout: 15000 })
  // First role tile = DG (per RolePicker order in seedUsers)
  await page.click('div[class*="grid"] button[type="button"]')
  await page.click('button[type="submit"]')
  await page.waitForFunction(() => location.pathname === '/', { timeout: 15000 })
  // Allow stagger animations to settle
  await new Promise((r) => setTimeout(r, 1200))
}

async function captureRoute(page, route) {
  await page.goto(`${BASE}${route.path}`, { waitUntil: 'networkidle2', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 900))
}

async function run() {
  await mkdir(OUT, { recursive: true })

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  })

  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage()
    await page.setViewport(vp)
    await page.emulateMediaFeatures([
      { name: 'prefers-color-scheme', value: 'dark' },
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ])

    await withAuth(page)

    for (const route of ROUTES) {
      await captureRoute(page, route)
      const file = `${OUT}/${vpName}-${route.id}.png`
      await page.screenshot({ path: file, fullPage: true })
      console.log(`📸 ${file}`)
    }

    await page.close()
  }

  await browser.close()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
