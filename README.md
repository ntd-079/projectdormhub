# โครงสร้างโปรเจกต์ Full Stack สำหรับมือใหม่

โปรเจกต์นี้เป็นโครงสร้างเริ่มต้นสำหรับแอป Full Stack โดยตั้งใจยังไม่ผูกกับภาษา, Package หรือ Framework ใด ๆ จึงยังไม่มีโค้ดแอปจริงและยังไม่สามารถรันได้ทันที

## ภาพรวมโครงสร้าง

```text
my-project/
├─ frontend/
│  ├─ pages/
│  ├─ components/
│  ├─ services/
│  ├─ assets/
│  └─ Dockerfile
├─ backend/
│  ├─ routes/
│  ├─ controllers/
│  ├─ services/
│  ├─ repositories/
│  ├─ models/
│  ├─ app/
│  └─ Dockerfile
├─ database/
│  ├─ migrations/
│  ├─ seeds/
│  └─ data/
├─ docker-compose.yml
├─ .env.example
├─ .gitignore
└─ README.md
```

## หน้าที่ของแต่ละส่วน

- `frontend/` คือส่วนหน้าจอที่ผู้ใช้เปิดใช้งาน
  - `pages/` เก็บหน้า เช่น หน้ารายการและหน้าเพิ่มข้อมูล
  - `components/` เก็บชิ้นส่วน UI ที่นำกลับมาใช้ซ้ำ
  - `services/` เก็บโค้ดเรียก Backend API
  - `assets/` เก็บรูปภาพ, ฟอนต์ หรือไฟล์ประกอบหน้าเว็บ
  - `Dockerfile` เป็นแม่แบบวิธีสร้างและรัน Frontend ใน Container
- `backend/` คือส่วน Server และ API
  - `routes/` กำหนด URL และ HTTP method ของ API
  - `controllers/` รับคำขอและส่งคำตอบกลับ
  - `services/` เก็บกฎหรือกระบวนการทางธุรกิจ
  - `repositories/` ติดต่อฐานข้อมูล
  - `models/` อธิบายรูปแบบข้อมูล
  - `app/` เก็บการตั้งค่าและจุดเริ่มต้นของแอป
  - `Dockerfile` เป็นแม่แบบวิธีสร้างและรัน Backend ใน Container
- `database/` เก็บสิ่งที่เกี่ยวกับ SQLite
  - `migrations/` เก็บขั้นตอนสร้างหรือเปลี่ยนโครงสร้างตาราง
  - `seeds/` เก็บข้อมูลตัวอย่างสำหรับพัฒนา
  - `data/` เป็นตำแหน่งเก็บไฟล์ฐานข้อมูลจริงภายหลังที่ `database/data/app.sqlite`
- `docker-compose.yml` เป็นแม่แบบสำหรับจัดการ Container ของ Frontend และ Backend พร้อมกัน โดย Backend mount `database/data` เข้าไปใน Container
- `.env.example` เป็นตัวอย่างชื่อตัวแปรสภาพแวดล้อม เช่น port และตำแหน่งฐานข้อมูล ควรคัดลอกเป็น `.env` แล้วปรับค่าตาม Stack
- `.gitignore` ระบุไฟล์ที่ไม่ควร commit เช่น `.env`, ไฟล์ SQLite, dependency และไฟล์ build
- `README.md` อธิบายโครงสร้างและแนวทางเริ่มต้น

## การไหลของข้อมูล

```text
Frontend → Backend API → SQLite
```

Frontend ควรติดต่อฐานข้อมูลผ่าน Backend API เท่านั้น ห้ามให้ Frontend เชื่อม SQLite โดยตรง เพราะ Backend เป็นจุดควบคุมกฎธุรกิจ, การตรวจสอบข้อมูล และสิทธิ์การเข้าถึง

SQLite เป็นไฟล์ฐานข้อมูล จึงไม่ต้องมี Container แยก โดย Backend จะใช้ไฟล์ที่อยู่ใน `database/data/app.sqlite` และ Docker Compose จะ mount โฟลเดอร์นี้เพื่อให้ข้อมูลยังอยู่เมื่อสร้าง Container ใหม่

## Docker และการตั้งค่า

`Dockerfile` บอกขั้นตอนสร้าง Image ของแต่ละส่วน ส่วน `docker-compose.yml` บอกวิธีเชื่อม Frontend กับ Backend, เปิด port และ mount ข้อมูล

ไฟล์ Docker ปัจจุบันเป็นเพียง **Template**: ยังไม่มี base image, คำสั่ง build/start ที่ผูกกับภาษา หรือ Framework ดังนั้นยังรันไม่ได้จนกว่าจะเลือก Stack และเติมคำสั่งให้เหมาะสม

`.env.example` ไม่ใช่ไฟล์ลับและใช้เป็นแบบฟอร์มตั้งค่า เมื่อเริ่มพัฒนาจริงให้คัดลอกเป็น `.env`; ไฟล์ `.env` จะไม่ถูกติดตามโดย Git

## ตัวอย่าง Workflow: ผู้ใช้เพิ่มข้อมูล

1. ผู้ใช้กรอกแบบฟอร์มในหน้า Frontend แล้วกดบันทึก
2. Frontend `services/` ส่งคำขอ เช่น `POST /api/items` ไปยัง Backend API
3. Backend `routes/` เลือก endpoint และส่งต่อให้ `controllers/`
4. `controllers/` ตรวจสอบคำขอ แล้วเรียก `services/` เพื่อใช้กฎทางธุรกิจ
5. `services/` เรียก `repositories/` ให้บันทึกข้อมูลลง SQLite ผ่าน Model ที่กำหนดไว้
6. Backend ส่งผลลัพธ์กลับเป็นคำตอบ API และ Frontend แสดงผลหรือข้อความผิดพลาดให้ผู้ใช้

## สิ่งที่ควรทำต่อหลังเลือก Stack

1. เลือกภาษา, Framework, runtime และ Package manager ของ Frontend กับ Backend
2. สร้างโปรเจกต์ย่อยและติดตั้ง dependency ที่จำเป็น
3. กำหนดคำสั่ง build/start และ port ใน Dockerfile กับ `docker-compose.yml`
4. ออกแบบตารางและเขียน migration/seed
5. สร้าง API แรกและเชื่อม Frontend ผ่าน `services/`
6. คัดลอก `.env.example` เป็น `.env` แล้วกำหนดค่าจริงโดยไม่ commit ไฟล์นี้
7. ทดสอบการไหลของข้อมูลตั้งแต่หน้าจอจนถึง SQLite

โครงสร้างนี้จงใจใช้ `.gitkeep` ในโฟลเดอร์ว่าง เพื่อให้ Git เก็บโครงสร้างไว้ก่อนที่จะมีไฟล์จริง และยังไม่ได้สร้างไฟล์ฐานข้อมูล SQLite

