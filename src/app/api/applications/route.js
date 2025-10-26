// src/app/api/applications/route.js
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { db } from "../../config/firebaseConfig";
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

export const runtime = 'nodejs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function sanitizeFolder(input, fallback = 'applications') {
  if (!input || typeof input !== 'string') return fallback;
  const v = input.replace(/\.+/g, '').replace(/[^a-z0-9_\-/]/gi, '').replace(/^\/+|\/+$/g, '');
  return v || fallback;
}

async function uploadOne(file, folderHint, category) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const mime = (file.type || '').toLowerCase();
  const looksPdf = buffer.slice(0, 5).toString() === '%PDF-';
  const isImage = mime.startsWith('image/');
  const isPdf = looksPdf || mime === 'application/pdf';
  if (!isImage && !isPdf) throw new Error('Only images and PDFs are allowed');

  const rawName = typeof file.name === 'string' && file.name.length > 0 ? file.name : (isPdf ? 'document.pdf' : 'image');
  const inferredExt = isPdf ? 'pdf' : (mime.split('/')[1] || '');
  const ensuredName = inferredExt && !new RegExp(`\\.${inferredExt}$`, 'i').test(rawName)
    ? `${rawName.replace(/\.[^/.]+$/, '')}.${inferredExt}`
    : rawName;
  const publicIdBase = ensuredName.replace(/\.[^/.]+$/, '');

  const folder = sanitizeFolder(folderHint || `askyourcounsellor/${category || 'general'}`);
  const dataUri = `data:${isPdf ? 'application/pdf' : (mime || 'application/octet-stream')};base64,${buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: isPdf ? 'raw' : 'image',
    type: 'upload',
    ...(isPdf ? { format: 'pdf' } : {}),
    public_id: publicIdBase,
    use_filename: false,
    unique_filename: false,
    overwrite: false,
  });
  return { url: result.secure_url, fileType: isPdf ? 'application/pdf' : (mime || 'image'), title: ensuredName, bytes: file.size };
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const category = (form.get('category') || '').toString().toLowerCase();
    const name = form.get('name')?.toString() || '';
    const email = form.get('email')?.toString() || '';
    const phone = form.get('phone')?.toString() || '';
    const age = form.get('age')?.toString() || '';
    const city = form.get('city')?.toString() || '';
    const state = form.get('state')?.toString() || '';
    const userId = form.get('userId')?.toString() || '';

    const folderHint = form.get('folder')?.toString() || '';

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Missing userId' }, { status: 400 });
    }

    // Collect files by field name
    const filesByKey = {};
    for (const [key, value] of form.entries()) {
      if (value && typeof value === 'object' && 'arrayBuffer' in value) {
        const k = key; // e.g., docs_photo, docs_signature
        if (!filesByKey[k]) filesByKey[k] = [];
        filesByKey[k].push(value);
      }
    }

    const uploads = {};
    for (const [k, arr] of Object.entries(filesByKey)) {
      uploads[k] = [];
      for (const f of arr) {
        const res = await uploadOne(f, folderHint || `askyourcounsellor/${category}`, category);
        uploads[k].push(res);
      }
    }

    const payload = {
      category,
      name,
      email,
      phone,
      age,
      city,
      state,
      uploads,
      userId,
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, 'users', userId, 'applications'), payload);

    return NextResponse.json({ success: true, id: docRef.id, uploads });
  } catch (e) {
    console.error('[applications POST] error', e);
    return NextResponse.json({ success: false, error: e?.message || 'Failed to submit application' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }
    const userAppsRef = collection(db, 'users', userId, 'applications');
    const snap = await getDocs(query(userAppsRef, orderBy('createdAt', 'desc'), limit(20)));
    const applications = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ userId, applications });
  } catch (e) {
    console.error('[applications GET] error', e);
    return NextResponse.json({ error: 'Failed to load applications' }, { status: 500 });
  }
}
