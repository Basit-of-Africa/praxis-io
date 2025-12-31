"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppointmentContext } from "@/context/AppointmentContext";
import { useClientContext } from "@/context/ClientContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { format } from "date-fns";
import AppointmentStats from "@/components/AppointmentStats";
import ClientStats from "@/components/ClientStats";

const Reports = () => {
  const { appointments } = useAppointmentContext();
  const { clients } = useClientContext();
  
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
  
  // Status statistics for pie chart
  const statusStats = appointments.reduce((acc, app) => {
    if (!acc[app.status]) {
      acc[app.status] = { name: app.status, value: 0 };
    }
    acc[app.status].value += 1;
    return acc;
  }, {} as Record<string, { name: string; value: number }>);
  
  const statusData = Object.values(statusStats);
  
  // Monthly appointments
  const monthlyAppointments = appointments.reduce((acc, app) => {
    const month = format(new Date(app.date), "MMM yyyy");
    if (!acc[month]) {
      acc[month] = { name: month, count: 0 };
    }
    acc[month].count += 1;
    return acc;
  }, {} as Record<string, { name: string; count: number }>);
  
  const monthlyData = Object.values(monthlyAppointments);
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>
      
      <AppointmentStats />
      <ClientStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
        
        <Card>
          <CardHeader>
            <CardTitle>Appointment Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {statusData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No appointment data available.</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
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
    </div>
  );
};

export default Reports;