import cors from 'cors';
import express from 'express';
import sqlite3 from 'sqlite3';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const databasePath = process.env.DATABASE_PATH || resolve(__dirname, '../database/data/app.sqlite');
mkdirSync(dirname(databasePath), { recursive: true });

const db = new sqlite3.Database(databasePath);
const app = express();
const port = process.env.PORT || 4000;

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

async function initializeDatabase() {
  const migration = readFileSync(resolve(__dirname, '../database/migrations/001_create_messages.sql'), 'utf8');
  await run(migration);
  const count = await all('SELECT COUNT(*) AS count FROM messages');
  if (count[0].count === 0) {
    const seed = readFileSync(resolve(__dirname, '../database/seeds/001_hello_world.sql'), 'utf8');
    await run(seed);
  }
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', message: 'Hello World from Express + SQLite' });
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
