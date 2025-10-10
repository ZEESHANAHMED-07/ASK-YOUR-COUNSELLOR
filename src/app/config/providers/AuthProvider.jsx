"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const AuthContext = createContext({ user: null, loading: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Fire a one-shot login email when a user transitions from logged-out to logged-in
  const lastNotifiedUidRef = useRef(null);
  useEffect(() => {
    if (!user || !user.uid) return;
    if (lastNotifiedUidRef.current === user.uid) return;
    lastNotifiedUidRef.current = user.uid;

    // Non-blocking fire-and-forget
    (async () => {
      try {
        console.log('[AuthProvider] sending login email for uid:', user.uid);
        const res = await fetch('/api/email/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email || null,
            name: user.displayName || null,
            to: 'soumo2020.saha@gmail.com',
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          console.warn('[AuthProvider] login email failed status:', res.status, data);
        } else {
          console.log('[AuthProvider] login email sent ok:', data);
        }
      } catch (e) {
        // Silently ignore; we don't want to disrupt UX if email fails
        console.warn('[AuthProvider] login email failed', e);
      }
    })();
  }, [user]);

  const value = useMemo(() => ({ user, loading }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthProvider;
