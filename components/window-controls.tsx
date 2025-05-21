"use client"

import { X, Minus, Square } from 'lucide-react'

// Define the electron API type
declare global {
    interface Window {
        electron?: {
            window: {
                minimize: () => void;
                maximize: () => void;
                close: () => void;
            }
        }
    }
}

export function WindowControls() {
    // Check if running in Electron
    const isElectron = typeof window !== 'undefined' && window.electron;

    if (!isElectron) return null;

    return (
        <div className="flex items-center space-x-2 webkit-app-region-no-drag">
            <button
                onClick={() => window.electron?.window.minimize()}
                className="p-1 text-gray-500 hover:bg-gray-200 rounded"
                aria-label="Minimize"
            >
                <Minus className="w-4 h-4" />
            </button>
            <button
                onClick={() => window.electron?.window.maximize()}
                className="p-1 text-gray-500 hover:bg-gray-200 rounded"
                aria-label="Maximize"
            >
                <Square className="w-4 h-4" />
            </button>
            <button
                onClick={() => window.electron?.window.close()}
                className="p-1 text-gray-500 hover:bg-red-200 hover:text-red-500 rounded"
                aria-label="Close"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}