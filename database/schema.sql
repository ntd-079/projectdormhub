-- Project DormHub: โครงสร้างฐานข้อมูล SQLite พื้นฐาน
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS dormitories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  water_fee REAL  NOT NULL,
  electricity_fee REAL NOT NULL,
  monthly_rent REAL NOT NULL,
  gender_type TEXT  NOT NULL,
  room_type TEXT NOT NULL,
  image_url TEXT ,
  location_id INTEGER
);

CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  map_url TEXT
);

