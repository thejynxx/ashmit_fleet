import React from 'react';
import { useFleet } from '../../context/FleetContext';
import { AlertTriangle, Wrench, CheckCircle2, Calendar, Gauge } from 'lucide-react';

export function MaintenanceTracker() {
    const { vehicles } = useFleet();

    const checkServiceStatus = (totalKM: number, nextServiceKM: number) => {
        const kmToService = nextServiceKM - totalKM;
        return {
            needsService: kmToService <= 500 && kmToService > 0,
            isOverdue: kmToService <= 0,
            kmToService: Math.max(0, kmToService),
        };
    };

    const alertVehicles = vehicles.filter((vehicle) => {
        const status = checkServiceStatus(vehicle.totalKM, vehicle.nextServiceKM);
        return status.needsService || status.isOverdue;
    });

    const healthyVehicles = vehicles.filter((vehicle) => {
        const status = checkServiceStatus(vehicle.totalKM, vehicle.nextServiceKM);
        return !status.needsService && !status.isOverdue;
    });

    const overdueCount = vehicles.filter((v) => checkServiceStatus(v.totalKM, v.nextServiceKM).isOverdue).length;
    const warningCount = vehicles.filter((v) => {
        const s = checkServiceStatus(v.totalKM, v.nextServiceKM);
        return s.needsService && !s.isOverdue;
    }).length;

    return (
        <div className="space-y-6">
            {/* Status Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-dark-card/50 backdrop-blur border border-dark-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm font-medium">Overdue</span>
                        <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-white">{overdueCount}</p>
                    <p className="text-xs text-gray-500 mt-1">Requires immediate attention</p>
                </div>

                <div className="bg-dark-card/50 backdrop-blur border border-dark-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm font-medium">Service Soon</span>
                        <div className="w-8 h-8 bg-warning-yellow/10 rounded-lg flex items-center justify-center">
                            <Wrench className="w-4 h-4 text-warning-yellow" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-white">{warningCount}</p>
                    <p className="text-xs text-gray-500 mt-1">Within 500 km threshold</p>
                </div>

                <div className="bg-dark-card/50 backdrop-blur border border-dark-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm font-medium">Healthy</span>
                        <div className="w-8 h-8 bg-success-green/10 rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-success-green" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-white">{healthyVehicles.length}</p>
                    <p className="text-xs text-gray-500 mt-1">No action required</p>
                </div>
            </div>

            {/* Alert Vehicles */}
            {alertVehicles.length > 0 && (
                <div className="bg-dark-card/50 backdrop-blur border border-dark-border rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 bg-emergency-orange/10 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-emergency-orange" />
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-semibold">Maintenance Alerts</h3>
                            <p className="text-gray-400 text-sm">{alertVehicles.length} vehicles require attention</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {alertVehicles.map((vehicle) => {
                            const status = checkServiceStatus(vehicle.totalKM, vehicle.nextServiceKM);
                            const progressPercent = Math.min(100, (vehicle.totalKM / vehicle.nextServiceKM) * 100);

                            return (
                                <div
                                    key={vehicle.id}
                                    className={`relative overflow-hidden rounded-xl border transition-all hover:scale-[1.01] ${status.isOverdue
                                        ? 'bg-red-500/5 border-red-500/30 hover:border-red-500/50'
                                        : 'bg-warning-yellow/5 border-warning-yellow/30 hover:border-warning-yellow/50'
                                        }`}
                                >
                                    {/* Progress Bar Background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent">
                                        <div
                                            className={`h-full transition-all ${status.isOverdue ? 'bg-red-500/10' : 'bg-warning-yellow/10'
                                                }`}
                                            style={{ width: `${progressPercent}%` }}
                                        />
                                    </div>

                                    <div className="relative p-5">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${status.isOverdue ? 'bg-red-500/20' : 'bg-warning-yellow/20'
                                                }`}>
                                                <AlertTriangle
                                                    className={`w-6 h-6 ${status.isOverdue ? 'text-red-500' : 'text-warning-yellow'
                                                        }`}
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4 mb-3">
                                                    <div>
                                                        <h4 className="text-white font-semibold text-lg mb-1">
                                                            {vehicle.registration}
                                                        </h4>
                                                        <p className="text-gray-400 text-sm">{vehicle.model}</p>
                                                    </div>
                                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${status.isOverdue
                                                        ? 'bg-red-500/20 text-red-400'
                                                        : 'bg-warning-yellow/20 text-warning-yellow'
                                                        }`}>
                                                        {status.isOverdue ? 'OVERDUE' : 'DUE SOON'}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <Gauge className="w-4 h-4 text-gray-500" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Current Mileage</p>
                                                            <p className="text-sm text-white font-medium">
                                                                {vehicle.totalKM.toLocaleString()} km
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-gray-500" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Next Service</p>
                                                            <p className="text-sm text-white font-medium">
                                                                {vehicle.nextServiceKM.toLocaleString()} km
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-2 bg-dark-bg/50 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full transition-all ${status.isOverdue
                                                                ? 'bg-gradient-to-r from-red-500 to-red-600'
                                                                : 'bg-gradient-to-r from-warning-yellow to-yellow-500'
                                                                }`}
                                                            style={{ width: `${Math.min(100, progressPercent)}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-sm font-semibold ${status.isOverdue ? 'text-red-400' : 'text-warning-yellow'
                                                        }`}>
                                                        {status.isOverdue
                                                            ? 'Service Now'
                                                            : `${status.kmToService} km`
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* All Clear State */}
            {alertVehicles.length === 0 && (
                <div className="bg-dark-card/50 backdrop-blur border border-dark-border rounded-xl p-12">
                    <div className="text-center max-w-md mx-auto">
                        <div className="w-16 h-16 bg-success-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-success-green" />
                        </div>
                        <h3 className="text-white text-xl font-semibold mb-2">All Systems Healthy</h3>
                        <p className="text-gray-400">
                            All vehicles are on track with their maintenance schedules. No immediate action required.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}