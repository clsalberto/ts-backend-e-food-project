create table users (
  id uuid primary key,
  store_id uuid not null,
  name text not null,
  email text unique not null,
  password text not null,
  created_at timestamp not null,
  active bool not null
);

alter table users add foreign key (store_id) references stores (id);

alter table users enable row level security;
