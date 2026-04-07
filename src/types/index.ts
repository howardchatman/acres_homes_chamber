export type UserRole = "public" | "member" | "vendor" | "admin";

export type MembershipStatus = "pending" | "active" | "expired" | "rejected";
export type ApplicationStatus = "submitted" | "under_review" | "approved" | "rejected";
export type VendorStatus = "pending" | "approved" | "rejected" | "suspended";
export type FacilityRequestStatus = "submitted" | "approved" | "denied" | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded" | "failed";
export type OrderStatus = "pending" | "processing" | "completed" | "cancelled" | "refunded";

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  created_at: string;
}

export interface Business {
  id: string;
  owner_user_id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  category: string;
  description: string;
  logo_url?: string;
  membership_tier: string;
  membership_status: MembershipStatus;
  stripe_customer_id?: string;
  created_at: string;
}

export interface MembershipApplication {
  id: string;
  business_id?: string;
  submitted_data_json: Record<string, unknown>;
  status: ApplicationStatus;
  admin_notes?: string;
  payment_status: PaymentStatus;
  created_at: string;
}

export interface Vendor {
  id: string;
  owner_user_id?: string;
  business_name: string;
  vendor_name: string;
  category: string;
  description: string;
  email: string;
  phone: string;
  website?: string;
  permits_url?: string;
  insurance_url?: string;
  status: VendorStatus;
  booth_assignment?: string;
  created_at: string;
}

export interface FarmersMarketDate {
  id: string;
  title: string;
  market_date: string;
  booth_capacity: number;
  active: boolean;
}

export interface VendorApplication {
  id: string;
  vendor_id?: string;
  market_date_id?: string;
  product_summary: string;
  status: ApplicationStatus;
  payment_status: PaymentStatus;
  notes?: string;
  created_at: string;
}

export interface Storefront {
  id: string;
  vendor_id: string;
  slug: string;
  banner_url?: string;
  bio?: string;
  is_active: boolean;
}

export interface Product {
  id: string;
  vendor_id: string;
  storefront_id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images_json: string[];
  inventory_count?: number;
  is_active: boolean;
  category: string;
  created_at: string;
}

export interface Order {
  id: string;
  customer_email: string;
  customer_name: string;
  total_amount: number;
  stripe_payment_intent_id?: string;
  status: OrderStatus;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  vendor_id: string;
  quantity: number;
  unit_price: number;
}

export interface ClassProgram {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructor?: string;
  date_time: string;
  capacity: number;
  registration_fee: number;
  image_url?: string;
  is_active: boolean;
}

export interface ClassRegistration {
  id: string;
  class_id: string;
  full_name: string;
  email: string;
  phone: string;
  notes?: string;
  payment_status: PaymentStatus;
  created_at: string;
}

export interface FacilityRequest {
  id: string;
  org_name: string;
  contact_name: string;
  email: string;
  phone: string;
  event_title: string;
  event_type: string;
  request_date: string;
  start_time: string;
  end_time: string;
  attendance_estimate: number;
  description: string;
  equipment_needs?: string;
  food_details?: string;
  insurance_url?: string;
  status: FacilityRequestStatus;
  admin_notes?: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url?: string;
  start_at: string;
  end_at: string;
  location: string;
  watch_url?: string;
  is_featured: boolean;
  is_live: boolean;
  created_at: string;
}

export interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  frequency: "one_time" | "monthly" | "annual";
  stripe_payment_intent_id?: string;
  campaign?: string;
  created_at: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  slug: string;
  description: string;
  embed_url: string;
  published_at: string;
  image_url?: string;
  is_active: boolean;
}

export interface SiteSetting {
  id: string;
  key: string;
  value_json: unknown;
}
