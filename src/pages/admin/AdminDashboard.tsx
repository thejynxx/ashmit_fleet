import React from 'react';
import { RealtimeDashboard } from './RealtimeDashboard';
import { MaintenanceTracker } from './MaintenanceTracker';
import { RevenueAnalytics } from './RevenueAnalytics';
import { Truck, LayoutDashboard, Wrench, TrendingUp, Shield } from 'lucide-react';

interface AdminDashboardProps {
    activePage: 'dashboard' | 'maintenance' | 'analytics';
}

export function AdminDashboard({ activePage }: AdminDashboardProps) {
    const pageConfig = {
        dashboard: {
            title: 'Real-time Dashboard',
            description: 'Monitor your fleet in real-time',
            icon: LayoutDashboard,
            gradient: 'from-electric-blue/20 via-electric-blue/10 to-transparent',
            iconBg: 'bg-electric-blue/10',
            iconColor: 'text-electric-blue',
            glow: 'bg-electric-blue/5'
        },
        maintenance: {
            title: 'Maintenance Overview',
            description: 'Track vehicle health and service schedules',
            icon: Wrench,
            gradient: 'from-warning-yellow/20 via-warning-yellow/10 to-transparent',
            iconBg: 'bg-warning-yellow/10',
            iconColor: 'text-warning-yellow',
            glow: 'bg-warning-yellow/5'
        },
        analytics: {
            title: 'Performance Analytics',
            description: 'Analyze fleet efficiency and revenue metrics',
            icon: TrendingUp,
            gradient: 'from-success-green/20 via-success-green/10 to-transparent',
            iconBg: 'bg-success-green/10',
            iconColor: 'text-success-green',
            glow: 'bg-success-green/5'
        }
    };

    const config = pageConfig[activePage];
    const IconComponent = config.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card/50">
            {/* Top Navigation Bar */}
            <div className="bg-dark-card/30 backdrop-blur-xl border-b border-dark-border/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-gradient-to-br from-electric-blue/20 to-electric-blue/5 rounded-xl flex items-center justify-center shadow-lg shadow-electric-blue/10">
                                <Truck className="w-6 h-6 text-electric-blue" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white tracking-tight">FleetFlow</h1>
                                <p className="text-xs text-gray-500">Fleet Management System</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-dark-card/50 rounded-lg border border-dark-border/50 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-electric-blue" />
                                <span className="text-sm text-gray-400">Admin Portal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Page Hero Section */}
                <div className="mb-10">
                    <div className={`bg-gradient-to-br ${config.gradient} rounded-3xl p-8 relative overflow-hidden border border-dark-border/50 shadow-2xl`}>
                        {/* Animated Background Elements */}
                        <div className={`absolute top-0 right-0 w-96 h-96 ${config.glow} rounded-full blur-3xl opacity-50`} />
                        <div className={`absolute bottom-0 left-0 w-64 h-64 ${config.glow} rounded-full blur-3xl opacity-30`} />

                        {/* Decorative Grid Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="grid grid-cols-12 h-full">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="border-r border-white/20" />
                                ))}
                            </div>
                        </div>

                        <div className="relative flex items-center gap-6">
                            <div className={`w-20 h-20 ${config.iconBg} rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-sm border border-white/10`}>
                                <IconComponent className={`w-10 h-10 ${config.iconColor}`} />
                            </div>

                            <div className="flex-1">
                                <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">{config.title}</h2>
                                <p className="text-lg text-gray-300">{config.description}</p>
                            </div>

                            {/* Stats Badge */}
                            <div className="hidden lg:flex flex-col gap-2">
                                <div className="bg-dark-card/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-dark-border/50">
                                    <p className="text-xs text-gray-400 mb-1">Active Now</p>
                                    <p className="text-2xl font-bold text-white">Live</p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Accent Line */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`} />
                    </div>
                </div>

                {/* Content */}
                <div className="transition-all duration-300">
                    {activePage === 'dashboard' && (
                        <div className="space-y-6">
                            <RealtimeDashboard />
                        </div>
                    )}

                    {activePage === 'maintenance' && (
                        <div className="space-y-6">
                            <MaintenanceTracker />
                        </div>
                    )}

                    {activePage === 'analytics' && (
                        <div className="space-y-6">
                            <RevenueAnalytics />
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-dark-card/20 backdrop-blur-sm border-t border-dark-border/30 mt-20">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Truck className="w-4 h-4" />
                            <span>FleetFlow © 2026 - Fleet Management Platform</span>
                        </div>
                        <div className="flex items-center gap-6 text-gray-500">
                            <span>System Status: <span className="text-success-green font-semibold">Operational</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}