import { readFile } from 'node:fs/promises'
import path from 'node:path'

const CONTENT_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  const name = path.basename(file)
  const contentType = CONTENT_TYPES[path.extname(name).toLowerCase()]
  if (!contentType) return new Response('Not found', { status: 404 })

  try {
    const data = await readFile(path.join(process.cwd(), 'site', 'img', name))
    return new Response(data, {
      headers: { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=3600' },
    })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}
