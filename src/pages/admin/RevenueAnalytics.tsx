import React from 'react';
import { useFleet } from '../../context/FleetContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IndianRupee } from 'lucide-react';

export function RevenueAnalytics() {
    const { dailyLogs, drivers } = useFleet();

    const driverRevenue = drivers.map((driver) => {
        const driverLogs = dailyLogs.filter((log) => log.driverId === driver.id);
        const totalFuelExpense = driverLogs.reduce((sum, log) => sum + (log.fuelCost || 0), 0);
        const totalRevenue = driverLogs.reduce(
            (sum, log) => sum + (log.revenueCash || 0) + (log.revenueDigital || 0),
            0
        );
        return {
            name: driver.name.split(' ')[0],
            fuel: Math.round(totalFuelExpense),
            revenue: Math.round(totalRevenue),
        };
    });

    const fleetTotals = {
        fuel: Math.round(driverRevenue.reduce((sum, d) => sum + d.fuel, 0)),
        revenue: Math.round(driverRevenue.reduce((sum, d) => sum + d.revenue, 0)),
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-card border border-dark-border rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl" />
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Fuel Expenses</p>
                    <p className="text-white text-3xl font-bold">₹{fleetTotals.fuel.toLocaleString()}</p>
                </div>
                <div className="bg-dark-card border border-dark-border rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl" />
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Revenue</p>
                    <p className="text-white text-3xl font-bold text-success-green">₹{fleetTotals.revenue.toLocaleString()}</p>
                </div>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-electric-blue" />
                    </div>
                    <h2 className="text-white text-lg font-bold">Revenue vs Fuel (per Driver)</h2>
                </div>

                <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={driverRevenue}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                            <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                            <Tooltip
                                cursor={{ fill: '#1F2937' }}
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px' }}
                                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="fuel" fill="#EF4444" radius={[4, 4, 0, 0]} name="Fuel Expense" />
                            <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} name="Revenue" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}