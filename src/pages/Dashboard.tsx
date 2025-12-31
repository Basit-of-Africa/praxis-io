"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppointmentContext } from "@/context/AppointmentContext";
import { useClientContext } from "@/context/ClientContext"; // Import useClientContext
import { format, isFuture, isPast } from "date-fns";
import { Users, CalendarCheck, CalendarClock, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const { appointments } = useAppointmentContext();
  const { clients } = useClientContext(); // Get clients from context

  const totalAppointments = appointments.length;
  const upcomingAppointments = appointments
    .filter(app => isFuture(app.date) && app.status === "booked")
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  const completedAppointments = appointments.filter(app => app.status === "completed").length;

  // Sort clients by ID (assuming ID is timestamp-based for recency)
  const recentClients = [...clients]
    .sort((a, b) => parseInt(b.id.replace('cl', '')) - parseInt(a.id.replace('cl', '')))
    .slice(0, 3); // Show up to 3 recent clients

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground">All appointments recorded</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Appointments in the future</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAppointments}</div>
            <p className="text-xs text-muted-foreground">Appointments successfully finished</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">Registered clients</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
          </CardHeader>
          <CardContent>
            {recentClients.length === 0 ? (
              <p className="text-muted-foreground">No clients added yet.</p>
            ) : (
              <ul className="space-y-3">
                {recentClients.map((client) => (
                  <li key={client.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                    <Link to={`/clients/${client.id}`} className="block hover:bg-muted/50 -mx-3 px-3 py-2 rounded-md transition-colors">
                      <p className="font-medium">{client.fullName}</p>
                      <p className="text-sm text-muted-foreground">{client.email}</p>
                    </Link>
                  </li>
                ))}
                {clients.length > 3 && (
                  <li className="pt-2">
                    <Link to="/clients" className="text-primary hover:underline text-sm">
                      View all {clients.length} clients
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Link to="/book-appointment">
          <Button size="lg">Book New Appointment</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;