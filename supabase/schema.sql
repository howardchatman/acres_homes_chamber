-- ============================================================
-- AcresHOME Chamber — Supabase Schema
-- Run this in your Supabase SQL Editor to create all tables
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- PROFILES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('public', 'member', 'vendor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all profiles" ON profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ────────────────────────────────────────────────────────────
-- BUSINESSES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  business_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  website TEXT,
  social_links TEXT,
  category TEXT,
  description TEXT,
  logo_url TEXT,
  membership_tier TEXT DEFAULT 'community',
  membership_status TEXT DEFAULT 'pending' CHECK (membership_status IN ('pending', 'active', 'expired', 'rejected')),
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Business owners can manage own business" ON businesses FOR ALL USING (auth.uid() = owner_user_id);
CREATE POLICY "Public can read active businesses" ON businesses FOR SELECT USING (membership_status = 'active');
CREATE POLICY "Admins can manage all businesses" ON businesses FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- MEMBERSHIP APPLICATIONS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS membership_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
  submitted_data_json JSONB,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected')),
  admin_notes TEXT,
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage membership applications" ON membership_applications FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Anyone can insert membership application" ON membership_applications FOR INSERT WITH CHECK (true);

-- ────────────────────────────────────────────────────────────
-- VENDORS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  business_name TEXT NOT NULL,
  vendor_name TEXT,
  category TEXT,
  description TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  permits_url TEXT,
  insurance_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  booth_assignment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vendor owners can manage own vendor" ON vendors FOR ALL USING (auth.uid() = owner_user_id);
CREATE POLICY "Public can read approved vendors" ON vendors FOR SELECT USING (status = 'approved');
CREATE POLICY "Anyone can insert vendor" ON vendors FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage all vendors" ON vendors FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- FARMERS MARKET DATES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS farmers_market_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  market_date DATE NOT NULL,
  booth_capacity INTEGER DEFAULT 30,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE farmers_market_dates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read market dates" ON farmers_market_dates FOR SELECT USING (active = true);
CREATE POLICY "Admins manage market dates" ON farmers_market_dates FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- VENDOR APPLICATIONS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vendor_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
  market_date_id UUID REFERENCES farmers_market_dates(id) ON DELETE SET NULL,
  product_summary TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'failed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert vendor application" ON vendor_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage vendor applications" ON vendor_applications FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- STOREFRONTS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS storefronts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  banner_url TEXT,
  bio TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE storefronts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active storefronts" ON storefronts FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage storefronts" ON storefronts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- PRODUCTS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  storefront_id UUID REFERENCES storefronts(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  images_json JSONB DEFAULT '[]',
  inventory_count INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- ORDERS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage orders" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage order items" ON order_items FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- CLASSES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  instructor TEXT,
  date_time TIMESTAMPTZ,
  capacity INTEGER DEFAULT 30,
  registration_fee DECIMAL(10,2) DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active classes" ON classes FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage classes" ON classes FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE TABLE IF NOT EXISTS class_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  notes TEXT,
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE class_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert class registration" ON class_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage registrations" ON class_registrations FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- FACILITY REQUESTS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS facility_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_title TEXT NOT NULL,
  event_type TEXT,
  request_date DATE,
  start_time TIME,
  end_time TIME,
  attendance_estimate INTEGER,
  description TEXT,
  equipment_needs TEXT,
  food_details TEXT,
  insurance_url TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'approved', 'denied', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE facility_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert facility request" ON facility_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage facility requests" ON facility_requests FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- EVENTS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  location TEXT,
  watch_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_live BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read events" ON events FOR SELECT USING (true);
CREATE POLICY "Admins manage events" ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- DONATIONS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_name TEXT,
  donor_email TEXT,
  amount DECIMAL(10,2) NOT NULL,
  frequency TEXT DEFAULT 'one_time' CHECK (frequency IN ('one_time', 'monthly', 'annual')),
  stripe_payment_intent_id TEXT,
  campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert donation" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view all donations" ON donations FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- PODCAST EPISODES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS podcast_episodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  embed_url TEXT,
  published_at TIMESTAMPTZ,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active episodes" ON podcast_episodes FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage episodes" ON podcast_episodes FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- SITE SETTINGS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value_json JSONB
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage settings" ON site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Default settings
INSERT INTO site_settings (key, value_json) VALUES
  ('live_stream', '{"is_live": false, "embed_url": "", "title": ""}'),
  ('contact', '{"email": "info@acreshomechamber.com", "phone": "(832) 433-7916", "address": "6112 Wheatley St. Houston, TX 77091"}')
ON CONFLICT (key) DO NOTHING;
