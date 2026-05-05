// Adds a UTF-8 BOM at the start of the prerendered shell HTML.
// Many legacy tools (Notepad, PowerShell <7, Excel, some pasteboards) default
// to ANSI/cp1252 when no BOM is present and a bare meta charset is not enough
// for them to detect UTF-8. The BOM removes any ambiguity.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const target = 'dist/client/_shell.html'
const BOM = Buffer.from([0xef, 0xbb, 0xbf])

if (!existsSync(target)) {
  console.warn(`[add-bom] ${target} not found — skipping.`)
  process.exit(0)
}

const buf = readFileSync(target)
if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
  console.log(`[add-bom] ${target} already has BOM.`)
  process.exit(0)
}

writeFileSync(target, Buffer.concat([BOM, buf]))
console.log(`[add-bom] BOM prepended to ${target} (${buf.length + 3} bytes).`)
