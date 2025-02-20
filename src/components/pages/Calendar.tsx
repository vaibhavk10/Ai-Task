import React from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const Calendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Calendar</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </div>
  );
};

export default Calendar;
