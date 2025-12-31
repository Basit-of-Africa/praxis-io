"use client";

import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle, Calendar as CalendarIcon, User, CreditCard, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAppointmentContext } from "@/context/AppointmentContext";
import { format } from "date-fns";
import { showSuccess, showError } from "@/utils/toast";

const AppointmentDetails = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const { appointments, updateAppointmentStatus } = useAppointmentContext();
  const navigate = useNavigate();

  const appointment = appointments.find((app) => app.id === appointmentId);

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

  const handleUpdateStatus = (status: "completed" | "cancelled") => {
    if (appointmentId) {
      updateAppointmentStatus(appointmentId, status);
      showSuccess(`Appointment status updated to ${status}!`);
    } else {
      showError("Could not update appointment status.");
    }
  };

  if (!appointment) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Appointment Not Found</h1>
        <p className="text-muted-foreground mb-6">The appointment you are looking for does not exist.</p>
        <Link to="/calendar">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Calendar
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/calendar">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Calendar</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Appointment Details</h1>
        </div>
        {appointment.status === "booked" && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleUpdateStatus("completed")}
              className="text-green-600 hover:text-green-700 border-green-600 hover:bg-green-50"
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Mark as Complete
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleUpdateStatus("cancelled")}
              className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-50"
            >
              <XCircle className="h-4 w-4 mr-1" /> Cancel Appointment
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Appointment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Service</p>
                <p className="font-medium">{appointment.service.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium">{format(appointment.date, "PPP 'at' p")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-medium">${appointment.service.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={getStatusVariant(appointment.status)} className="mt-1">
                  {appointment.status}
                </Badge>
              </div>
            </div>
            
            {appointment.paymentReference && (
              <div>
                <p className="text-sm text-muted-foreground">Payment Reference</p>
                <p className="font-medium">{appointment.paymentReference}</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{appointment.patient.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{appointment.patient.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{appointment.patient.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Notes</p>
              <p className="font-medium">{appointment.patient.notes || "N/A"}</p>
            </div>
            <Link to={`/clients/${appointment.patient.email}`} className="text-primary hover:underline text-sm mt-2 block">
              View Client Profile
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Service Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{appointment.service.description}</p>
        </CardContent>
      </Card>
      
      {appointment.status === "completed" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Amount Paid</p>
                <p className="font-medium">${appointment.service.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">Credit Card</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Date</p>
                <p className="font-medium">{format(appointment.date, "PPP")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AppointmentDetails;