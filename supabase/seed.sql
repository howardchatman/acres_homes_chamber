-- ============================================================
-- AcresHOME Chamber — Seed Data
-- Run AFTER schema.sql to populate sample data
-- ============================================================

-- Sample Events
INSERT INTO events (title, slug, description, location, start_at, end_at, is_featured) VALUES
  ('Monthly Business Networking Mixer', 'business-networking-mixer-april-2026',
   'Connect with fellow business owners, share wins, explore partnerships, and build the Acres Homes business network.',
   '6112 Wheatley St., Houston TX', '2026-04-15 18:00:00', '2026-04-15 20:00:00', true),
  ('Acres Homes Farmers Market', 'farmers-market-weekly',
   'Shop fresh produce, artisan goods, prepared foods, and more from local Acres Homes vendors.',
   '6112 Wheatley St., Houston TX', '2026-04-12 08:00:00', '2026-04-12 14:00:00', true),
  ('Hydroponics Training Workshop', 'hydroponics-training-april-2026',
   'Learn to grow food indoors with hydroponic systems. Space is limited.',
   '6112 Wheatley St., Houston TX', '2026-04-22 10:00:00', '2026-04-22 13:00:00', false),
  ('Community Economic Forum', 'economic-forum-may-2026',
   'A public forum on economic development, local investment, and business opportunity in Acres Homes.',
   '6112 Wheatley St., Houston TX', '2026-05-08 17:30:00', '2026-05-08 19:30:00', false);

-- Sample Classes / Programs
INSERT INTO classes (title, slug, description, instructor, date_time, capacity, registration_fee, is_active) VALUES
  ('Hydroponics Training — Level 1', 'hydroponics-101',
   'Learn the fundamentals of hydroponic growing. Perfect for beginners.',
   'Chamber Agriculture Lead', '2026-04-22 10:00:00', 20, 25.00, true),
  ('Starting Your Business in Texas', 'business-development-101',
   'Everything you need to legally start a business in Texas. Free workshop.',
   'Business Development Partner', '2026-05-03 10:00:00', 30, 0.00, true),
  ('Financial Literacy for Entrepreneurs', 'financial-literacy',
   'Cash flow, budgeting, credit, and financial planning for small business owners.',
   'Financial Education Partner', '2026-05-17 11:00:00', 25, 0.00, true),
  ('Hydroponics Training — Level 2', 'hydroponics-advanced',
   'For Level 1 graduates. Deeper dive into nutrients, lighting, and scaling.',
   'Chamber Agriculture Lead', '2026-06-14 10:00:00', 15, 35.00, true);

-- Sample Farmers Market Dates
INSERT INTO farmers_market_dates (title, market_date, booth_capacity, active) VALUES
  ('Acres Homes Farmers Market — April 12', '2026-04-12', 30, true),
  ('Acres Homes Farmers Market — April 19', '2026-04-19', 30, true),
  ('Acres Homes Farmers Market — April 26', '2026-04-26', 30, true),
  ('Acres Homes Farmers Market — May 3', '2026-05-03', 30, true);
