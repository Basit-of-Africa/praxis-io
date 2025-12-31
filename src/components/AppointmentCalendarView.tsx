"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useAppointmentContext } from "@/context/AppointmentContext";
import { format, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AppointmentCalendarView = () => {
  const { appointments } = useAppointmentContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get appointments for the current month
  const monthAppointments = appointments.filter(app => {
    const appDate = new Date(app.date);
    return appDate.getMonth() === currentDate.getMonth() && 
           appDate.getFullYear() === currentDate.getFullYear();
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "booked":
        return "default";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Appointment Calendar</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h3>
        </div>
        
        <Calendar
          mode="single"
          selected={currentDate}
          className="rounded-md border"
          classNames={{
            cell: "relative",
            day: "relative"
          }}
          components={{
            Day: ({ date }) => {
              const dayAppointments = monthAppointments.filter(app => 
                isSameDay(new Date(app.date), date)
              );
              
              return (
                <div className="relative h-full w-full p-1">
                  <div className="text-center text-sm">
                    {date.getDate()}
                  </div>
                  {dayAppointments.length > 0 && (
                    <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                      <div className="flex gap-1">
                        {dayAppointments.slice(0, 3).map((app, index) => (
                          <Badge 
                            key={app.id} 
                            variant={getStatusVariant(app.status)} 
                            className="w-2 h-2 p-0 rounded-full"
                          />
                        ))}
                        {dayAppointments.length > 3 && (
                          <Badge 
                            variant="outline" 
                            className="w-2 h-2 p-0 rounded-full"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          }}
        />
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Legend</h4>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <Badge variant="default" className="w-3 h-3 p-0 rounded-full mr-2" />
              <span className="text-xs">Booked</span>
            </div>
            <div className="flex items-center">
              <Badge variant="secondary" className="w-3 h-3 p-0 rounded-full mr-2" />
              <span className="text-xs">Completed</span>
            </div>
            <div className="flex items-center">
              <Badge variant="destructive" className="w-3 h-3 p-0 rounded-full mr-2" />
              <span className="text-xs">Cancelled</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCalendarView;