import { CalendarDayView } from "@/components/calendar-day-view"

// Sample event data
const events = [
  {
    id: "1",
    name: "Team Standup",
    startTime: new Date(2023, 5, 15, 9, 0), // 9:00 AM
    endTime: new Date(2023, 5, 15, 9, 30), // 9:30 AM
    color: "#4285F4", // Google Blue
    location: "Meeting Room A",
  },
  {
    id: "2",
    name: "Project Planning",
    startTime: new Date(2023, 5, 15, 10, 0), // 10:00 AM
    endTime: new Date(2023, 5, 15, 11, 30), // 11:30 AM
    color: "#0F9D58", // Google Green
    location: "Conference Room",
  },
  {
    id: "3",
    name: "Lunch with Client",
    startTime: new Date(2023, 5, 15, 12, 0), // 12:00 PM
    endTime: new Date(2023, 5, 15, 13, 30), // 1:30 PM
    color: "#F4B400", // Google Yellow
    location: "Bistro Downtown",
  },
  {
    id: "4",
    name: "Design Review",
    startTime: new Date(2023, 5, 15, 14, 0), // 2:00 PM
    endTime: new Date(2023, 5, 15, 15, 0), // 3:00 PM
    color: "#DB4437", // Google Red
    location: "Design Lab",
  },
  {
    id: "5",
    name: "1:1 with Manager",
    startTime: new Date(2023, 5, 15, 15, 30), // 3:30 PM
    endTime: new Date(2023, 5, 15, 16, 0), // 4:00 PM
    color: "#4285F4", // Google Blue
    location: "Manager's Office",
  },
  {
    id: "6",
    name: "Weekly Wrap-up",
    startTime: new Date(2023, 5, 15, 16, 30), // 4:30 PM
    endTime: new Date(2023, 5, 15, 17, 30), // 5:30 PM
    color: "#0F9D58", // Google Green
    location: "Main Hall",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <CalendarDayView events={events} />
    </main>
  )
}
