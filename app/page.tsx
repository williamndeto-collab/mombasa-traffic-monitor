'use client';

import { useMemo, useState } from 'react';

type Incident = {
  id: number;
  type: string;
  location: string;
  severity: 'High' | 'Medium' | 'Low';
  time: string;
};

const incidents: Incident[] = [
  { id: 1, type: 'Heavy congestion', location: 'Nyali Bridge', severity: 'High', time: '2 min ago' },
  { id: 2, type: 'Road works', location: 'Digo Road', severity: 'Medium', time: '8 min ago' },
  { id: 3, type: 'Vehicle breakdown', location: 'Malindi Road', severity: 'Low', time: '14 min ago' },
];

const trafficRows = [
  { road: 'Nyali Bridge Corridor', level: 'Severe', travel: '38 min', change: '+18%' },
  { road: 'Mombasa Road', level: 'Heavy', travel: '27 min', change: '+11%' },
  { road: 'Digo Road', level: 'Moderate', travel: '16 min', change: '+4%' },
  { road: 'Likoni Ferry Access', level: 'Free flow', travel: '12 min', change: '-6%' },
];

export default function HomePage() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredRows = useMemo(
    () => trafficRows.filter((row) => row.road.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-black text-slate-950">MT</div>
            <div>
              <h1 className="font-semibold tracking-tight">Mombasa Traffic Monitor</h1>
              <p className="text-xs text-slate-400">Live traffic intelligence for Mombasa County</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Live data
            </span>
            <button className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5">Sign in</button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-medium text-cyan-300">Sunday, 27 September 2026 · 14:32 EAT</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Traffic overview</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-400">Monitor congestion, incidents, and route conditions across Mombasa in real time.</p>
          </div>
          <button onClick={() => setIsReportOpen(true)} className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300">
            + Report an incident
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Overall congestion', 'Moderate', '12% higher than usual', 'text-amber-300'],
            ['Active incidents', '24', '6 reported this hour', 'text-rose-300'],
            ['Average travel time', '22 min', 'Across monitored routes', 'text-cyan-300'],
            ['Cameras online', '18 / 21', '85.7% availability', 'text-emerald-300'],
          ].map(([label, value, detail, color]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/10 backdrop-blur-xl">
              <p className="text-sm text-slate-400">{label}</p>
              <p className={`mt-3 text-2xl font-bold ${color}`}>{value}</p>
              <p className="mt-1 text-xs text-slate-500">{detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.65fr_1fr]">
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
            <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div><h3 className="font-semibold">Live traffic map</h3><p className="text-xs text-slate-500">Updated 30 seconds ago</p></div>
              <div className="flex gap-2 text-xs"><span className="rounded bg-emerald-400/15 px-2 py-1 text-emerald-300">Free flow</span><span className="rounded bg-amber-400/15 px-2 py-1 text-amber-300">Moderate</span><span className="rounded bg-rose-400/15 px-2 py-1 text-rose-300">Congested</span></div>
            </div>
            <div className="relative h-[430px] overflow-hidden bg-[#102d3b] bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,.13),transparent_28%),linear-gradient(120deg,transparent_45%,rgba(248,113,113,.7)_46%,rgba(248,113,113,.7)_48%,transparent_49%),linear-gradient(35deg,transparent_48%,rgba(250,204,21,.7)_49%,rgba(250,204,21,.7)_51%,transparent_52%)]">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:42px_42px]" />
              <div className="absolute left-[43%] top-[28%] h-4 w-4 rounded-full border-2 border-white bg-rose-500 shadow-[0_0_0_10px_rgba(244,63,94,.2)]" />
              <div className="absolute left-[67%] top-[53%] h-4 w-4 rounded-full border-2 border-white bg-amber-400 shadow-[0_0_0_10px_rgba(250,204,21,.2)]" />
              <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 backdrop-blur">Mombasa County · Map integration ready</div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between"><div><h3 className="font-semibold">Recent incidents</h3><p className="text-xs text-slate-500">Verified reports near you</p></div><button className="text-xs text-cyan-300 hover:text-cyan-200">View all</button></div>
            <div className="mt-5 space-y-4">{incidents.map((incident) => <div key={incident.id} className="flex gap-3 border-b border-white/10 pb-4 last:border-0"><div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${incident.severity === 'High' ? 'bg-rose-400' : incident.severity === 'Medium' ? 'bg-amber-400' : 'bg-cyan-400'}`} /><div className="min-w-0"><p className="text-sm font-medium">{incident.type}</p><p className="mt-1 text-xs text-slate-400">{incident.location} · {incident.time}</p></div></div>)}</div>
            <button onClick={() => setIsReportOpen(true)} className="mt-3 w-full rounded-lg border border-dashed border-white/20 py-2.5 text-sm text-slate-300 hover:bg-white/5">Submit a report</button>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-semibold">Most monitored routes</h3><p className="text-xs text-slate-500">Current conditions and estimated travel times</p></div><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search roads..." className="rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-400" /></div>
          <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead className="text-xs uppercase text-slate-500"><tr><th className="pb-3">Road</th><th className="pb-3">Condition</th><th className="pb-3">Travel time</th><th className="pb-3">Change</th></tr></thead><tbody>{filteredRows.map((row) => <tr key={row.road} className="border-t border-white/10"><td className="py-3 font-medium">{row.road}</td><td className="py-3"><span className={`rounded-full px-2 py-1 text-xs ${row.level === 'Severe' ? 'bg-rose-400/15 text-rose-300' : row.level === 'Heavy' ? 'bg-orange-400/15 text-orange-300' : row.level === 'Moderate' ? 'bg-amber-400/15 text-amber-300' : 'bg-emerald-400/15 text-emerald-300'}`}>{row.level}</span></td><td className="py-3 text-slate-300">{row.travel}</td><td className={row.change.startsWith('+') ? 'py-3 text-rose-300' : 'py-3 text-emerald-300'}>{row.change}</td></tr>)}</tbody></table></div>
        </section>
      </section>

      {isReportOpen && <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Report an incident</h2><button onClick={() => setIsReportOpen(false)} aria-label="Close" className="text-2xl text-slate-400 hover:text-white">×</button></div><p className="mt-1 text-sm text-slate-400">Help other road users make safer decisions.</p><select className="mt-5 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-3 text-sm"><option>Traffic jam</option><option>Accident</option><option>Road closure</option><option>Flooding</option><option>Vehicle breakdown</option><option>Construction works</option></select><input className="mt-3 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-3 text-sm" placeholder="Location or landmark" /><textarea className="mt-3 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-3 text-sm" rows={3} placeholder="Add details (optional)" /><button onClick={() => setIsReportOpen(false)} className="mt-4 w-full rounded-lg bg-cyan-400 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">Submit report</button></div></div>}
    </main>
  );
}
