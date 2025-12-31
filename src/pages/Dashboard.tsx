"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppointmentContext } from "@/context/AppointmentContext";
import { CalendarCheck, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import RecentClients from "@/components/RecentClients";

const Dashboard = () => {
  const { appointments } = useAppointmentContext();
  
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(app => app.status === "completed").length;
  
  // Service statistics for chart
  const serviceStats = appointments.reduce((acc, app) => {
    const serviceName = app.service.name;
    if (!acc[serviceName]) {
      acc[serviceName] = { name: serviceName, count: 0 };
    }
    acc[serviceName].count += 1;
    return acc;
  }, {} as Record<string, { name: string; count: number }>);
  
  const serviceData = Object.values(serviceStats);

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
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAppointments}</div>
            <p className="text-xs text-muted-foreground">Appointments successfully finished</p>
          </CardContent>
        </Card>
        
        <UpcomingAppointments />
        <RecentClients />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Appointments by Service</CardTitle>
          </CardHeader>
          <CardContent>
            {serviceData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No appointment data available.</p>
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