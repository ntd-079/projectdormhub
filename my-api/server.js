const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// =========================================================================
// 🎯 ฟังก์ชันดึงข้อมูลสรุป เพื่อส่งให้แดชบอร์ด (แยกออกมารับใช้ร่วมกัน)
// =========================================================================
// =========================================================================
// 🎯 ฟังก์ชันดึงข้อมูลสรุป เพื่อส่งให้แดชบอร์ด (ปรับให้นับยอดรวมทั้งหมด ไม่ล็อกแค่วันนี้)
// =========================================================================
async function getDashboardSummary() {
  // แก้ไข 3 บรรทัดนี้โดยเอาเงื่อนไขวันที่ออก
  const [totalToday] = await db.query(`SELECT COUNT(*) as count FROM sorting_logs`);
  const [sortedCount] = await db.query(`SELECT COUNT(*) as count FROM sorting_logs WHERE status = 'Sorted'`);
  const [rejectedCount] = await db.query(`SELECT COUNT(*) as count FROM sorting_logs WHERE status = 'Rejected'`);
  
  const [gateStats] = await db.query(`SELECT gate_assigned, COUNT(*) as count FROM sorting_logs GROUP BY gate_assigned`);
  const [recent] = await db.query(`
    SELECT l.*, p.region 
    FROM sorting_logs l 
    LEFT JOIN parcels p ON l.barcode_data = p.barcode_data 
    ORDER BY l.created_at DESC LIMIT 1
  `);

  return {
    total_today: totalToday[0].count,
    sorted_today: sortedCount[0].count,
    rejected_today: rejectedCount[0].count,
    gate_stats: gateStats,
    latest_parcel: recent.length > 0 ? recent[0] : null
  };
}

// =========================================================================
// 📡 ระบบ WebSockets (Socket.io)
// =========================================================================
io.on('connection', async (socket) => {
  console.log(`Dashboard connected: ${socket.id}`);
  
  // ✨ เติมโค้ด: ทันทีที่มีคนเปิดหน้าเว็บ Dashboard ให้ดึงข้อมูลจาก MySQL ไปโชว์รอบแรกทันที ไม่ต้องรอให้สแกน
  try {
    const summary = await getDashboardSummary();
    socket.emit('init-dashboard', summary);
  } catch (err) {
    console.error('Failed to send initial data to dashboard:', err);
  }

  socket.on('disconnect', () => {
    console.log('Dashboard disconnected');
  });
});

// =========================================================================
// 1. Endpoint: รับบาร์โค้ดจาก ESP32 -> ค้นหา Gate -> บันทึกข้อมูล -> ส่งไป Dashboard
// =========================================================================
app.post('/api/check-parcel', async (req, res) => {
  const { barcode } = req.body;
  
  if (!barcode) {
    return res.status(400).json({ success: false, message: 'Missing barcode data' });
  }

  try {
    // [ขั้นตอนที่ 1] ค้นหาข้อมูลพัสดุในฐานข้อมูล (ตาราง parcels) ว่าต้องไป Gate ไหน
    const checkSql = "SELECT target_gate, region FROM parcels WHERE barcode_data = ?";
    const [rows] = await db.query(checkSql, [barcode]);

    let assignedGate = 0; // ค่าเริ่มต้น 0 = ไม่พบข้อมูลพัสดุชิ้นนี้ (ส่งไปช่อง Reject)
    let region = "Unknown";

    if (rows.length > 0) {
      assignedGate = parseInt(rows[0].target_gate);
      region = rows[0].region;
      console.log(`[Found] Barcode: ${barcode} -> Region: ${region} -> Gate: ${assignedGate}`);
    } else {
      console.log(`[Not Found] Barcode: ${barcode} -> Assigned to Reject Gate (Gate 0)`);
    }

    // [ขั้นตอนที่ 2] บันทึกประวัติการคัดแยกลงในตาราง sorting_logs
    const statusText = assignedGate === 0 ? 'Rejected' : 'Sorted';
    const insertSql = `INSERT INTO sorting_logs (barcode_data, gate_assigned, status) VALUES (?, ?, ?)`;
    const [result] = await db.query(insertSql, [barcode, assignedGate, statusText]);

    console.log(`Logged: ${barcode} at Gate ${assignedGate}`);

    // [ขั้นตอนที่ 3 & 4] ดึงข้อมูลสถิติใหม่และยิง WebSockets ไปที่หน้าจอ Dashboard ทันที
    const summary = await getDashboardSummary();
    io.emit('new-parcel', summary); // 🎯 ส่งเหตุการณ์ชื่อ 'new-parcel' ไปหาหน้าบ้าน

    // [ขั้นตอนที่ 5] ตอบกลับ ESP32 เพื่อให้แขนกั้นหรือ Servo ทำงาน
    return res.status(200).json({ 
      success: true, 
      message: 'Gate checked, logged and broadcasted successfully!',
      barcode: barcode,
      gate: assignedGate // ESP32 จะอ่านค่าตัวนี้ไปควบคุม Servo
    });

  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server database error' });
  }
});

// =========================================================================
// 2. Endpoint ดึงข้อมูลสรุปแบบ HTTP (สำรองไว้ใช้)
// =========================================================================
app.get('/api/get-summary', async (req, res) => {
  try {
    const summary = await getDashboardSummary();
    return res.status(200).json({ success: true, ...summary });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch summary' });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});