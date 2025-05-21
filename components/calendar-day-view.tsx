"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CalendarEvent } from "@/components/calendar-event"
import { CalendarTimeGrid } from "@/components/calendar-time-grid"

interface Event {
    id: string
    name: string
    startTime: Date
    endTime: Date
    color: string
    location: string
}

interface CalendarDayViewProps {
    events: Event[]
}

export function CalendarDayView({ events }: CalendarDayViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date())

    const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    const handlePrevDay = () => {
        const prevDay = new Date(currentDate)
        prevDay.setDate(prevDay.getDate() - 1)
        setCurrentDate(prevDay)
    }

    const handleNextDay = () => {
        const nextDay = new Date(currentDate)
        nextDay.setDate(nextDay.getDate() + 1)
        setCurrentDate(nextDay)
    }

    const handleToday = () => {
        setCurrentDate(new Date())
    }

    // Adjust event times to the current date for display purposes
    const adjustedEvents = events.map((event) => {
        const startTime = new Date(event.startTime)
        const endTime = new Date(event.endTime)

        startTime.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
        endTime.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())

        return {
            ...event,
            startTime,
            endTime,
        }
    })

    return (
        <div className="flex flex-col h-screen">
            {/* Calendar Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-semibold">Calendar</h1>
                    <button onClick={handleToday} className="px-4 py-1 text-sm bg-white border rounded-md hover:bg-gray-50">
                        Today
                    </button>
                    <div className="flex items-center">
                        <button onClick={handlePrevDay} className="p-1 rounded-full hover:bg-gray-100">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={handleNextDay} className="p-1 rounded-full hover:bg-gray-100">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <h2 className="text-xl font-medium">{formattedDate}</h2>
                </div>
            </header>

            {/* Calendar Body */}
            <div className="flex flex-1 overflow-hidden">
                {/* Time Grid with Events */}
                <div className="relative flex-1 overflow-y-auto">
                    <CalendarTimeGrid />

                    {/* Events */}
                    <div className="absolute top-0 left-[60px] right-0">
                        {adjustedEvents.map((event) => (
                            <CalendarEvent key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
