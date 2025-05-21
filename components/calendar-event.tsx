import { MapPin } from "lucide-react"

interface Event {
  id: string
  name: string
  startTime: Date
  endTime: Date
  color: string
  location: string
}

interface CalendarEventProps {
  event: Event
}

export function CalendarEvent({ event }: CalendarEventProps) {
  // Calculate position and height based on time
  const startHour = event.startTime.getHours() + event.startTime.getMinutes() / 60
  const endHour = event.endTime.getHours() + event.endTime.getMinutes() / 60
  const duration = endHour - startHour

  // Position calculation (7 AM is the start of our grid)
  const topPosition = (startHour - 7) * 60 // 60px per hour
  const height = duration * 60 // 60px per hour

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const timeDisplay = `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`

  return (
    <div
      className="absolute left-0 right-4 px-3 py-1 rounded-md overflow-hidden shadow-sm border-l-4"
      style={{
        top: `${topPosition}px`,
        height: `${height}px`,
        borderLeftColor: event.color,
        backgroundColor: `${event.color}10`, // Very light version of the color
      }}
    >
      <div className="flex flex-col h-full">
        <h3 className="font-medium text-sm truncate">{event.name}</h3>
        <p className="text-xs text-gray-600">{timeDisplay}</p>
        {event.location && (
          <div className="flex items-center mt-auto text-xs text-gray-600">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{event.location}</span>
          </div>
        )}
      </div>
    </div>
  )
}
