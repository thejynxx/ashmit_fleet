import React from 'react';
import { LogOut, BarChart3, Wrench, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminSidebarProps {
    activePage: 'dashboard' | 'maintenance' | 'analytics';
    onPageChange: (page: 'dashboard' | 'maintenance' | 'analytics') => void;
}

export function AdminSidebar({ activePage, onPageChange }: AdminSidebarProps) {
    const { logout } = useAuth();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-card border-r border-dark-border p-6 flex flex-col">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">FleetFlow</h1>
                <p className="text-gray-400 text-sm">Admin Portal</p>
            </div>

            <nav className="space-y-2 flex-1">
                <button
                    onClick={() => onPageChange('dashboard')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activePage === 'dashboard'
                        ? 'bg-electric-blue bg-opacity-20 text-electric-blue'
                        : 'text-gray-300 hover:bg-dark-bg'
                        }`}
                >
                    <Activity className="w-5 h-5" />
                    <span>Dashboard</span>
                </button>

                <button
                    onClick={() => onPageChange('maintenance')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activePage === 'maintenance'
                        ? 'bg-emergency-orange bg-opacity-20 text-emergency-orange'
                        : 'text-gray-300 hover:bg-dark-bg'
                        }`}
                >
                    <Wrench className="w-5 h-5" />
                    <span>Maintenance</span>
                </button>

                <button
                    onClick={() => onPageChange('analytics')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activePage === 'analytics'
                        ? 'bg-electric-blue bg-opacity-20 text-electric-blue'
                        : 'text-gray-300 hover:bg-dark-bg'
                        }`}
                >
                    <BarChart3 className="w-5 h-5" />
                    <span>Analytics</span>
                </button>
            </nav>

            <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-dark-bg transition"
            >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
            </button>
        </aside>
    );
}
