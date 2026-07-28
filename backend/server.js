import cors from 'cors';
import express from 'express';
import sqlite3 from 'sqlite3';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const databasePath = process.env.DATABASE_PATH || resolve(__dirname, '../database/data/app.sqlite');
mkdirSync(dirname(databasePath), { recursive: true });

const db = new sqlite3.Database(databasePath);
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const run = (sql, params = []) => new Promise((resolvePromise, reject) => {
  db.run(sql, params, function onRun(error) {
    if (error) reject(error);
    else resolvePromise({ id: this.lastID, changes: this.changes });
  });
});

const all = (sql, params = []) => new Promise((resolvePromise, reject) => {
  db.all(sql, params, (error, rows) => (error ? reject(error) : resolvePromise(rows)));
});

const exec = (sql) => new Promise((resolvePromise, reject) => {
  db.exec(sql, (error) => (error ? reject(error) : resolvePromise()));
});

async function initializeDatabase() {
  const schemaPath = existsSync(resolve(__dirname, 'database/schema.sql'))
    ? resolve(__dirname, 'database/schema.sql')
    : resolve(__dirname, '../database/schema.sql');
  const seedPath = existsSync(resolve(__dirname, 'database/seed.sql'))
    ? resolve(__dirname, 'database/seed.sql')
    : resolve(__dirname, '../database/seed.sql');

  const schema = readFileSync(schemaPath, 'utf8');
  await exec(schema);

  const countResult = await all('SELECT COUNT(*) as count FROM dormitories');
  if (countResult[0]?.count === 0) {
    const seed = readFileSync(seedPath, 'utf8');
    await exec(seed);
  } else {
    await exec(`
      UPDATE dormitories SET image_url = CASE id
        WHEN 1 THEN 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop'
        WHEN 2 THEN 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop'
        WHEN 3 THEN 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop'
        WHEN 4 THEN 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop'
        WHEN 5 THEN 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
        WHEN 6 THEN 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop'
        WHEN 7 THEN 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop'
        WHEN 8 THEN 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop'
        WHEN 9 THEN 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'
        WHEN 10 THEN 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop'
        ELSE 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop'
      END WHERE image_url IS NULL;
    `);
  }
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', message: 'Hello World from Express + SQLite' });
});

app.get('/api/dormitories', async (_request, response) => {
  try {
    const dorms = await all('SELECT * FROM dormitories ORDER BY id ASC');
    response.json({ success: true, data: dorms });
  } catch (error) {
    response.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/dormitories/recommended', async (request, response) => {
  try {
    const limit = parseInt(request.query.limit) || 6;
    const dorms = await all('SELECT * FROM dormitories ORDER BY id ASC LIMIT ?', [limit]);
    response.json({ success: true, data: dorms });
  } catch (error) {
    response.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/dormitories/:id', async (request, response) => {
  try {
    const dorms = await all('SELECT * FROM dormitories WHERE id = ?', [request.params.id]);
    if (dorms.length === 0) {
      return response.status(404).json({ success: false, message: 'Dormitory not found' });
    }
    response.json({ success: true, data: dorms[0] });
  } catch (error) {
    response.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/messages', async (_request, response) => {
  try {
    response.json(await all('SELECT id, message, created_at FROM messages ORDER BY id DESC'));
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

initializeDatabase()
  .then(() => app.listen(port, () => console.log(`Backend listening on port ${port}`)))
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  });
