import { useEffect, useState } from 'react'
import Water from './Water'
import './index.css';
import axios from 'axios';
import { data } from 'autoprefixer';
import Vector from'./assets/Vector.png';
//geolocation utulizamos un efecto


const STATS = [
    { label: "Base URL", value: "/auth/*", color: "emerald", mono: true },
    { label: "Framework", value: "Express 5", color: "purple" },
    { label: "Database", value: "PostgreSQL", color: "amber" },
    { label: "ORM", value: "Prisma", color: "sky" },
];

const BADGES = [
    { text: "v1.0.0", color: "emerald" },
    { text: "REST API", color: "purple" },
    { text: "PORT 4000", color: "amber" },
    { text: "Tailwind + Accordion", color: "sky" },
];

const AUTH_ENDPOINTS = [
    {
        method: "POST",
        path: "/auth/login",
        title: "Iniciar sesión",
        requestBody: `"email":    "user@example.com",\n"password": "securePass123"`,
        response: `"data": {\n  "success": "OK",\n  "ProcessT": "eyJwpyurAbcdihbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "fecha": "2026-03-23T01:06:40.507Z",\n  "status": "activo"\n}`,
    },
];

const INSTITUCIONES_ENDPOINTS = [
    {
        title: "Registrar institución",
        method: "POST",
        link: "https://process-eight.vercel.app/auth/instituciones/register",
        data: {
            nombreInstitucion: "franklimUNiversity",
            tipo: "Privada",
            telefonocorp: "3022130374",
            direccion: "cra4b#61-77",
            nombreAdministrador: "Manolo vera",
            email: "f5extuniversal@gmail.com",
            password: "Millonario2090**",
            celularadmin: "3022130374",
            pais: "Colombia",
        },
    },
    {
        title: "Activar cuenta",
        method: "POST",
        link: "https://process-eight.vercel.app/auth/institucion/send-otp",
        data: { code: "438SWA", email: "f5extuniversal@gmail.com" },
    },
    {
        title: "Reenvío código y reset",
        method: "POST",
        link: "https://process-eight.vercel.app/auth/institucion/Resent",
        data: { email: "f5extuniversal@gmail.com" },
    },
    {
        title: "Confirmar código reset password",
        method: "POST",
        link: "https://process-eight.vercel.app/auth/instituciones/ResetFinal",
        data: {
            code: "528QJH",
            email: "f5extuniversal@gmail.com",
            newPassword: "Millonario2090****",
        },
    },
];

