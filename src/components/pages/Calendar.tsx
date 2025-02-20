import React from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Calendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="dark:border-gray-700 dark:text-gray-300"
            >
              Today
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={previousMonth}
              className="dark:border-gray-700 dark:text-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={nextMonth}
              className="dark:border-gray-700 dark:text-gray-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={currentMonth}
            className="w-full rounded-md border-0 dark:bg-gray-800"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4 w-full",
              caption: "flex justify-center pt-1 relative items-center mb-4",
              caption_label: "text-lg font-semibold text-gray-900 dark:text-white",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                buttonVariants({ variant: "outline" }),
                "h-8 w-8 bg-transparent p-0 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-300"
              ),
              table: "w-full border-collapse space-y-1",
              head_row: "flex w-full",
              head_cell: "text-gray-500 dark:text-gray-400 rounded-md w-10 font-normal text-[0.8rem] w-full h-10 flex items-center justify-center",
              row: "flex w-full mt-2",
              cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-full h-10",
              day: cn(
                buttonVariants({ variant: "ghost" }),
                "h-10 w-10 p-0 font-normal hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:opacity-100"
              ),
              day_today: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white",
              day_selected: "bg-indigo-600 text-white hover:bg-indigo-600 hover:text-white focus:bg-indigo-600 focus:text-white dark:bg-indigo-600 dark:text-white",
              day_outside: "text-gray-400 dark:text-gray-500 opacity-50",
              day_disabled: "text-gray-400 dark:text-gray-500",
              day_range_middle: "aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: () => null, // Hide default navigation
              IconRight: () => null, // Hide default navigation
            }}
          />
        </div>
      </div>

      {/* Optional: Events List Section */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Events for {date?.toLocaleDateString()}
        </h3>
        <div className="space-y-3">
          {/* Example events - replace with your actual events */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Team Meeting</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">10:00 AM - 11:00 AM</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Work</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
