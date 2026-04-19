import { createClient } from '@supabase/supabase-js';

// Function to validate URL
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

// Sanitization function to remove invisible characters or spaces
const sanitize = (val: string | undefined): string => {
  if (!val) return '';
  // Removes non-printable characters and leading/trailing whitespace
  return val.replace(/[^\x20-\x7E]/g, '').trim();
};

const rawUrl = sanitize(import.meta.env.VITE_SUPABASE_URL);
const rawKey = sanitize(import.meta.env.VITE_SUPABASE_ANON_KEY);

// DEBUG LOGGING
console.log('Supabase Init Check:', {
  hasUrl: !!rawUrl,
  urlStart: rawUrl?.substring(0, 8),
  isUrlValid: isValidUrl(rawUrl)
});

// Use real credentials if valid, otherwise use placeholders that won't crash the app
export const supabase = createClient(
  isValidUrl(rawUrl) ? rawUrl! : 'https://placeholder-hq.supabase.co',
  rawKey || 'placeholder-key'
);

if (!isValidUrl(rawUrl)) {
  console.warn('Supabase URL is missing or invalid. Please check VITE_SUPABASE_URL in Vercel settings.');
}

// --- AUTHENTICATION HELPERS ---

/**
 * Sign Up a new user
 */
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

/**
 * Log In an existing user
 */
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

/**
 * Sign Out the current user
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/**
 * Get current user session
 */
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
