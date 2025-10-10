import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary from env vars
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.warn('[Cloudinary] Missing environment variables. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
}
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const folderParam = searchParams.get('folder') || process.env.CLOUDINARY_FOLDER || 'resources';
    const next = searchParams.get('next') || undefined;

    // Cap max_results and parse safely
    const maxRaw = parseInt(searchParams.get('max') || '24', 10);
    const max = Number.isFinite(maxRaw) ? Math.min(Math.max(maxRaw, 1), 100) : 24;

    // Sanitize folder for search expression (escape ':' which is an operator)
    const folder = folderParam.replace(/:/g, '\\:');

    // Build Search expression:
    // - Include both raw and image resource types (you upload PDFs as raw, but keep image to show any strays)
    // - Limit by public_id prefix to the folder
    const expr = `(resource_type=raw OR resource_type=image) AND public_id:${folder}/*`;

    // Search API
    const search = cloudinary.search
      .expression(expr)
      .sort_by('created_at', 'desc')
      .max_results(max);

    if (next) search.next_cursor(next);

    const result = await search.execute();

    let items = (result.resources || []).map(r => ({
      public_id: r.public_id,
      secure_url: r.secure_url,
      url: r.url,
      bytes: r.bytes,
      folder: r.folder,
      format: r.format,
      created_at: r.created_at,
      width: r.width,
      height: r.height,
      resource_type: r.resource_type,
      type: r.type,
      filename: r.filename,
      download_url: cloudinary.url(r.public_id, {
        resource_type: r.resource_type,
        type: 'upload',
        secure: true,
        flags: 'attachment',
        attachment: r.filename || undefined,
      }),
    }));

    // Fallback if Search returns nothing: Admin API for both resource types with prefix
    if (!items.length) {
      const prefix = folder.endsWith('/') ? folder : `${folder}/`;
      const [rawRes, imgRes] = await Promise.all([
        cloudinary.api.resources({
          resource_type: 'raw',
          type: 'upload',
          prefix,
          max_results: max,
          next_cursor: next,
        }),
        cloudinary.api.resources({
          resource_type: 'image',
          type: 'upload',
          prefix,
          max_results: max,
          next_cursor: next,
        }),
      ]);

      const toItem = (r) => ({
        public_id: r.public_id,
        secure_url: r.secure_url,
        url: r.url,
        bytes: r.bytes,
        folder: r.folder,
        format: r.format,
        created_at: r.created_at,
        width: r.width,
        height: r.height,
        resource_type: r.resource_type,
        type: r.type,
        filename: r.filename,
        download_url: cloudinary.url(r.public_id, {
          resource_type: r.resource_type,
          type: 'upload',
          secure: true,
          flags: 'attachment',
          attachment: r.filename || undefined,
        }),
      });

      const merged = [...(rawRes.resources || []), ...(imgRes.resources || [])].map(toItem);
      const next_cursor = rawRes.next_cursor || imgRes.next_cursor || null;

      return NextResponse.json({ items: merged, next_cursor });
    }

    return NextResponse.json({ items, next_cursor: result.next_cursor || null });
  } catch (e) {
    console.error('[Cloudinary List] error', e);
    return NextResponse.json({ error: e?.message || 'Failed to list Cloudinary resources' }, { status: 500 });
  }
}