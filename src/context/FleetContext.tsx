import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

export interface Driver {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    vehicleId: string;
}

export interface DailyLog {
    id: string;
    driverId: string;
    date: string;
    odometerStart: number;
    odometerEnd: number;
    fuelLiters: number;
    fuelCost: number;
    revenueCash: number;
    revenueDigital: number;
    totalKM?: number;
    efficiency?: number;
    timestamp?: number;
    status?: string;
    lat?: number;
    lng?: number;
}

export interface Vehicle {
    id: string;
    registration: string;
    model: string;
    totalKM: number;
    nextServiceKM: number;
}

interface FleetContextType {
    drivers: Driver[];
    dailyLogs: DailyLog[];
    vehicles: Vehicle[];
    currentDriver: Driver | null;
    loading: boolean;
}

const FleetContext = createContext<FleetContextType | undefined>(undefined);

export function FleetProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [currentDriver, setCurrentDriver] = useState<Driver | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);

        const driversRef = collection(db, 'drivers');
        const unsubscribeDrivers = onSnapshot(driversRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Driver[];
            setDrivers(data);

            const current = data.find((d) => d.email === user.email);
            setCurrentDriver(current || null);
        });

        const logsRef = collection(db, 'daily_logs');
        const unsubscribeLogs = onSnapshot(logsRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as DailyLog[];
            setDailyLogs(data);
        });

        const vehiclesRef = collection(db, 'vehicles');
        const unsubscribeVehicles = onSnapshot(vehiclesRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Vehicle[];
            setVehicles(data);
        });

        setLoading(false);

        return () => {
            unsubscribeDrivers();
            unsubscribeLogs();
            unsubscribeVehicles();
        };
    }, [user]);

    return (
        <FleetContext.Provider value={{ drivers, dailyLogs, vehicles, currentDriver, loading }}>
            {children}
        </FleetContext.Provider>
    );
}

export function useFleet() {
    const context = useContext(FleetContext);
    if (!context) {
        throw new Error('useFleet must be used within FleetProvider');
    }
    return context;
}
