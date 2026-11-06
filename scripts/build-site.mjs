import { createHash } from 'node:crypto'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Generate versioned assets for GitHub Pages without changing the source files.
const source = fileURLToPath(new URL('../site/', import.meta.url))
if (!process.argv[2]) throw new Error('Usage: node scripts/build-site.mjs <empty-output-directory>')
const output = path.resolve(process.argv[2])
if (output === source || output.startsWith(source + path.sep)) {
  throw new Error('Output must be outside site/')
}
await mkdir(output, { recursive: true })
if ((await readdir(output)).length) throw new Error('Output directory must be empty')

const version = (data) => createHash('sha256').update(data).digest('hex').slice(0, 16)
const versionedName = (name, data) => {
  const parsed = path.posix.parse(name)
  return path.posix.join(parsed.dir, `${parsed.name}.${version(data)}${parsed.ext}`)
}
async function emit(name, data) {
  await mkdir(path.dirname(path.join(output, name)), { recursive: true })
  await writeFile(path.join(output, name), data)
}

let html = await readFile(path.join(source, 'index.html'), 'utf8')
async function copyAssets(directory = '') {
  for (const entry of await readdir(path.join(source, directory), { withFileTypes: true })) {
    const name = path.posix.join(directory, entry.name)
    if (name === 'index.html') continue
    if (entry.isDirectory()) {
      await copyAssets(name)
    } else if (entry.isFile()) {
      const data = await readFile(path.join(source, name))
      const target = versionedName(name, data)
      await emit(target, data)
      // Also updates image references in the inline game script before hashing it.
      html = html.replaceAll(`./${name}`, `./${target}`)
    } else {
      throw new Error(`Unsupported site entry: ${name}`)
    }
  }
}
await copyAssets()

const styles = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)]
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
if (styles.length !== 1 || scripts.length !== 1) {
  throw new Error('Expected one inline stylesheet and one inline game script')
}
const css = styles[0][1]
const js = scripts[0][1]
const cssName = versionedName('assets/game.css', css)
const jsName = versionedName('assets/game.js', js)
await emit(cssName, css)
await emit(jsName, js)
html = html.replace(styles[0][0], `<link rel="stylesheet" href="./${cssName}" />`)
html = html.replace(scripts[0][0], `<script src="./${jsName}"></script>`)
await emit('index.html', html)
console.log(`GitHub Pages site generated in ${output}`)
console.log(`CSS: ${cssName}\nJavaScript: ${jsName}`)
