-- Project DormHub: โครงสร้างฐานข้อมูล SQLite พื้นฐาน
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS dormitories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  phone TEXT,
  water_fee REAL,
  electricity_fee REAL,
  monthly_rent REAL,
  gender_type TEXT,
  room_type TEXT,
  image_url TEXT,
  location_id INTEGER
);

CREATE TABLE IF NOT EXISTS amenities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  slug VARCHAR,
  category VARCHAR,
  icon VARCHAR
);

CREATE TABLE IF NOT EXISTS dormitory_amenities (
  dormitory_id INTEGER,
  amenity_id INTEGER
);

CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  map_url TEXT
);


