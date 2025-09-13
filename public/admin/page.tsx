'use client';

import { useEffect } from 'react';

export default function AdminRedirect() {
  useEffect(() => {
    window.location.href = '/admin/index.html#/';
  }, []);

  return <div>Redirecting to admin...</div>;
}