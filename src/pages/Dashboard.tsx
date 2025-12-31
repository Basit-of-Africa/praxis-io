"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppointmentContext } from "@/context/AppointmentContext";
import { format, isFuture } from "date-fns";

const Dashboard = () => {
  const { appointments } = useAppointmentContext();

  const upcomingAppointments = appointments
    .filter(app => isFuture(app.date) && app.status === "booked")
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
          <p className="text-muted-foreground">This is your main dashboard. You can see an overview of your practice here.</p>
        </div>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length === 0 ? (
              <p className="text-muted-foreground">No upcoming appointments.</p>
            ) : (
              <ul className="space-y-3">
                {upcomingAppointments.slice(0, 3).map((app) => (
                  <li key={app.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                    <Link to={`/appointments/${app.id}`} className="block hover:bg-muted/50 -mx-3 px-3 py-2 rounded-md transition-colors">
                      <p className="font-medium">{app.patient.fullName} - {app.service.name}</p>
                      <p className="text-sm text-muted-foreground">{format(app.date, "PPP 'at' p")}</p>
                    </Link>
                  </li>
                ))}
                {upcomingAppointments.length > 3 && (
                  <li className="pt-2">
                    <Link to="/calendar" className="text-primary hover:underline text-sm">
                      View all {upcomingAppointments.length} appointments
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </CardContent>
        </Card>
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Recent Clients</h2>
          <p className="text-muted-foreground">No recent client activity.</p>
        </div>
      </div>

      <div className="mt-8">
        <Link to="/book-appointment">
          <Button size="lg">Book New Appointment</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;