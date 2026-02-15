import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, User, IndianRupee } from 'lucide-react';

export function DailyLogForm() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        driverName: '',
        odometerStart: '',
        odometerEnd: '',
        fuelLiters: '',
        fuelCost: '',
        revenueCash: '',
        revenueDigital: '',
    });

    const totalKM = formData.odometerEnd && formData.odometerStart
        ? parseInt(formData.odometerEnd) - parseInt(formData.odometerStart)
        : 0;

    const efficiency = totalKM && formData.fuelLiters
        ? (totalKM / parseFloat(formData.fuelLiters)).toFixed(2)
        : 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setError('');
        setLoading(true);

        try {
            await addDoc(collection(db, 'daily_logs'), {
                driverId: user.uid,
                driverName: formData.driverName,
                date: new Date().toISOString().split('T')[0],
                odometerStart: parseInt(formData.odometerStart),
                odometerEnd: parseInt(formData.odometerEnd),
                fuelLiters: parseFloat(formData.fuelLiters),
                fuelCost: parseFloat(formData.fuelCost),
                revenueCash: parseFloat(formData.revenueCash),
                revenueDigital: parseFloat(formData.revenueDigital),
                totalKM,
                efficiency: parseFloat(efficiency as string),
                timestamp: serverTimestamp(),
                status: 'active'
            });

            setFormData({
                driverName: '',
                odometerStart: '',
                odometerEnd: '',
                fuelLiters: '',
                fuelCost: '',
                revenueCash: '',
                revenueDigital: '',
            });
        } catch (err) {
            setError('Failed to save log');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-4 text-center">Record Daily Trip</h3>

            {error && (
                <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-200 text-sm">{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1">Driver Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            name="driverName"
                            value={formData.driverName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                            className="w-full bg-dark-bg border border-dark-border rounded-lg pl-10 pr-3 py-2 text-white outline-none focus:border-electric-blue"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-dark-border/50 pt-4">
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Fuel Details</h4>
                        <div>
                            <label className="block text-gray-400 text-xs mb-1">Liters</label>
                            <input
                                type="number"
                                step="0.01"
                                name="fuelLiters"
                                value={formData.fuelLiters}
                                onChange={handleChange}
                                required
                                className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs mb-1">Cost (₹)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="fuelCost"
                                value={formData.fuelCost}
                                onChange={handleChange}
                                required
                                className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 border-l border-dark-border/50 pl-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Revenue</h4>
                        <div>
                            <label className="block text-gray-400 text-xs mb-1">Cash (₹)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="revenueCash"
                                value={formData.revenueCash}
                                onChange={handleChange}
                                required
                                className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs mb-1">Digital (₹)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="revenueDigital"
                                value={formData.revenueDigital}
                                onChange={handleChange}
                                required
                                className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-white"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-electric-blue text-white rounded-xl font-bold hover:bg-blue-600 transition disabled:opacity-50 mt-4 shadow-lg shadow-electric-blue/20"
                >
                    {loading ? 'Processing...' : 'Submit Daily Log'}
                </button>
            </form>
        </div>
    );
}