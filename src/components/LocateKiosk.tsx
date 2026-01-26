import { useEffect, useState } from 'react';
import {
  MapPin,
  Navigation2,
  Phone,
  Clock,
  Loader2,
} from 'lucide-react';
import Navigation from './Navigation';

type Page =
  | 'home'
  | 'kiosk'
  | 'features'
  | 'tracking'
  | 'impact'
  | 'chatbot'
  | 'locate';

interface Props {
  onNavigate: (page: Page) => void;
}

interface Kiosk {
  name: string;
  address: string;
  lat: number;
  lng: number;
  hours: string;
  phone: string;
  distance: string;
}

/* 🔒 FIXED START LOCATION (COIMBATORE) */
const FIXED_LOCATION = {
  lat: 11.0019,
  lng: 77.2213,
};

export default function LocateKiosk({ onNavigate }: Props) {
  const [userLocation, setUserLocation] = useState(FIXED_LOCATION);
  const [activeKiosk, setActiveKiosk] = useState<Kiosk | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  /* ---------------- KIOSKS (COIMBATORE + TIRUPUR) ---------------- */
  const kiosks: Kiosk[] = [
    // COIMBATORE
    {
      name: 'Coimbatore District Court Kiosk',
      address: 'District Court Campus, Coimbatore',
      lat: 11.0168,
      lng: 76.9558,
      hours: '9:30 AM – 5:30 PM',
      phone: '0422-2301234',
      distance: 'Nearby',
    },
    {
      name: 'Coimbatore e-Seva Center Kiosk',
      address: 'Collectorate Campus, Coimbatore',
      lat: 11.0014,
      lng: 76.9629,
      hours: '9:00 AM – 6:00 PM',
      phone: '0422-2223344',
      distance: '3.4 km',
    },

    // TIRUPUR
    {
      name: 'Tirupur District Court Kiosk',
      address: 'District Court Campus, Tirupur',
      lat: 11.1085,
      lng: 77.3411,
      hours: '9:30 AM – 5:30 PM',
      phone: '0421-2234567',
      distance: 'Nearby',
    },
    {
      name: 'Tirupur Taluk Office Kiosk',
      address: 'Taluk Office Road, Tirupur',
      lat: 11.1016,
      lng: 77.3477,
      hours: '10:00 AM – 5:00 PM',
      phone: '0421-2256789',
      distance: '2.1 km',
    },
  ];

  /* ---------------- INIT LOCATION (NO GPS) ---------------- */
  useEffect(() => {
    setUserLocation(FIXED_LOCATION);
    setLoadingLocation(false);
  }, []);

  /* ---------------- OPEN GOOGLE MAPS (TURN-BY-TURN) ---------------- */
  const openNavigation = () => {
    if (!activeKiosk) return;

    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${activeKiosk.lat},${activeKiosk.lng}&travelmode=driving`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <Navigation currentPage="locate" onNavigate={onNavigate} />

      <main className="pt-28 px-6 pb-24 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black uppercase tracking-wide">
            Locate <span className="text-emerald-400">Legal Edge</span> Kiosk
          </h1>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Legal Edge kiosks available in and around Coimbatore & Tirupur.
            Select a kiosk to preview navigation.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12">
          {/* LEFT — KIOSK LIST */}
          <div className="space-y-6">
            {kiosks.map((kiosk, i) => (
              <button
                key={i}
                onClick={() => setActiveKiosk(kiosk)}
                className={`w-full text-left p-7 rounded-2xl
                  bg-gradient-to-b from-[#0b1328] to-[#060b16]
                  border transition-all duration-300
                  hover:-translate-y-1 hover:border-emerald-400
                  ${
                    activeKiosk?.name === kiosk.name
                      ? 'border-emerald-400 ring-2 ring-emerald-400/30'
                      : 'border-white/10'
                  }`}
              >
                <div className="flex justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-emerald-400" />
                    <h3 className="font-bold">{kiosk.name}</h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">
                    {kiosk.distance}
                  </span>
                </div>

                <p className="text-slate-400 text-sm mb-4">
                  {kiosk.address}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    {kiosk.hours}
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    {kiosk.phone}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT — MAP + NAVIGATION */}
          <div className="rounded-2xl border border-white/10 bg-[#060b16] overflow-hidden">
            {loadingLocation ? (
              <div className="h-full flex items-center justify-center py-40">
                <Loader2 className="animate-spin text-emerald-400" />
              </div>
            ) : activeKiosk ? (
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-white/10">
                  <h3 className="font-bold text-lg">
                    Navigation Preview
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {activeKiosk.name}
                  </p>
                </div>

                {/* MAP PREVIEW (NO API KEY) */}
                <iframe
                  title="Map Preview"
                  className="w-full flex-1"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${activeKiosk.lat},${activeKiosk.lng}&z=14&output=embed`}
                />

                <div className="p-6 border-t border-white/10">
                  <button
                    onClick={openNavigation}
                    className="w-full py-4 rounded-xl bg-emerald-600
                               text-xs font-black uppercase tracking-widest
                               hover:bg-emerald-500 transition
                               flex items-center justify-center gap-2"
                  >
                    <Navigation2 className="w-4 h-4" />
                    Open Turn-by-Turn Navigation
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 py-40">
                Select a kiosk on the left to view navigation
              </div>
            )}
          </div>
        </div>

        {/* BACK */}
        <div className="mt-20 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs uppercase tracking-widest text-slate-400 hover:text-emerald-400 transition"
          >
            ← Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}
