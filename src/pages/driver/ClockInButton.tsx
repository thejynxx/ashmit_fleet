import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';

interface ClockInButtonProps {
    checklistComplete: boolean;
}

export function ClockInButton({ checklistComplete }: ClockInButtonProps) {
    const { user } = useAuth();
    const [isSliding, setIsSliding] = useState(false);
    const [clockedIn, setClockedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSlideComplete = async () => {
        if (!checklistComplete || !user) return;

        setLoading(true);
        try {
            await addDoc(collection(db, 'daily_logs'), {
                driverId: user.uid,
                timestamp: serverTimestamp(),
                status: 'active',
                lat: 0,
                lng: 0,
            });
            setClockedIn(true);
            setIsSliding(false);
        } catch (error) {
            console.error('Clock-in failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMouseUp = () => {
        if (isSliding) {
            handleSlideComplete();
        }
        setIsSliding(false);
    };

    if (clockedIn) {
        return (
            <div className="bg-electric-blue bg-opacity-20 border border-electric-blue rounded-lg p-4 text-center">
                <p className="text-electric-blue font-semibold">You are clocked in</p>
            </div>
        );
    }

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
            <div className="mb-4">
                <h3 className="text-white text-lg font-semibold">Clock In</h3>
                {!checklistComplete && (
                    <p className="text-emergency-orange text-sm mt-1">Complete checklist first</p>
                )}
            </div>
            <button
                onMouseDown={() => checklistComplete && setIsSliding(true)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                disabled={!checklistComplete || loading}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed ${isSliding
                    ? 'bg-electric-blue text-dark-bg'
                    : 'bg-electric-blue text-white hover:bg-blue-600'
                    }`}
            >
                <LogIn className="w-5 h-5" />
                {loading ? 'Clocking in...' : 'Slide to Clock In'}
            </button>
            <p className="text-gray-400 text-sm mt-2 text-center">Hold and drag to complete</p>
        </div>
    );
}
