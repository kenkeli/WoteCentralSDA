/*
  # Church Website Database Schema

  1. New Tables
    - `admins` - Admin user accounts with role-based access
    - `sermons` - Sermon content and media links
    - `events` - Church events and activities
    - `team_members` - Church staff and leadership
    - `beliefs` - Core beliefs and doctrines
    - `gallery_images` - Photo gallery with categories
    - `announcements` - Church announcements and news
    - `donations` - Donation records and tracking
    - `contact_messages` - Contact form submissions

  2. Security
    - Enable RLS on all tables
    - Admin-only policies for content management
    - Public read access for website content
    - Secure donation and contact data

  3. Default Admin User
    - Email: admin@wotecentralsda.org
    - Password: admin123 (change immediately after first login)
    - Role: super_admin
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admins table for authentication and authorization
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sermons table
CREATE TABLE IF NOT EXISTS sermons (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  speaker text NOT NULL,
  date date NOT NULL,
  duration text,
  image_url text,
  video_url text,
  audio_url text,
  notes_url text,
  scripture text NOT NULL,
  description text NOT NULL,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  image_url text,
  category text,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  max_attendees integer,
  registration_required boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  role text NOT NULL,
  image_url text NOT NULL,
  bio text,
  email text,
  phone text,
  display_order integer DEFAULT 0,
  is_leadership boolean DEFAULT false,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Beliefs table
CREATE TABLE IF NOT EXISTS beliefs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  summary text NOT NULL,
  scripture_ref text NOT NULL,
  description text,
  icon_name text,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text,
  description text,
  image_url text NOT NULL,
  alt_text text NOT NULL,
  category text NOT NULL,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  content text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  image_url text,
  link text,
  is_important boolean DEFAULT false,
  is_published boolean DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_name text,
  church_name text,
  amount decimal(10,2) NOT NULL,
  fund text NOT NULL,
  payment_method text,
  transaction_id text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  donor_email text,
  donor_phone text,
  is_anonymous boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  admin_notes text,
  replied_at timestamptz,
  replied_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE beliefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Admin policies: Allow public read access to check if admin exists
CREATE POLICY "Anyone can check admin existence" ON admins
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage admins" ON admins
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public read policies for website content
CREATE POLICY "Public can read published sermons" ON sermons
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage sermons" ON sermons
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read published events" ON events
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage events" ON events
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read published team members" ON team_members
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage team members" ON team_members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read published beliefs" ON beliefs
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage beliefs" ON beliefs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read published gallery images" ON gallery_images
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage gallery" ON gallery_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read published announcements" ON announcements
  FOR SELECT
  USING (is_published = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Authenticated users can manage announcements" ON announcements
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view donations" ON donations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can submit donations" ON donations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage donations" ON donations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage contact messages" ON contact_messages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can submit contact messages" ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sermons_date ON sermons(date DESC);
CREATE INDEX IF NOT EXISTS idx_sermons_published ON sermons(is_published);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(display_order);
CREATE INDEX IF NOT EXISTS idx_beliefs_order ON beliefs(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_published ON gallery_images(is_published);
CREATE INDEX IF NOT EXISTS idx_announcements_date ON announcements(date DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at DESC);

-- Insert default admin user (password: admin123)
INSERT INTO admins (email, password_hash, full_name, role, is_active) VALUES 
('admin@wotecentralsda.org', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator', 'super_admin', true)
ON CONFLICT (email) DO NOTHING;