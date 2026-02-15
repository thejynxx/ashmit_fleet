import React from 'react';
import { LogOut, Truck, FileText, CheckSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DriverNavbarProps {
    activePage: 'dashboard' | 'logs' | 'checklist';
    onPageChange: (page: 'dashboard' | 'logs' | 'checklist') => void;
}

export function DriverNavbar({ activePage, onPageChange }: DriverNavbarProps) {
    const { logout } = useAuth();

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 bg-dark-card border-t border-dark-border">
                <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => onPageChange('dashboard')}
                        className={`flex flex-col items-center gap-1 py-2 px-4 rounded transition ${activePage === 'dashboard'
                            ? 'text-electric-blue'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <Truck className="w-5 h-5" />
                        <span className="text-xs">Dashboard</span>
                    </button>

                    <button
                        onClick={() => onPageChange('logs')}
                        className={`flex flex-col items-center gap-1 py-2 px-4 rounded transition ${activePage === 'logs'
                            ? 'text-electric-blue'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <FileText className="w-5 h-5" />
                        <span className="text-xs">Logs</span>
                    </button>

                    <button
                        onClick={() => onPageChange('checklist')}
                        className={`flex flex-col items-center gap-1 py-2 px-4 rounded transition ${activePage === 'checklist'
                            ? 'text-electric-blue'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <CheckSquare className="w-5 h-5" />
                        <span className="text-xs">Checklist</span>
                    </button>

                    <button
                        onClick={logout}
                        className="flex flex-col items-center gap-1 py-2 px-4 rounded text-gray-400 hover:text-white transition"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-xs">Logout</span>
                    </button>
                </div>
            </nav>
        </>
    );
}
