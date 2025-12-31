"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppointmentContext } from "@/context/AppointmentContext";
import { format, isSameDay } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppointmentFilter from "@/components/AppointmentFilter";
import DataExport from "@/components/DataExport";

const Calendar = () => {
  const { appointments, updateAppointmentStatus } = useAppointmentContext();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filters, setFilters] = useState({ status: "all", service: "all" });
  const navigate = useNavigate();

  const appointmentsForSelectedDate = selectedDate 
    ? appointments.filter((app) => isSameDay(app.date, selectedDate))
    : [];

  // Apply filters
  const filteredAppointments = appointmentsForSelectedDate.filter(app => {
    const statusMatch = filters.status === "all" || app.status === filters.status;
    const serviceMatch = filters.service === "all" || app.service.id === filters.service;
    return statusMatch && serviceMatch;
  });

  const sortedAppointmentsForSelectedDate = [...filteredAppointments].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

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

  const handleUpdateStatus = (appointmentId: string, status: "completed" | "cancelled") => {
    updateAppointmentStatus(appointmentId, status);
  };

  const handleRowClick = (appointmentId: string) => {
    navigate(`/appointments/${appointmentId}`);
  };

  const handleFilterChange = (newFilters: { status: string; service: string }) => {
    setFilters(newFilters);
  };

  // Prepare data for export
  const exportData = filteredAppointments.map(app => ({
    id: app.id,
    date: format(app.date, "yyyy-MM-dd HH:mm"),
    patientName: app.patient.fullName,
    patientEmail: app.patient.email,
    service: app.service.name,
    price: app.service.price,
    status: app.status,
    paymentReference: app.paymentReference || ""
  }));

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <DataExport 
          data={exportData} 
          filename="appointments-export" 
          title="Export Appointments" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select a Date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ShadcnCalendar 
              mode="single" 
              selected={selectedDate} 
              onSelect={setSelectedDate} 
              initialFocus 
              className="rounded-md border" 
            />
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filter Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentFilter onFilterChange={handleFilterChange} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>
                Appointments for {selectedDate ? format(selectedDate, "PPP") : "No Date Selected"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sortedAppointmentsForSelectedDate.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  {selectedDate 
                    ? `No appointments match your filters for ${format(selectedDate, "PPP")}.` 
                    : "Select a date to view appointments."}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedAppointmentsForSelectedDate.map((app) => (
                        <TableRow 
                          key={app.id} 
                          onClick={() => handleRowClick(app.id)} 
                          className="cursor-pointer hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">{format(app.date, "p")}</TableCell>
                          <TableCell>{app.patient.fullName}</TableCell>
                          <TableCell>{app.service.name}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(app.status)}>{app.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {app.status === "booked" && (
                              <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleUpdateStatus(app.id, "completed")}
                                  className="text-green-600 hover:text-green-700 border-green-600 hover:bg-green-50"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" /> Complete
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleUpdateStatus(app.id, "cancelled")}
                                  className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-50"
                                >
                                  <XCircle className="h-4 w-4 mr-1" /> Cancel
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;