import React, { useState, useEffect } from 'react';
import {
  Menu, Sun, Moon, ArrowLeft, Download, Check, Copy,
  Home, Sparkles, Gamepad2, ExternalLink, X, ShieldCheck,
  Crosshair, Zap, Key
} from 'lucide-react';

// --- Global CSS & Custom Animations ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    @keyframes slideUpFade {
      0% { opacity: 0; transform: translateY(30px) scale(0.95); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.85); }
      60% { transform: scale(1.05); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes neonPulse {
      0%, 100% { box-shadow: 0 0 10px rgba(249, 115, 22, 0.4), 0 0 20px rgba(249, 115, 22, 0.2); }
      50% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.7), 0 0 35px rgba(249, 115, 22, 0.4); }
    }
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    @keyframes floatX {
      0%, 100% { transform: translateX(0px) rotate(0deg); }
      50% { transform: translateX(15px) rotate(5deg); }
    }

    .animate-slide-up {
      animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
    }
    .animate-pop-in {
      animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-neon-pulse {
      animation: neonPulse 2s infinite;
    }
    .animate-float-y {
      animation: floatY 4s ease-in-out infinite;
    }
    .animate-float-x {
      animation: floatX 5s ease-in-out infinite;
    }
   
    .gradient-btn {
      background-size: 200% 200%;
      background-image: linear-gradient(to right, #f97316 0%, #fb923c 30%, #facc15 50%, #fb923c 70%, #f97316 100%);
      animation: gradientMove 4s ease infinite;
      transition: all 0.3s ease;
    }
    .gradient-btn:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 15px 30px -5px rgba(249, 115, 22, 0.5);
    }
    .gradient-btn:active {
      transform: translateY(1px) scale(0.98);
      box-shadow: 0 5px 15px -3px rgba(249, 115, 22, 0.4);
    }

    .game-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .dark .game-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(249, 115, 22, 0.2);
    }

    .dot-pattern {
      background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px);
      background-size: 32px 32px;
    }
    .dark .dot-pattern {
      background-image: radial-gradient(#334155 1px, transparent 1px);
    }
     
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
    .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #475569; }
  `}} />
);

// --- Shared Navigation Data ---
const TOOLS = [
  {
    id: '8ballpool',
    name: 'MOD 8 Ball Pool MVP',
    icon: Gamepad2,
    iconBg: 'bg-gradient-to-br from-orange-400 to-amber-500',
    iconColor: 'text-white'
  }
];

// --- Reusable Components ---

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="group flex items-center text-slate-500 hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-400 mb-8 text-sm font-bold transition-all duration-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md hover:border-orange-500/30 w-fit"
  >
    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
    Return to Dashboard
  </button>
);

// --- Views ---

const HomeView = ({ setView, tools }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] relative">
      <div className="absolute top-10 left-10 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl animate-float-y"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl animate-float-x" style={{ animationDelay: '1s' }}></div>

      <div className="mb-12 flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: '0ms' }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-6 border border-orange-200 dark:border-orange-800/50 animate-neon-pulse">
          <Sparkles className="w-3.5 h-3.5" /> Premium Mods
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">Chheaknarat</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md">
          Your exclusive portal for premium game modifications. Safe, secure, and always updated.
        </p>
      </div>

      <div className="w-full max-w-sm grid gap-4">
        {tools.map((tool, index) => (
          <button
            key={tool.id}
            onClick={() => setView(tool.id)}
            className="w-full bg-white dark:bg-slate-800 rounded-[32px] p-6 flex items-center gap-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] transition-all duration-500 ease-out group border border-slate-100 dark:border-slate-700/50 hover:border-orange-500/30 hover:-translate-y-2 relative overflow-hidden animate-slide-up"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

            <div className={`w-20 h-20 rounded-[24px] overflow-hidden flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out z-10 ${tool.iconBg}`}>
              {tool.photo ? (
                <img src={tool.photo} alt={tool.name} className="w-full h-full object-cover" />
              ) : (
                <tool.icon className={`w-10 h-10 ${tool.iconColor}`} />
              )}
            </div>
            <div className="text-left z-10">
              <span className="block text-2xl font-black text-slate-800 dark:text-white mb-1 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                {tool.name}
              </span>
              <span className="text-sm font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> {tool.status || 'Active & Working'}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};


// --- Generic Dynamic Mod View ---
const GenericModView = ({ setView, mod }) => {
  const [copied, setCopied] = useState(false);
  // Auto-generate a dummy key for dynamic mods if not an explicit MVP
  const [modKey] = useState("VIP-" + Math.random().toString(36).substring(2, 10).toUpperCase());

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = modKey;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) { }
    document.body.removeChild(textArea);
  };

  if (!mod) return <BackButton onClick={() => setView('home')} />;

  return (
    <div className="max-w-3xl mx-auto w-full relative">
      <div className="absolute top-20 right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-float-y pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl animate-float-x pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <BackButton onClick={() => setView('home')} />

      <div className="text-center mb-12 animate-slide-up relative z-10">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-[32px] overflow-hidden flex items-center justify-center mx-auto mb-6 shadow-[0_10px_40px_rgba(249,115,22,0.4)] animate-neon-pulse">
          {mod.photo ? (
            <img src={mod.photo} alt={mod.name} className="w-full h-full object-cover" />
          ) : (
            <Gamepad2 className="w-12 h-12" />
          )}
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">{mod.name}</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-bold max-w-lg mx-auto">
          Download the latest {mod.version} modification with unlocked premium features.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8 animate-slide-up relative z-10" style={{ animationDelay: '100ms' }}>
        <div className="game-card p-5 rounded-[24px] flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-black text-slate-800 dark:text-white">Anti-Ban System</h3>
            <p className="text-xs font-bold text-slate-500">100% Safe to use</p>
          </div>
        </div>
        <div className="game-card p-5 rounded-[24px] flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-black text-slate-800 dark:text-white">Premium Unlocked</h3>
            <p className="text-xs font-bold text-slate-500">All features available</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="bg-white dark:bg-slate-800/80 p-8 rounded-[32px] shadow-xl border border-slate-100 dark:border-slate-700/50 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center shrink-0">
                <Download className="w-7 h-7 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white">Download APK</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-500 dark:text-slate-300">{mod.version}</span>
                  <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-500 dark:text-slate-300">~{Math.floor(Math.random() * 200) + 50} MB</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (mod.apk) {
                  window.open(mod.apk, '_blank');
                } else {
                  alert('Download file is processing. Please try again later.');
                }
              }}
              className="w-full sm:w-auto gradient-btn py-4 px-8 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-3"
            >
              <ExternalLink className="w-5 h-5" /> Download Direct
            </button>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/70 rounded-[24px] p-6 border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Key className="w-32 h-32 text-orange-500" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                  <Key className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white">Activation Key</h2>
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
                You will need this exclusive key to unlock the mod menu after installing.
              </p>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-2 sm:p-3 border-2 border-orange-200 dark:border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
                <code className="text-sm sm:text-lg font-black text-orange-600 dark:text-orange-400 tracking-wider break-all px-4 py-2 select-all text-center sm:text-left w-full">
                  {modKey}
                </code>
                <button
                  onClick={handleCopy}
                  className={`w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all ${copied
                    ? 'bg-emerald-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.4)]'
                    : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:scale-105 shadow-md active:scale-95'
                    }`}
                >
                  {copied ? <><Check className="w-5 h-5" /> Copied!</> : <><Copy className="w-5 h-5" /> Copy Key</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Mod 8 Ball Pool View Specific Logic ---
const Mod8BallPoolView = ({ setView }) => {
  const [copied, setCopied] = useState(false);
  const modLink = "https://www.mediafire.com/file/pujwlfagqrjk9id/%255B_MVP_%255D_8Ball-Pool.Apk/file";
  const modKey = "MVP-1D-87b4bb0b829077407dc20892e608522c";

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = modKey;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) { }
    document.body.removeChild(textArea);
  };

  return (
    <div className="max-w-3xl mx-auto w-full relative">
      <div className="absolute top-20 right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-float-y pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl animate-float-x pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <BackButton onClick={() => setView('home')} />

      <div className="text-center mb-12 animate-slide-up relative z-10">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-[0_10px_40px_rgba(249,115,22,0.4)] animate-neon-pulse">
          <Gamepad2 className="w-12 h-12" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          MOD <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">8 Ball Pool</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-bold max-w-lg mx-auto">
          Download the exclusive MVP build with long lines and auto-aim features.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8 animate-slide-up relative z-10" style={{ animationDelay: '100ms' }}>
        <div className="game-card p-5 rounded-[24px] flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-black text-slate-800 dark:text-white">Anti-Ban System</h3>
            <p className="text-xs font-bold text-slate-500">100% Safe to use</p>
          </div>
        </div>
        <div className="game-card p-5 rounded-[24px] flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
            <Crosshair className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-black text-slate-800 dark:text-white">Long Lines</h3>
            <p className="text-xs font-bold text-slate-500">Perfect accuracy</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="bg-white dark:bg-slate-800/80 p-8 rounded-[32px] shadow-xl border border-slate-100 dark:border-slate-700/50 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center shrink-0">
                <Download className="w-7 h-7 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white">Download APK</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-500 dark:text-slate-300">v5.12.2</span>
                  <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-500 dark:text-slate-300">~105 MB</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.open(modLink, '_blank')}
              className="w-full sm:w-auto gradient-btn py-4 px-8 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-3"
            >
              <ExternalLink className="w-5 h-5" /> Download MediaFire
            </button>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/70 rounded-[24px] p-6 border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Key className="w-32 h-32 text-orange-500" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                  <Key className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white">Activation Key</h2>
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
                You will need this exclusive key to unlock the MVP mod menu after installing.
              </p>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-2 sm:p-3 border-2 border-orange-200 dark:border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
                <code className="text-sm sm:text-lg font-black text-orange-600 dark:text-orange-400 tracking-wider break-all px-4 py-2 select-all text-center sm:text-left w-full">
                  {modKey}
                </code>
                <button
                  onClick={handleCopy}
                  className={`w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all ${copied
                    ? 'bg-emerald-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.4)]'
                    : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:scale-105 shadow-md active:scale-95'
                    }`}
                >
                  {copied ? <><Check className="w-5 h-5" /> Copied!</> : <><Copy className="w-5 h-5" /> Copy Key</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main App Component ---

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [viewKey, setViewKey] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    // Sync with Admin Dashboard local storage
    const fetchTools = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mods');
        if (response.ok) {
          const data = await response.json();
          const mappedTools = data.map(mod => ({
            id: mod.id.toString(),
            name: mod.name,
            icon: Gamepad2, // Fallback icon
            photo: mod.photo, // Dynamic photo attached from admin!
            version: mod.version,
            iconBg: 'bg-gradient-to-br from-orange-400 to-amber-500',
            iconColor: 'text-white',
            status: mod.status,
            apk: mod.apk // Save the apk download URL
          }));
          setTools(mappedTools);
        } else {
          setTools(TOOLS);
        }
      } catch (err) {
        console.error("Failed to load mods from backend:", err);
        setTools(TOOLS);
      }
    }

    fetchTools();

    // Poll the backend every few seconds to reflect lives changes smoothly
    const intervalId = setInterval(fetchTools, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const handleSetView = (view) => {
    setCurrentView(view);
    setViewKey(prev => prev + 1);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${isDarkMode ? 'dark bg-slate-900 text-slate-200' : 'bg-[#f8fafc] text-slate-800'}`}>
      <GlobalStyles />

      {/* --- Slide-Out Sidebar Menu --- */}
      <div
        className={`fixed inset-0 bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div className={`fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-slate-100 dark:border-slate-800 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-400 to-amber-500 rounded-lg flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 text-white fill-current" />
            </div>
            <span className="font-black text-xl text-slate-900 dark:text-white tracking-tight">Menu</span>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all">
            <X className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-3 py-6 custom-scrollbar">
          <button onClick={() => handleSetView('home')} className={`w-full flex items-center gap-4 px-4 py-4 rounded-[20px] font-black transition-all ${currentView === 'home' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/50' : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50'}`}>
            <Home className="w-5 h-5" /> Dashboard
          </button>

          <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-4"></div>
          <div className="px-4 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Available Mods</div>

          {tools.map((tool) => (
            <button key={tool.id} onClick={() => handleSetView(tool.id)} className={`w-full flex items-center gap-4 px-4 py-4 rounded-[20px] font-black transition-all ${currentView === tool.id ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md' : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50'}`}>

              <div className="w-6 h-6 rounded-md overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                {tool.photo ? <img src={tool.photo} alt="" className="w-full h-full object-cover" /> : <tool.icon className={`w-4 h-4 ${currentView === tool.id ? '' : 'text-orange-500'}`} />}
              </div>
              <span className="truncate">{tool.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* --- End Menu --- */}

      <div className="dot-pattern min-h-screen w-full pb-20 overflow-x-hidden flex flex-col relative z-0">

        {/* Animated Header */}
        <header className="sticky top-0 z-50 bg-[#f8fafc]/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 pt-safe px-4 py-3 sm:px-6 transition-colors duration-500">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleSetView('home')}>
              <img
                src="photo_2026-01-30_23-02-30.jpg"
                alt="chheaknarat logo"
                className="w-11 h-11 rounded-[14px] object-cover shadow-[0_4px_15px_rgba(249,115,22,0.3)] group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 border border-orange-200 dark:border-orange-500/30"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=Chheak+Narat&background=f97316&color=fff' }}
              />
              <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                chheaknarat
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                <button onClick={() => setIsDarkMode(false)} className={`p-2 rounded-full transition-all duration-300 ${!isDarkMode ? 'bg-orange-100 text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                  <Sun className={`w-4 h-4 ${!isDarkMode ? 'animate-[spin-slow_4s_linear_infinite]' : ''}`} />
                </button>
                <button onClick={() => setIsDarkMode(true)} className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-slate-700 text-orange-400 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                  <Moon className="w-4 h-4" />
                </button>
              </div>

              <button onClick={() => setIsMenuOpen(true)} className="p-2.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95">
                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </button>
            </div>
          </div>
        </header>

        <main key={viewKey} className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 w-full">
          {currentView === 'home' && <HomeView setView={handleSetView} tools={tools} />}
          {currentView === '1' && <Mod8BallPoolView setView={handleSetView} />}
          {currentView !== 'home' && currentView !== '1' && (
            <GenericModView mod={tools.find(m => m.id === currentView)} setView={handleSetView} />
          )}
        </main>

      </div>
    </div >
  );
}
