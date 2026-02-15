import React, { useState } from 'react';
import { CheckCircle2, Circle, ClipboardCheck, AlertCircle } from 'lucide-react';

interface ChecklistItem {
    id: string;
    label: string;
    checked: boolean;
    description?: string;
}

interface PreShiftChecklistProps {
    onComplete: (items: ChecklistItem[]) => void;
}

export function PreShiftChecklist({ onComplete }: PreShiftChecklistProps) {
    const [items, setItems] = useState<ChecklistItem[]>([
        { id: 'brakes', label: 'Brakes Inspection', checked: false, description: 'Check brake pads and fluid levels' },
        { id: 'tires', label: 'Tire Condition', checked: false, description: 'Inspect pressure and tread depth' },
        { id: 'oil', label: 'Engine Oil Level', checked: false, description: 'Verify oil level and quality' },
        { id: 'lights', label: 'Lights & Signals', checked: false, description: 'Test all lights and indicators' },
        { id: 'mirrors', label: 'Mirrors & Visibility', checked: false, description: 'Adjust and clean all mirrors' },
        { id: 'fuel', label: 'Fuel Level', checked: false, description: 'Ensure adequate fuel for shift' },
    ]);

    const toggleItem = (id: string) => {
        const updated = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(updated);
    };

    const completedCount = items.filter(item => item.checked).length;
    const totalCount = items.length;
    const progressPercent = (completedCount / totalCount) * 100;
    const allComplete = items.every((item) => item.checked);

    return (
        <div className="bg-gradient-to-br from-dark-card/50 via-dark-card/50 to-dark-card/30 backdrop-blur border border-dark-border rounded-2xl p-8 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-electric-blue/5 rounded-full blur-3xl" />

            <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-electric-blue/10 rounded-xl flex items-center justify-center">
                        <ClipboardCheck className="w-6 h-6 text-electric-blue" />
                    </div>
                    <div>
                        <h3 className="text-white text-2xl font-bold">Pre-Shift Checklist</h3>
                        <p className="text-gray-400 text-sm">Complete all safety checks before starting</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400 font-medium">Progress</span>
                        <span className="text-sm font-bold text-electric-blue">
                            {completedCount} / {totalCount}
                        </span>
                    </div>
                    <div className="h-3 bg-dark-bg/50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-electric-blue to-blue-500 transition-all duration-500 ease-out relative overflow-hidden"
                            style={{ width: `${progressPercent}%` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Warning Banner */}
                {!allComplete && completedCount > 0 && (
                    <div className="mb-6 bg-warning-yellow/10 border border-warning-yellow/30 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-warning-yellow flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-warning-yellow text-sm font-semibold">
                                {totalCount - completedCount} item{totalCount - completedCount !== 1 ? 's' : ''} remaining
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                All safety checks must be completed before starting your shift
                            </p>
                        </div>
                    </div>
                )}

                {/* Checklist Items */}
                <div className="space-y-3 mb-8">
                    {items.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${item.checked
                                ? 'bg-electric-blue/10 border border-electric-blue/30 hover:border-electric-blue/50'
                                : 'bg-dark-bg/50 border border-dark-border hover:border-gray-600 hover:bg-dark-bg/70'
                                }`}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Hover gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/0 to-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative p-4 flex items-start gap-4">
                                {/* Checkbox Icon */}
                                <div className={`flex-shrink-0 transition-all duration-300 ${item.checked ? 'scale-110' : 'scale-100'
                                    }`}>
                                    {item.checked ? (
                                        <div className="w-10 h-10 bg-electric-blue/20 rounded-lg flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-electric-blue" />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-700/30 rounded-lg flex items-center justify-center group-hover:bg-gray-700/50 transition-colors">
                                            <Circle className="w-6 h-6 text-gray-500 group-hover:text-gray-400 transition-colors" />
                                        </div>
                                    )}
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 text-left">
                                    <p className={`font-semibold transition-all ${item.checked
                                        ? 'text-white line-through opacity-70'
                                        : 'text-white'
                                        }`}>
                                        {item.label}
                                    </p>
                                    {item.description && (
                                        <p className={`text-xs mt-1 transition-all ${item.checked
                                            ? 'text-gray-500 line-through'
                                            : 'text-gray-400'
                                            }`}>
                                            {item.description}
                                        </p>
                                    )}
                                </div>

                                {/* Status Badge */}
                                {item.checked && (
                                    <div className="flex-shrink-0">
                                        <span className="px-3 py-1 bg-electric-blue/20 text-electric-blue text-xs font-bold rounded-full border border-electric-blue/30">
                                            DONE
                                        </span>
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Complete Button */}
                <button
                    onClick={() => onComplete(items)}
                    disabled={!allComplete}
                    className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 relative overflow-hidden group ${allComplete
                        ? 'bg-gradient-to-r from-electric-blue to-blue-600 text-white hover:shadow-lg hover:shadow-electric-blue/30 hover:scale-[1.02]'
                        : 'bg-gray-700/30 text-gray-500 cursor-not-allowed border border-dark-border'
                        }`}
                >
                    {allComplete && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    )}
                    <span className="relative flex items-center justify-center gap-2">
                        {allComplete ? (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Complete Checklist & Start Shift
                            </>
                        ) : (
                            <>
                                <Circle className="w-5 h-5" />
                                Complete All Items to Continue
                            </>
                        )}
                    </span>
                </button>

                {/* All Complete Success Message */}
                {allComplete && (
                    <div className="mt-4 bg-success-green/10 border border-success-green/30 rounded-xl p-4 flex items-center gap-3 animate-fadeIn">
                        <div className="w-8 h-8 bg-success-green/20 rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-success-green" />
                        </div>
                        <p className="text-success-green text-sm font-semibold">
                            All safety checks completed! Ready to start your shift.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}