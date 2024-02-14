create table addresses (
  id uuid primary key,
  location_id uuid not null,
  number text not null,
  complement text null,
  reference_point text null
);

alter table addresses add foreign key (location_id) references locations (id);

alter table addresses enable row level security;
