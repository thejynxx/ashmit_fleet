import React, { useState } from 'react';
import { PreShiftChecklist } from './PreShiftChecklist';
import { ClockInButton } from './ClockInButton';
import { DailyLogForm } from './DailyLogForm';
import { useAuth } from '../../context/AuthContext';
import { useFleet } from '../../context/FleetContext';
import { Calendar, Gauge, Fuel, IndianRupee, Truck, User, Clock, MapPin } from 'lucide-react';

interface DriverInterfaceProps {
    activePage: 'dashboard' | 'logs' | 'checklist';
}

export function DriverInterface({ activePage }: DriverInterfaceProps) {
    const { user } = useAuth();
    const { dailyLogs } = useFleet();
    const [checklistComplete, setChecklistComplete] = useState(false);

    // Filter logs to only show entries for the current driver's UID
    const myLogs = dailyLogs
        .filter((log) => log.driverId === user?.uid)
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    // Calculate statistics
    const totalKM = myLogs.reduce((sum, log) => sum + (log.totalKM || 0), 0);
    const totalRevenue = myLogs.reduce((sum, log) => sum + (log.revenueCash || 0) + (log.revenueDigital || 0), 0);
    const avgEfficiency = myLogs.length > 0
        ? myLogs.reduce((sum, log) => sum + (log.efficiency || 0), 0) / myLogs.length
        : 0;

    const pageConfig = {
        dashboard: {
            title: 'My Dashboard',
            description: 'Complete checklist and start your shift'
        },
        logs: {
            title: 'Trip History',
            description: 'View your past trips and earnings'
        },
        checklist: {
            title: 'Log Trip',
            description: 'Record your daily trip details'
        }
    };

    const config = pageConfig[activePage];

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card pb-24">
            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                            <Truck className="w-6 h-6 text-electric-blue" />
                        </div>
                        <span className="text-2xl font-bold text-white">FleetFlow</span>
                    </div>

                    {/* User Info Card */}
                    <div className="bg-dark-card/50 backdrop-blur border border-dark-border rounded-2xl p-6 mb-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-electric-blue/5 rounded-full blur-3xl" />

                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-electric-blue/20 to-electric-blue/5 rounded-xl flex items-center justify-center">
                                    <User className="w-7 h-7 text-electric-blue" />
                                </div>
                                <div>
                                    <h2 className="text-white text-xl font-bold mb-1">{config.title}</h2>
                                    <p className="text-gray-400 text-sm">{config.description}</p>
                                </div>
                            </div>
                        </div>

                        {user?.email && (
                            <div className="mt-4 pt-4 border-t border-dark-border/50">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Clock className="w-4 h-4" />
                                    <span>Logged in as: <span className="text-electric-blue font-medium">{user.email}</span></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats Overview - Only on logs page */}
                    {activePage === 'logs' && myLogs.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="bg-dark-card/50 backdrop-blur border border-dark-border rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Gauge className="w-4 h-4 text-electric-blue" />
                                    <span className="text-xs text-gray-400 font-medium">Total Distance</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{totalKM.toLocaleString()}</p>
                                <p className="text-xs text-gray-500 mt-1">kilometers</p>
                            </div>

                            <div className="bg-dark-card/50 backdrop-blur border border-dark-border rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <IndianRupee className="w-4 h-4 text-success-green" />
                                    <span className="text-xs text-gray-400 font-medium">Total Earned</span>
                                </div>
                                <p className="text-2xl font-bold text-white">₹{totalRevenue.toLocaleString()}</p>
                                <p className="text-xs text-gray-500 mt-1">revenue</p>
                            </div>

                            <div className="bg-dark-card/50 backdrop-blur border border-dark-border rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Fuel className="w-4 h-4 text-warning-yellow" />
                                    <span className="text-xs text-gray-400 font-medium">Avg Efficiency</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{avgEfficiency.toFixed(1)}</p>
                                <p className="text-xs text-gray-500 mt-1">km/L</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {activePage === 'dashboard' && (
                        <>
                            <PreShiftChecklist onComplete={() => setChecklistComplete(true)} />
                            <ClockInButton checklistComplete={checklistComplete} />
                        </>
                    )}

                    {activePage === 'logs' && (
                        <div className="space-y-4">
                            {myLogs.length === 0 ? (
                                <div className="bg-dark-card/50 backdrop-blur border border-dark-border rounded-2xl p-16">
                                    <div className="text-center max-w-sm mx-auto">
                                        <div className="w-20 h-20 bg-gray-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <MapPin className="w-10 h-10 text-gray-500" />
                                        </div>
                                        <h3 className="text-white text-2xl font-bold mb-3">No Trips Yet</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            Your trip history will appear here once you complete your first journey.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                myLogs.map((log, index) => (
                                    <div
                                        key={log.id}
                                        className="bg-dark-card/50 backdrop-blur border border-dark-border rounded-2xl p-6 hover:border-electric-blue/30 transition-all hover:shadow-lg hover:shadow-electric-blue/5 relative overflow-hidden group"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/0 to-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="relative">
                                            <div className="flex items-center justify-between mb-5 pb-4 border-b border-dark-border/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                                                        <Calendar className="w-5 h-5 text-electric-blue" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-bold text-lg">{log.date || 'Today'}</p>
                                                        <p className="text-gray-500 text-xs">Trip #{myLogs.length - index}</p>
                                                    </div>
                                                </div>
                                                <div className="px-3 py-1.5 bg-success-green/20 text-success-green text-xs font-bold rounded-lg border border-success-green/30">
                                                    {log.status || 'COMPLETED'}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className="bg-dark-bg/50 rounded-xl p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Gauge className="w-4 h-4 text-gray-500" />
                                                        <span className="text-xs text-gray-500 font-medium">Distance</span>
                                                    </div>
                                                    <p className="text-xl font-bold text-white">{log.totalKM || 0}</p>
                                                    <p className="text-xs text-gray-500">kilometers</p>
                                                </div>

                                                <div className="bg-dark-bg/50 rounded-xl p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Fuel className="w-4 h-4 text-gray-500" />
                                                        <span className="text-xs text-gray-500 font-medium">Efficiency</span>
                                                    </div>
                                                    <p className="text-xl font-bold text-white">{log.efficiency || 0}</p>
                                                    <p className="text-xs text-gray-500">km/L</p>
                                                </div>
                                            </div>

                                            <div className="bg-gradient-to-r from-success-green/10 to-success-green/5 rounded-xl p-4 border border-success-green/20">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-success-green/20 rounded-lg flex items-center justify-center">
                                                            <IndianRupee className="w-5 h-5 text-success-green" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-400 mb-1">Total Revenue</p>
                                                            <p className="text-2xl font-bold text-white">
                                                                ₹{((log.revenueCash || 0) + (log.revenueDigital || 0)).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs text-gray-500 mb-1">Cash: ₹{(log.revenueCash || 0).toLocaleString()}</p>
                                                        <p className="text-xs text-gray-500">Digital: ₹{(log.revenueDigital || 0).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activePage === 'checklist' && <DailyLogForm />}
                </div>
            </div>
        </div>
    );
}