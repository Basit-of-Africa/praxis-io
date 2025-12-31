"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAppointmentContext } from "@/context/AppointmentContext";
import { format, isFuture } from "date-fns";
import { CalendarClock } from "lucide-react";

const UpcomingAppointments = () => {
  const { appointments } = useAppointmentContext();
  
  const upcomingAppointments = appointments
    .filter(app => isFuture(app.date) && app.status === "booked")
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3); // Show only the next 3 appointments

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
        <CalendarClock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {upcomingAppointments.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No upcoming appointments.</p>
        ) : (
          <ul className="space-y-3">
            {upcomingAppointments.map((app) => (
              <li key={app.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                <Link to={`/appointments/${app.id}`} className="block hover:bg-muted/50 -mx-3 px-3 py-2 rounded-md transition-colors">
                  <p className="font-medium">{app.patient.fullName} - {app.service.name}</p>
                  <p className="text-sm text-muted-foreground">{format(app.date, "PPP 'at' p")}</p>
                </Link>
              </li>
            ))}
            {upcomingAppointments.length > 0 && (
              <li className="pt-2">
                <Link to="/calendar" className="text-primary hover:underline text-sm">
                  View all appointments
                </Link>
              </li>
            )}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;