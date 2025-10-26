// src/app/api/dashboard/route.js
import { NextResponse } from 'next/server';
import { db } from "../../config/firebaseConfig";
import { collection, collectionGroup, getDocs, query, orderBy, limit, getCountFromServer } from "firebase/firestore";

export const runtime = 'nodejs';

export async function GET(req) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');

    // If a userId is provided, scope to that user's data only
    if (userId) {
      const userBookingsRef = collection(db, 'users', userId, 'bookings');
      const userApplicationsRef = collection(db, 'users', userId, 'applications');

      // Counts
      let bookingsCount = 0;
      try {
        const agg = await getCountFromServer(userBookingsRef);
        bookingsCount = agg.data().count || 0;
      } catch (_) {
        const snap = await getDocs(userBookingsRef);
        bookingsCount = snap.size;
      }

      let applicationsCount = 0;
      try {
        const agg = await getCountFromServer(userApplicationsRef);
        applicationsCount = agg.data().count || 0;
      } catch (_) {
        const snap = await getDocs(userApplicationsRef);
        applicationsCount = snap.size;
      }

      // Recents
      let recentBookingsSnap;
      try {
        recentBookingsSnap = await getDocs(query(userBookingsRef, orderBy('date', 'desc'), limit(5)));
      } catch (_) {
        recentBookingsSnap = await getDocs(query(userBookingsRef, limit(5)));
      }
      const recentBookings = recentBookingsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

      let recentApplicationsSnap;
      try {
        recentApplicationsSnap = await getDocs(query(userApplicationsRef, orderBy('createdAt', 'desc'), limit(5)));
      } catch (_) {
        recentApplicationsSnap = await getDocs(query(userApplicationsRef, limit(5)));
      }
      const recentApplications = recentApplicationsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

      return NextResponse.json({
        bookingsCount,
        applicationsCount,
        recentBookings,
        recentApplications,
      }, { headers: { 'cache-control': 'no-store' } });
    }

    // Bookings are stored under users/{userId}/bookings — use a collection group
    const bookingsGroup = collectionGroup(db, 'bookings');
    const applicationsGroup = collectionGroup(db, 'applications');

    // Counts (prefer aggregate, fallback to full scan)
    let bookingsCount = 0;
    try {
      const agg = await getCountFromServer(query(bookingsGroup));
      bookingsCount = agg.data().count || 0;
    } catch (_) {
      const snap = await getDocs(query(bookingsGroup, limit(1_000))); // fallback soft cap
      bookingsCount = snap.size;
    }

    let applicationsCount = 0;
    try {
      const agg = await getCountFromServer(query(applicationsGroup));
      applicationsCount = agg.data().count || 0;
    } catch (e) {
      try {
        const snap = await getDocs(query(applicationsGroup, limit(1_000)));
        applicationsCount = snap.size;
      } catch (err) {
        // Fallback: scan users/*/applications
        const usersSnap = await getDocs(collection(db, 'users'));
        let count = 0;
        for (const u of usersSnap.docs) {
          const appsSnap = await getDocs(collection(db, 'users', u.id, 'applications'));
          count += appsSnap.size;
        }
        applicationsCount = count;
      }
    }

    // Recent items
    let recentBookingsSnap;
    try {
      recentBookingsSnap = await getDocs(query(bookingsGroup, orderBy('date', 'desc'), limit(5)));
    } catch (_) {
      recentBookingsSnap = await getDocs(query(bookingsGroup, limit(5)));
    }
    const recentBookings = recentBookingsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    let recentApplications = [];
    try {
      const recentApplicationsSnap = await getDocs(query(applicationsGroup, orderBy('createdAt', 'desc'), limit(5)));
      recentApplications = recentApplicationsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      try {
        const recentApplicationsSnap = await getDocs(query(applicationsGroup, limit(10)));
        const rows = recentApplicationsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        recentApplications = rows.sort((a, b) => {
          const ta = a?.createdAt?.seconds ? a.createdAt.seconds : (a?.createdAt?._seconds || 0);
          const tb = b?.createdAt?.seconds ? b.createdAt.seconds : (b?.createdAt?._seconds || 0);
          return tb - ta;
        }).slice(0, 5);
      } catch (e2) {
        // Final fallback: scan users/*/applications and merge
        const usersSnap = await getDocs(collection(db, 'users'));
        const all = [];
        for (const u of usersSnap.docs) {
          const appsSnap = await getDocs(query(collection(db, 'users', u.id, 'applications'), limit(5)));
          for (const d of appsSnap.docs) all.push({ id: d.id, ...d.data() });
        }
        recentApplications = all.sort((a, b) => {
          const ta = a?.createdAt?.seconds ? a.createdAt.seconds : (a?.createdAt?._seconds || 0);
          const tb = b?.createdAt?.seconds ? b.createdAt.seconds : (b?.createdAt?._seconds || 0);
          return tb - ta;
        }).slice(0, 5);
      }
    }

    return NextResponse.json({
      bookingsCount,
      applicationsCount,
      recentBookings,
      recentApplications,
    }, { headers: { 'cache-control': 'no-store' } });
  } catch (e) {
    console.error('[dashboard GET] error', e);
    return NextResponse.json({ error: 'Failed to load dashboard' }, { status: 500 });
  }
}
