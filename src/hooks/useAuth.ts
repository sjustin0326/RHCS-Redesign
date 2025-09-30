'use client';
import { useEffect, useState } from 'react';

interface NetlifyIdentity {
  init: () => void;
  currentUser: () => User | null;
  on: (event: string, callback: (user?: User) => void) => void;
  open: () => void;
  close: () => void;
  logout: () => void;
}

declare global {
  interface Window {
    netlifyIdentity: NetlifyIdentity;
  }
}

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
  };
  app_metadata: {
    roles?: string[];
  };
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Netlify Identity script
    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.netlifyIdentity.init();
      
      // Check current user
      const currentUser = window.netlifyIdentity.currentUser();
      setUser(currentUser);
      setLoading(false);

      // Listen for login events
      window.netlifyIdentity.on('login', (user?: User) => {
        if (user) {
          setUser(user);
        }
        window.netlifyIdentity.close();
      });

      // Listen for logout events
      window.netlifyIdentity.on('logout', () => {
        setUser(null);
      });
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const login = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open();
    }
  };

  const logout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
};