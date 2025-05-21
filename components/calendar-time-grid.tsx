export function CalendarTimeGrid() {
  // Generate time slots from 7 AM to 8 PM
  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 7 // Start from 7 AM
    const amPm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour > 12 ? hour - 12 : hour
    return `${hour12} ${amPm}`
  })

  return (
    <div className="relative">
      {/* Time labels */}
      <div className="relative z-10">
        {timeSlots.map((time, index) => (
          <div key={index} className="flex items-start h-[60px]">
            <div className="w-[60px] pr-2 text-right text-xs text-gray-500">{time}</div>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
        ))}
      </div>

      {/* Half-hour markers */}
      <div className="absolute top-0 left-0 right-0 z-0">
        {timeSlots.map((_, index) => (
          <div key={`half-${index}`} className="relative h-[60px]">
            <div className="absolute top-[30px] left-[60px] right-0 border-t border-gray-100"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
