import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const { path: routePath } = await params;
    const filePath = path.join(process.cwd(), 'public', 'documents', ...routePath);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('Not found', { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const fileStream = fs.createReadStream(filePath);
    
    // Convert Node ReadStream to Web ReadableStream
    const readableStream = new ReadableStream({
      start(controller) {
        fileStream.on('data', (chunk) => controller.enqueue(chunk));
        fileStream.on('end', () => controller.close());
        fileStream.on('error', (err) => controller.error(err));
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size.toString(),
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Accept-Ranges': 'bytes',
      },
    });
  } catch (error) {
    console.error('Error serving document file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
