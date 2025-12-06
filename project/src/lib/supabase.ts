import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'x-client-info': 'supabase-js-web'
    }
  }
});

// Database types
export interface Admin {
  id: string;
  email: string;
  full_name: string;
  role: 'super_admin' | 'admin' | 'editor';
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration?: string;
  image_url?: string;
  video_url?: string;
  audio_url?: string;
  notes_url?: string;
  scripture: string;
  description: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image_url?: string;
  category?: string;
  is_featured: boolean;
  is_published: boolean;
  max_attendees?: number;
  registration_required: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
  bio?: string;
  email?: string;
  phone?: string;
  display_order: number;
  is_leadership: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Belief {
  id: string;
  title: string;
  summary: string;
  scripture_ref: string;
  description?: string;
  icon_name?: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title?: string;
  description?: string;
  image_url: string;
  alt_text: string;
  category: string;
  display_order: number;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  image_url?: string;
  link?: string;
  is_important: boolean;
  is_published: boolean;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: string;
  donor_name?: string;
  church_name?: string;
  amount: number;
  fund: string;
  payment_method?: string;
  transaction_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  donor_email?: string;
  donor_phone?: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  admin_notes?: string;
  replied_at?: string;
  replied_by?: string;
  created_at: string;
  updated_at: string;
}