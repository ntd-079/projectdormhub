import cors from 'cors';
import express from 'express';
import sqlite3 from 'sqlite3';
import { mkdirSync, readFileSync, existsSync, unlinkSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const databasePath = process.env.DATABASE_PATH || resolve(__dirname, '../database/data/app.sqlite');
mkdirSync(dirname(databasePath), { recursive: true });

// Start with a completely fresh database on every backend process start.
for (const suffix of ['', '-wal', '-shm']) {
  const filePath = `${databasePath}${suffix}`;
  if (existsSync(filePath)) unlinkSync(filePath);
}

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
  const seed = readFileSync(seedPath, 'utf8');
  // Accept seed files with trailing commas in column lists and between statements.
  const normalizedSeed = seed
    .replace(/,\s*(?=\))/g, '')
    .replace(/,\s*(?=\r?\n\s*INSERT INTO)/g, ';');
  await exec(normalizedSeed);
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
