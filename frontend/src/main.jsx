import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function App() {
  const [health, setHealth] = useState('กำลังเชื่อมต่อ API...');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${apiUrl}/api/health`).then((response) => response.json()),
      fetch(`${apiUrl}/api/messages`).then((response) => response.json()),
    ])
      .then(([status, data]) => { setHealth(status.message); setMessages(data); })
      .catch(() => setHealth('ไม่สามารถเชื่อมต่อ Backend ได้'));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Project DormHub</p>
        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">Hello World<span className="text-cyan-400">.</span></h1>
        <p className="mx-auto mt-6 max-w-xl text-slate-300">ตัวอย่าง Full Stack ด้วย React, Tailwind CSS, Express.js และ SQLite</p>
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left shadow-2xl">
          <p className="text-sm text-slate-400">Backend status</p>
          <p className="mt-2 text-lg font-medium text-emerald-400">{health}</p>
          <div className="mt-6 border-t border-slate-800 pt-5">
            <p className="text-sm text-slate-400">Message from database</p>
            {messages.map((item) => <p className="mt-2 text-xl" key={item.id}>{item.message}</p>)}
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
