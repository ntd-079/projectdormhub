# Project DormHub

ตัวอย่างโครงสร้าง Full Stack แบบ Hello World สำหรับเริ่มต้นพัฒนาโปรเจกต์ โดยใช้ React, Tailwind CSS, Node.js, Express.js, SQLite และ Docker

## โครงสร้าง

```text
projectdormhub/
├── frontend/       # React + Tailwind CSS + Vite
├── backend/        # Node.js + Express.js API
├── database/       # SQLite, migrations และ seeds
├── docker-compose.yml
├── .env.example
└── .gitignore
```

## เริ่มต้นด้วย Docker

```bash
copy .env.example .env
docker compose up --build
```

เปิดใช้งาน:

- Frontend: http://localhost:3000
- Backend health check: http://localhost:4000/api/health
- Messages จาก SQLite: http://localhost:4000/api/messages

เมื่อ Backend เริ่มทำงาน จะสร้างไฟล์ `database/data/app.sqlite` อัตโนมัติจาก [database/schema.sql](/C:/work/ปี%203/Sofwere%20Dev/projectdormhub/database/schema.sql) และเติมข้อมูลตัวอย่างจาก [database/seed.sql](/C:/work/ปี%203/Sofwere%20Dev/projectdormhub/database/seed.sql)

หากมีคำสั่ง `sqlite3` สามารถสร้างฐานข้อมูลเองได้ด้วย:

```bash
sqlite3 database/data/app.sqlite < database/schema.sql
sqlite3 database/data/app.sqlite < database/seed.sql
```

## เริ่มต้นแบบไม่ใช้ Docker

ต้องมี Node.js 20 ขึ้นไป จากนั้นเปิด terminal สองหน้าต่าง:

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

## หมายเหตุสำหรับ Git

ไฟล์ `.env.example`, `Dockerfile`, migration, seed และ `.gitkeep` ถูกเตรียมไว้ให้ commit ขึ้น Git ได้ ส่วน `.env`, `node_modules` และไฟล์ฐานข้อมูลจริงจะถูกละเว้นด้วย `.gitignore`
