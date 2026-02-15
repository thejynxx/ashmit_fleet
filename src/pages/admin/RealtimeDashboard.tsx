import React from 'react';
import { useFleet } from '../../context/FleetContext';
import { Activity } from 'lucide-react';

export function RealtimeDashboard() {
    const { dailyLogs } = useFleet();

    // Show logs where status is active
    const activeDrivers = dailyLogs.filter((log) => log.status === 'active');

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-electric-blue" />
                <h2 className="text-white text-lg font-semibold">Active Drivers</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-dark-border">
                            <th className="text-left py-3 px-2 text-gray-400 font-medium">Driver</th>
                            <th className="text-left py-3 px-2 text-gray-400 font-medium">Odometer</th>
                            <th className="text-left py-3 px-2 text-gray-400 font-medium">Total KM</th>
                            <th className="text-left py-3 px-2 text-gray-400 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeDrivers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-4 px-2 text-gray-400 text-center">
                                    No active drivers
                                </td>
                            </tr>
                        ) : (
                            activeDrivers.map((log) => {
                                return (
                                    <tr key={log.id} className="border-b border-dark-border hover:bg-dark-bg transition">
                                        {/* Displaying driverName from the log entry */}
                                        <td className="py-3 px-2 text-white font-medium">
                                            {log.driverName || 'Unknown Driver'}
                                        </td>
                                        <td className="py-3 px-2 text-gray-300">{log.odometerEnd || '-'}</td>
                                        <td className="py-3 px-2 text-gray-300">{log.totalKM || '0'} km</td>
                                        <td className="py-3 px-2">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-electric-blue bg-opacity-20 text-electric-blue rounded text-xs font-medium">
                                                <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}