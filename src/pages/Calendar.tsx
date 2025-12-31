"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppointmentContext } from "@/context/AppointmentContext"; // Import useAppointmentContext
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Calendar = () => {
  const { appointments } = useAppointmentContext(); // Use appointments from context

  const sortedAppointments = [...appointments].sort((a, b) => a.date.getTime() - b.date.getTime());

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

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Calendar</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedAppointments.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No appointments scheduled.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAppointments.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <p className="font-medium">{format(app.date, "PPP")}</p>
                        <p className="text-sm text-muted-foreground">{format(app.date, "p")}</p>
                      </TableCell>
                      <TableCell>{app.patient.fullName}</TableCell>
                      <TableCell>{app.service.name}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(app.status)}>{app.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">${app.service.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;