create extension if not exists "uuid-ossp";

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  category text not null,
  price integer not null check (price >= 0),
  compare_at_price integer check (compare_at_price >= 0),
  stock integer not null default 0,
  image_url text,
  description text not null,
  includes text[] not null default '{}',
  tags text[] not null default '{}',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  customer_name text not null,
  phone text not null,
  whatsapp text,
  location text not null,
  delivery_address text not null,
  payment_method text not null check (payment_method in ('Mobile Money', 'Card', 'Pay on Delivery')),
  payment_provider text,
  payment_reference text,
  status text not null default 'Pending' check (status in ('Pending', 'Paid', 'Packed', 'Dispatched', 'Delivered', 'Cancelled')),
  total integer not null check (total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price integer not null check (unit_price >= 0)
);

create table if not exists public.product_bundles (
  id uuid primary key default uuid_generate_v4(),
  parent_product_id uuid not null references public.products(id) on delete cascade,
  child_product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null default 1 check (quantity > 0)
);

create index if not exists orders_order_number_idx on public.orders(order_number);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists products_category_idx on public.products(category);

insert into public.products (slug, name, category, price, compare_at_price, stock, image_url, description, includes, tags, featured)
values
  ('newborn-starter-pack', 'Newborn Starter Pack', 'Newborn Starter Packs', 185000, 210000, 24, '/images/hero-care-packages.png', 'A ready pack of soft newborn essentials for the first days at home.', array['Diapers size 1', 'Baby wipes', 'Cotton wool', 'Baby soap', 'Receiving blanket', 'Two soft onesies'], array['newborn', 'essentials', 'giftable'], true),
  ('hospital-delivery-bag-pack', 'Hospital Delivery Bag Pack', 'Hospital Delivery Bag Packs', 245000, 275000, 16, '/images/hero-care-packages.png', 'A practical delivery-day bundle for mum and baby, organized for hospital admission.', array['Maternity pads', 'Nursing pads', 'Baby diapers', 'Baby blanket', 'Sanitizer', 'Toiletry pouch', 'Reusable bag'], array['pregnancy', 'hospital', 'delivery'], true),
  ('mother-recovery-pack', 'Mother Recovery Pack', 'Mother Recovery Packs', 155000, null, 20, '/images/hero-care-packages.png', 'Comfort-focused after-birth care items for new mothers recovering at home.', array['Maternity pads', 'Nursing pads', 'Comfort tea', 'Body wipes', 'Gentle soap', 'Storage pouch'], array['mother care', 'postpartum', 'comfort'], true)
on conflict (slug) do nothing;
