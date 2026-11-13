import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const section = (formData.get('section') as string) || 'general';

    if (!file) {
      return NextResponse.json(
        { error: 'No se recibió ningún archivo.' },
        { status: 400 }
      );
    }

    // Validar tipo MIME (imágenes y videos cortos)
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/svg+xml'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg'];
    const isImage = allowedImageTypes.includes(file.type);
    const isVideo = allowedVideoTypes.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: 'Formato no soportado. Se admiten imágenes (JPG, PNG, WebP, SVG) o videos cortos (MP4, WebM, MOV).' },
        { status: 400 }
      );
    }

    // Validar tamaño máximo: 15MB para imágenes, 50MB para videos
    const maxAllowedSize = isVideo ? 50 * 1024 * 1024 : 15 * 1024 * 1024;
    if (file.size > maxAllowedSize) {
      const limitMb = isVideo ? 50 : 15;
      return NextResponse.json(
        { error: `El archivo excede el tamaño máximo permitido de ${limitMb} MB.` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitizar nombre de archivo
    const cleanSection = section.replace(/[^a-zA-Z0-9_-]/g, '');
    const extension = file.name.split('.').pop()?.toLowerCase() || (isVideo ? 'mp4' : 'jpg');
    const filename = `${cleanSection}-${Date.now()}.${extension}`;

    const subDir = isVideo ? 'videos' : 'images';
    const uploadsDir = join(process.cwd(), 'public', subDir, 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const filepath = join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    const publicUrl = `/${subDir}/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      mimeType: file.type,
      mediaType: isVideo ? 'video' : 'image',
    });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json(
      { error: 'Error interno al procesar y guardar la imagen.' },
      { status: 500 }
    );
  }
}
