create table stores (
  id uuid primary key,
  address_id uuid not null,
  name text not null,
  phone text not null,
  tax_id text not null,
  domain text not null,
  created_at timestamp not null
);

alter table stores add foreign key (address_id) references addresses (id);

alter table stores enable row level security;
