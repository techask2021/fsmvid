import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const { url, filename } = await request.json()

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 })
    }

    console.log(`Parallel download from: ${url}`)

    // Get file size first (like Python's requests.head())
    const headResponse = await fetch(url, { method: 'HEAD' })
    const contentLength = headResponse.headers.get('Content-Length')
    
    if (!contentLength) {
      return NextResponse.json({ message: "Cannot determine file size" }, { status: 400 })
    }

    const fileSize = parseInt(contentLength, 10)
    const numChunks = 4 // Same as Python num_threads=4
    const chunkSize = Math.floor(fileSize / numChunks)

    console.log(`File size: ${fileSize} bytes, downloading in ${numChunks} parallel chunks`)

    // Download all chunks in parallel (like Python's ThreadPoolExecutor)
    const chunkPromises = []
    
    for (let i = 0; i < numChunks; i++) {
      const startByte = i * chunkSize
      const endByte = i === numChunks - 1 ? fileSize - 1 : startByte + chunkSize - 1
      
      const chunkPromise = fetch(url, {
        headers: {
          'Range': `bytes=${startByte}-${endByte}`,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.mixcloud.com/',
          'Origin': 'https://www.mixcloud.com'
        }
      }).then(async (response) => {
        if (!response.ok && response.status !== 206) {
          throw new Error(`Chunk ${i} download failed: ${response.status}`)
        }
        const arrayBuffer = await response.arrayBuffer()
        return {
          index: i,
          data: new Uint8Array(arrayBuffer),
          startByte,
          endByte
        }
      })
      
      chunkPromises.push(chunkPromise)
    }

    // Wait for all chunks to download (like Python's future.result())
    const chunks = await Promise.all(chunkPromises)
    
    // Sort chunks by index to ensure correct order
    chunks.sort((a, b) => a.index - b.index)
    
    console.log(`All ${numChunks} chunks downloaded successfully`)

    // Combine all chunks into one buffer
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.data.length, 0)
    const combinedBuffer = new Uint8Array(totalLength)
    
    let offset = 0
    for (const chunk of chunks) {
      combinedBuffer.set(chunk.data, offset)
      offset += chunk.data.length
    }

    console.log(`Combined buffer size: ${combinedBuffer.length} bytes`)

    // Return the complete file
    const response = new NextResponse(combinedBuffer, { status: 200 })
    
    response.headers.set('Content-Disposition', `attachment; filename="${filename || 'mixcloud_audio.m4a'}"`)
    response.headers.set('Content-Type', 'audio/mp4')
    response.headers.set('Content-Length', combinedBuffer.length.toString())
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

    return response

  } catch (error: any) {
    console.error("Parallel download error:", error)
    return NextResponse.json({ 
      message: error.message || "Download failed",
      error: true 
    }, { status: 500 })
  }
}

