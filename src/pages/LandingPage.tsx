import React, { useState } from 'react';
import { Truck, BarChart3, LogIn } from 'lucide-react';
import { AuthModal } from '../components/AuthModal';

type AuthMode = 'driver' | 'admin' | null;

export function LandingPage() {
    const [authMode, setAuthMode] = useState<AuthMode>(null);

    return (
        <>
            {authMode ? (
                <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card">
                    <div className="max-w-7xl mx-auto px-4 py-20 sm:py-32">
                        <div className="text-center mb-16">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Truck className="w-8 h-8 text-electric-blue" />
                                <h1 className="text-4xl sm:text-5xl font-bold text-white">FleetFlow</h1>
                            </div>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Real-time cab fleet management system. Track drivers, monitor vehicles, and maximize efficiency.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                            <button
                                onClick={() => setAuthMode('driver')}
                                className="group relative bg-dark-card border border-dark-border rounded-xl p-8 hover:border-electric-blue transition duration-300 hover:shadow-lg hover:shadow-electric-blue/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/0 to-electric-blue/5 rounded-xl opacity-0 group-hover:opacity-100 transition" />
                                <div className="relative">
                                    <div className="w-12 h-12 bg-electric-blue bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                                        <Truck className="w-6 h-6 text-electric-blue" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2 text-left">Driver Login</h2>
                                    <p className="text-gray-400 text-sm mb-6 text-left">
                                        Clock in, log daily trips, and track fuel efficiency
                                    </p>
                                    <div className="flex items-center gap-2 text-electric-blue group-hover:gap-3 transition">
                                        <span className="font-semibold">Get Started</span>
                                        <LogIn className="w-4 h-4" />
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => setAuthMode('admin')}
                                className="group relative bg-dark-card border border-dark-border rounded-xl p-8 hover:border-emergency-orange transition duration-300 hover:shadow-lg hover:shadow-emergency-orange/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emergency-orange/0 to-emergency-orange/5 rounded-xl opacity-0 group-hover:opacity-100 transition" />
                                <div className="relative">
                                    <div className="w-12 h-12 bg-emergency-orange bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                                        <BarChart3 className="w-6 h-6 text-emergency-orange" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2 text-left">Fleet Manager</h2>
                                    <p className="text-gray-400 text-sm mb-6 text-left">
                                        Monitor fleet, maintenance tracking, and analytics
                                    </p>
                                    <div className="flex items-center gap-2 text-emergency-orange group-hover:gap-3 transition">
                                        <span className="font-semibold">View Dashboard</span>
                                        <LogIn className="w-4 h-4" />
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div className="bg-dark-card border border-dark-border rounded-lg p-6 max-w-2xl mx-auto">
                            <p className="text-gray-400 text-sm text-center">
                                Demo credentials will be provided. Contact your fleet administrator for access.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
