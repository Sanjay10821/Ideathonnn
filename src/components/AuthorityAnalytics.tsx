import React from 'react';

export default function AuthorityAnalytics() {
  const data = [6, 9, 12, 14, 13, 15, 14];

  return (
    <div className="rounded-2xl bg-white/[0.04]
                    border border-white/10
                    p-6 backdrop-blur">
      <p className="text-slate-400 text-sm mb-4">
        Case Activity (Last 7 Days)
      </p>

      <div className="flex items-end gap-2 h-32">
        {data.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-md bg-gradient-to-t
                       from-emerald-500 to-emerald-300
                       opacity-80 hover:opacity-100
                       transition"
            style={{ height: `${v * 6}px` }}
          />
        ))}
      </div>
    </div>
  );
}