const ERROR_CODES = [
    { code: "400", label: "Bad Request", color: "text-amber-400" },
    { code: "401", label: "Unauthorized", color: "text-red-400" },
    { code: "403", label: "Forbidden", color: "text-orange-400" },
    { code: "404", label: "Not Found", color: "text-gray-400" },
    { code: "500", label: "Internal Error", color: "text-red-500" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getPath(url) {
    try {
        return new URL(url).pathname;
    } catch {
        return url;
    }
}

function MethodBadge({ method }) {
    const colors = {
        POST: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        GET: "bg-sky-500/10 text-sky-400 border-sky-500/20",
        PUT: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        DELETE: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    };
    return (
        <span
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md border ${colors[method] ?? "bg-white/10 text-white border-white/20"}`}
        >
            {method}
        </span>
    );
}

// ─── JSON Syntax Highlight ────────────────────────────────────────────────────

function JsonHighlight({ obj }) {
    const raw = JSON.stringify(obj, null, 2);
    // Simple tokeniser — split on special characters and colorise
    const html = raw
        .replace(/("[\w]+")\s*:/g, '<span class="json-key">$1</span>:')
        .replace(/:\s*(".*?")/g, ': <span class="json-string">$1</span>')
        .replace(/:\s*(\d+)/g, ': <span class="json-number">$1</span>')
        .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>');

    return (
        <pre
            className="code-font bg-black/70 border border-white/10 rounded-lg p-4 mt-1 overflow-x-auto whitespace-pre-wrap text-xs"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

// ─── Accordion Card ───────────────────────────────────────────────────────────

function AccordionCard({ method, path, title, children }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="endpoint-card bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all"
            style={{
                borderColor: open ? "rgba(0,255,136,0.4)" : undefined,
                boxShadow: open ? "0 8px 20px -8px rgba(0,255,136,0.08)" : undefined,
            }}
        >
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setOpen((v) => !v)}
            >
                <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                    <MethodBadge method={method} />
                    <code className="text-sm font-mono text-gray-200 break-all">{path}</code>
                    <span className="hidden md:inline text-xs text-gray-400">{title}</span>
                </div>
                <svg
                    className="w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0"
                    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Animated body */}
            <div
                style={{
                    maxHeight: open ? "1200px" : "0",
                    overflow: "hidden",
                    transition: open ? "max-height 0.5s ease-in-out" : "max-height 0.35s ease-out",
                }}
            >
                <div className="px-4 pb-4">{children}</div>
            </div>
        </div>
    );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function SectionHeader({ index, title, badge }) {
    return (
        <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-5">
            <span className="text-xs text-gray-400 font-mono">{index}</span>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            {badge && (
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">{badge}</span>
            )}
        </div>
    );
}

function App() {
  /* Handle que ejecuta la function sucess 
  -coords.latitude
  */
 /* variable | functuin = estado en react */
 
  const [clima, setClima] = useState(null)
  const succes=(props)=>{
    
    const lat =props.coords.latitude;
    const lon =props.coords.longitude;
    const apiKey = 'c01dcb8ba44e04f168636d66563e549b';
    

   axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((data)=>{  setClima(data["data"]) })
    .catch(()=>{console.log("error app") })
  };
  

  /*todo:EL efecto solo se ejecuta despues de cargada la aplicacion */
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(succes);
  })

  return (
    
       <div>
            {/* Global styles */}
            <style>{`
        * { font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif; }
        .code-font { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; line-height: 1.5; }
        .json-key    { color: #7dd3fc; font-weight: 500; }
        .json-string  { color: #86efac; }
        .json-number  { color: #fbbf24; }
        .json-boolean { color: #f87171; }
        ::-webkit-scrollbar       { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #111118; }
        ::-webkit-scrollbar-thumb { background: #2e2e4a; border-radius: 10px; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,600;14..32,700;14..32,800&family=JetBrains+Mono:wght@400;600&display=swap');
      `}</style>

            <div
                className="min-h-screen text-gray-200 antialiased"
                style={{ background: "radial-gradient(circle at 10% 20%, #0a0a12, #030307)" }}
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10">

                    {/* ── HEADER ─────────────────────────────────── */}
                    <div className="mb-10 border-b border-white/10 pb-6 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-sm text-emerald-400 uppercase tracking-[0.2em] mb-3">
                            <div className="w-6 h-px bg-emerald-400/70" />
                            <span>API REFERENCE</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
                            Auth <span className="text-emerald-400">Service</span>
                        </h1>
                        <div className="flex flex-wrap gap-3 mt-5">
                            {BADGES.map(({ text, color }) => (
                                <span
                                    key={text}
                                    className={`px-3 py-1 text-[11px] font-semibold rounded-full border border-${color}-500/30 bg-${color}-500/10 text-${color}-300`}
                                >
                                    {text}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ── STATS ──────────────────────────────────── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {STATS.map(({ label, value, color, mono }) => (
                            <div
                                key={label}
                                className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm relative overflow-hidden"
                            >
                                <div
                                    className="absolute top-0 left-0 w-full h-1"
                                    style={{
                                        background:
                                            color === "emerald" ? "#34d399" :
                                                color === "purple" ? "#a855f7" :
                                                    color === "amber" ? "#f59e0b" : "#38bdf8",
                                    }}
                                />
                                <div className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</div>
                                <div className={`${mono ? "text-sm font-mono text-emerald-300" : "text-base font-semibold"} mt-1`}>
                                    {value}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── HEALTH CHECK ───────────────────────────── */}
                    <div className="mb-14">
                        <SectionHeader index="00" title="Health Check" />
                        <div className="bg-white/5 border-l-4 border-emerald-400 rounded-xl p-5 flex flex-wrap items-center gap-4">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                            </div>
                            <div className="flex-1">
                                <code className="text-sm font-mono">
                                    <span className="text-sky-400">GET</span> /health
                                </code>
                                <p className="text-gray-400 text-xs mt-1">
                                    Verifica que el servicio esté corriendo correctamente
                                </p>
                            </div>
                            <div className="text-emerald-400 text-xs font-mono">200 OK</div>
                        </div>
                    </div>

                    {/* ── AUTENTICACIÓN ──────────────────────────── */}
                    <div className="mb-14">
                        <SectionHeader index="01" title="Autenticación" />
                        <div className="space-y-3">
                            {AUTH_ENDPOINTS.map((ep) => (
                                <AccordionCard key={ep.path} method={ep.method} path={ep.path} title={ep.title}>
                                    <div className="text-[11px] text-gray-400 uppercase mt-2">Request Body</div>
                                    <pre
                                        className="code-font bg-black/60 p-4 rounded-lg mt-1 overflow-x-auto text-xs"
                                        dangerouslySetInnerHTML={{ __html: ep.requestBody }}
                                    />
                                    <div className="text-[11px] text-gray-400 uppercase mt-3">Response 200</div>
                                    <pre className="code-font bg-black/60 p-4 rounded-lg mt-1 overflow-x-auto text-xs">
                                        {ep.response}
                                    </pre>
                                </AccordionCard>
                            ))}
                        </div>
                    </div>

                    {/* ── INSTITUCIONES ──────────────────────────── */}
                    <div className="mb-12">
                        <SectionHeader index="02" title="Instituciones — Endpoints" badge="acordeón dinámico" />
                        <div className="space-y-3">
                            {INSTITUCIONES_ENDPOINTS.map((ep) => (
                                <AccordionCard
                                    key={ep.title}
                                    method={ep.method}
                                    path={getPath(ep.link)}
                                    title={ep.title}
                                >
                                    <div className="mt-2 text-[11px] text-gray-400 uppercase tracking-wider">
                                        🔗 URL completa
                                    </div>
                                    <pre className="code-font bg-black/70 border border-white/10 rounded-lg p-3 mt-1 overflow-x-auto text-sky-300 text-xs break-all">
                                        {ep.link}
                                    </pre>
                                    <div className="mt-3 text-[11px] text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        📦 Request Body (JSON)
                                    </div>
                                    <JsonHighlight obj={ep.data} />
                                </AccordionCard>
                            ))}
                        </div>
                    </div>

                    {/* ── ERROR CODES ────────────────────────────── */}
                    <div className="mt-12 pt-6 border-t border-white/10">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="text-amber-400 text-xl">⚠️</span>
                            Códigos de error comunes
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            {ERROR_CODES.map(({ code, label, color }) => (
                                <div key={code} className="bg-white/5 border border-white/10 rounded-xl p-3">
                                    <div className={`${color} font-mono text-xl`}>{code}</div>
                                    <div className="text-[10px] text-gray-400">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── FOOTER ─────────────────────────────────── */}
                    <footer className="mt-12 pt-6 border-t border-white/10 text-gray-500 text-xs flex justify-between">
                        <span>Auth Service API — Documentación interactiva</span>
                        <span className="font-mono">v1 · TailwindCSS + Accordion</span>
                    </footer>

                </div>
            </div>
        </div>
    
  )
}

export default App
