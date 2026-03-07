import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, Gamepad2, Users, Settings, LogOut,
    Search, Bell, Sun, Moon, Plus, MoreVertical, Edit,
    Trash2, TrendingUp, Download, Eye, ShieldAlert, CheckCircle2,
    Menu, X, UploadCloud, Activity, Zap, ImagePlus
} from 'lucide-react';

// --- Global CSS & Custom Animations ---
const GlobalStyles = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
    @keyframes slideUpFade {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
   
    .animate-slide-up {
      animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .dark .glass-panel {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
    .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #475569; }
   
    .gradient-text {
      background: linear-gradient(to right, #f97316, #fbbf24);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `}} />
);

// --- Mock Data ---
const STATS = [
    { id: 1, title: 'Total Downloads', value: '2.4M', trend: '+14.5%', isUp: true, icon: Download, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { id: 2, title: 'Active Mods', value: '48', trend: '+2', isUp: true, icon: Gamepad2, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { id: 3, title: 'Registered Users', value: '142.5K', trend: '+5.2%', isUp: true, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { id: 4, title: 'Server Load', value: '42%', trend: '-5%', isUp: false, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
];

const INITIAL_MODS = [
    { id: 1, name: '8 Ball Pool MVP', version: 'v5.12.2', status: 'Active', downloads: '45.2K', date: '2 hours ago' },
    { id: 2, name: 'Subway Surfers Max', version: 'v3.18.0', status: 'Active', downloads: '12.8K', date: '5 hours ago' },
    { id: 3, name: 'Clash of Clans TX', version: 'v15.83.6', status: 'Needs Update', downloads: '89.1K', date: '1 day ago' },
    { id: 4, name: 'Roblox Executor', version: 'v2.600', status: 'Active', downloads: '210.5K', date: '2 days ago' },
    { id: 5, name: 'Spotify Premium Mod', version: 'v8.8.4', status: 'Offline', downloads: '500K+', date: '1 week ago' },
];

// --- Sub-components ---

const StatCard = ({ stat, index }) => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
        <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <span className={`flex items-center text-sm font-bold ${stat.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.isUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1 transform rotate-180" />}
                {stat.trend}
            </span>
        </div>
        <div>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">{stat.title}</h3>
            <p className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">{stat.value}</p>
        </div>
    </div>
);

// --- Views ---

const OverviewView = ({ mods }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => <StatCard key={stat.id} stat={stat} index={i} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
            {/* Main Table Area */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                    <h2 className="text-lg font-black text-slate-800 dark:text-white">Recent Uploads</h2>
                    <button className="text-orange-500 hover:text-orange-600 text-sm font-bold flex items-center">
                        View All <Eye className="w-4 h-4 ml-1" />
                    </button>
                </div>
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
                                <th className="p-4">Mod Name</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Downloads</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {mods.slice(0, 5).map((mod) => (
                                <tr key={mod.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group">
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                                            {mod.photo ? <img src={mod.photo} alt={mod.name} className="w-full h-full object-cover" /> : <Gamepad2 className="w-5 h-5 text-slate-400" />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800 dark:text-slate-200">{mod.name}</div>
                                            <div className="text-xs text-slate-500">{mod.version} • {mod.date}</div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${mod.status === 'Active' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                            mod.status === 'Needs Update' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                                                'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                                            }`}>
                                            {mod.status === 'Active' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                            {mod.status === 'Needs Update' && <ShieldAlert className="w-3 h-3 mr-1" />}
                                            {mod.status === 'Offline' && <X className="w-3 h-3 mr-1" />}
                                            {mod.status}
                                        </span>
                                    </td>
                                    <td className="p-4 font-medium text-slate-600 dark:text-slate-300">{mod.downloads}</td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-orange-500 transition-colors">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Side Panel Area */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg border border-slate-700 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                        <Zap className="w-6 h-6 text-amber-400" />
                    </div>
                    <h2 className="text-xl font-black mb-2">System Status: Optimal</h2>
                    <p className="text-slate-400 text-sm font-medium mb-6">All download mirrors are currently online and serving files at maximum bandwidth.</p>

                    <div className="space-y-4">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5 backdrop-blur-sm">
                            <div className="flex justify-between text-sm font-bold mb-2">
                                <span className="text-slate-300">Storage Usage</span>
                                <span className="text-amber-400">78%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-orange-400 to-amber-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5 backdrop-blur-sm">
                            <div className="flex justify-between text-sm font-bold mb-2">
                                <span className="text-slate-300">API Requests</span>
                                <span className="text-emerald-400">1.2M / 2M</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ManageModsView = ({ mods, setMods }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({ name: '', version: '', status: 'Active' });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [apkName, setApkName] = useState(null);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleApkUpload = (e) => {
        const file = e.target.files[0];
        if (file) setApkName(file.name);
    }

    const handleSave = async () => {
        if (!formData.name) return;
        setIsUploading(true);

        const uploadData = new FormData();
        uploadData.append('name', formData.name);
        uploadData.append('version', formData.version || 'v1.0.0');
        uploadData.append('status', formData.status);

        const photoFile = document.getElementById('photo-upload').files[0];
        if (photoFile) uploadData.append('photo', photoFile);

        const apkFile = document.getElementById('apk-upload').files[0];
        if (apkFile) uploadData.append('apk', apkFile);

        try {
            const response = await fetch('http://localhost:5000/api/mods', {
                method: 'POST',
                body: uploadData,
            });
            const result = await response.json();

            if (response.ok) {
                setMods([result.mod, ...mods]);
                setIsModalOpen(false);
                setFormData({ name: '', version: '', status: 'Active' });
                setPhotoPreview(null);
                setApkName(null);
            } else {
                alert(result.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            alert('Failed to connect to backend server');
        } finally {
            setIsUploading(false);
        }
    };

    const deleteMod = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/mods/${id}`, { method: 'DELETE' });
            setMods(mods.filter(m => m.id !== id));
        } catch (error) {
            console.error('Delete Error:', error);
        }
    }

    return (
        <div className="animate-fade-in">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white">Mod Library</h1>
                    <p className="text-sm font-bold text-slate-500">Manage your uploaded mods, versions, and keys.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search mods..."
                            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white"
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" /> Add Mod
                    </button>
                </div>
            </div>

            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mods.map((mod, i) => (
                    <div key={mod.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 animate-slide-up relative group" style={{ animationDelay: `${(i % 10) * 100}ms` }}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900/50 text-orange-500 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700/50">
                                {mod.photo ? <img src={mod.photo} alt={mod.name} className="w-full h-full object-cover" /> : <Gamepad2 className="w-6 h-6" />}
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${mod.status === 'Active' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' :
                                mod.status === 'Needs Update' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                                    'bg-rose-100 text-rose-600 dark:bg-rose-900/30'
                                }`}>
                                {mod.status}
                            </span>
                        </div>
                        <h3 className="text-lg font-black text-slate-800 dark:text-white mb-1">{mod.name}</h3>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
                            <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{mod.version}</span>
                            <span>•</span>
                            <span>{mod.downloads} DLs</span>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                            <button className="flex-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                                <Edit className="w-4 h-4" /> Edit
                            </button>
                            <button onClick={() => deleteMod(mod.id)} className="p-2 bg-slate-50 hover:bg-rose-50 dark:bg-slate-700/50 dark:hover:bg-rose-900/30 text-slate-400 hover:text-rose-500 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Fake Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in custom-scrollbar overflow-y-auto">
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl p-6 relative z-10 shadow-2xl border border-slate-200 dark:border-slate-700 animate-slide-up my-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-slate-800 dark:text-white">Upload New Mod</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Photo Upload Section */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">App Icon / Photo</label>
                                <label className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-orange-500 transition-colors">
                                    <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                        {photoPreview ? <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" /> : <ImagePlus className="w-6 h-6 text-slate-400" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-slate-800 dark:text-white">Click to upload photo</p>
                                        <p className="text-xs text-slate-500">Square image recommended</p>
                                    </div>
                                    <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Mod Name</label>
                                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:border-orange-500 text-slate-800 dark:text-white" placeholder="e.g. 8 Ball Pool Mod" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Version</label>
                                    <input value={formData.version} onChange={e => setFormData({ ...formData, version: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:border-orange-500 text-slate-800 dark:text-white" placeholder="v1.0.0" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Status</label>
                                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:border-orange-500 text-slate-800 dark:text-white appearance-none">
                                        <option>Active</option>
                                        <option>Testing</option>
                                        <option>Offline</option>
                                    </select>
                                </div>
                            </div>

                            <label className="block border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group">
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    {apkName ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <UploadCloud className="w-6 h-6" />}
                                </div>
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                    {apkName ? apkName : 'Click to upload APK'}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">Max file size: 500MB</p>
                                <input id="apk-upload" type="file" accept=".apk, .zip" className="hidden" onChange={handleApkUpload} />
                            </label>

                            <button
                                onClick={handleSave}
                                disabled={!formData.name || isUploading}
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 disabled:opacity-50 text-white font-black py-3 rounded-xl mt-4 hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-[0.98]"
                            >
                                {isUploading ? 'Uploading...' : 'Save & Publish'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


// --- Main App Component ---

export default function AdminApp() {
    const [isDarkMode, setIsDarkMode] = useState(true); // Default dark for admin feel
    const [currentView, setCurrentView] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Global State for mods to sync with localstorage
    const [mods, setMods] = useState([]);

    useEffect(() => {
        // Fetch mods from real backend
        const fetchMods = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/mods');
                if (response.ok) {
                    const data = await response.json();
                    setMods(data);
                }
            } catch (err) {
                console.error("Failed to fetch mods from backend:", err);
            }
        };
        fetchMods();
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const navItems = [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'mods', label: 'Manage Mods', icon: Gamepad2 },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
            <GlobalStyles />

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
                <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-black text-lg tracking-tight">Admin<span className="text-orange-500">Portal</span></span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</div>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setCurrentView(item.id); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all ${currentView === item.id
                                ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-900/10 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:ml-64 flex flex-col min-h-screen">

                {/* Top Header */}
                <header className="h-16 glass-panel sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="hidden sm:flex items-center relative">
                            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Quick search..."
                                className="bg-slate-100 dark:bg-slate-800/50 border-none rounded-full py-1.5 pl-9 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50 w-64 text-slate-800 dark:text-white transition-all focus:w-72"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                        <button className="flex items-center gap-2 pl-2">
                            <img
                                src="https://ui-avatars.com/api/?name=Chheak+Narat&background=f97316&color=fff&bold=true"
                                alt="Admin"
                                className="w-8 h-8 rounded-full border-2 border-orange-200 dark:border-orange-500/30"
                            />
                            <span className="text-sm font-bold hidden sm:block">Chheaknarat</span>
                        </button>
                    </div>
                </header>

                {/* Dynamic View Content */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    {currentView === 'overview' && <OverviewView mods={mods} />}
                    {currentView === 'mods' && <ManageModsView mods={mods} setMods={setMods} />}
                    {(currentView === 'users' || currentView === 'settings') && (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-400 animate-fade-in">
                            <Settings className="w-12 h-12 mb-4 opacity-50" />
                            <h2 className="text-xl font-bold">Module Under Construction</h2>
                            <p className="text-sm">The {currentView} module will be available in the next update.</p>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}
