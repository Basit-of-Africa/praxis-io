"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppointmentContext } from "@/context/AppointmentContext";
import { CalendarCheck, CheckCircle, XCircle } from "lucide-react";

const AppointmentStats = () => {
  const { appointments } = useAppointmentContext();
  
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(app => app.status === "completed").length;
  const cancelledAppointments = appointments.filter(app => app.status === "cancelled").length;
  const bookedAppointments = appointments.filter(app => app.status === "booked").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAppointments}</div>
          <p className="text-xs text-muted-foreground">All appointments</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Booked</CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{bookedAppointments}</div>
          <p className="text-xs text-muted-foreground">Upcoming appointments</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedAppointments}</div>
          <p className="text-xs text-muted-foreground">Finished appointments</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{cancelledAppointments}</div>
          <p className="text-xs text-muted-foreground">Cancelled appointments</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentStats;