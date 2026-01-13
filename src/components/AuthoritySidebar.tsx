export default function AuthoritySidebar({ current, onNavigate }: any) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'cases', label: 'My Cases', icon: '📁' },
    { id: 'hearings', label: 'Hearings', icon: '🕒' },
  ];

  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 w-20 hover:w-64 h-[80vh] bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-4 z-50 transition-all duration-500 group overflow-hidden shadow-2xl">
      <div className="flex flex-col h-full gap-8">
        <div className="flex items-center gap-4 px-2">
          <div className="min-w-[40px] h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-slate-950">L</div>
          <span className="font-bold opacity-0 group-hover:opacity-100 transition-opacity">LegalCore</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {items.map(item => (
            <button key={item.id} onClick={() => onNavigate(item.id)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group/btn">
              <span className="text-xl">{item.icon}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 group-hover/btn:text-white font-medium">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}