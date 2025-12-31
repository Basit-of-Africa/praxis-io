"use client";

import React, { useState } from "react";
import ServiceSelection from "@/components/ServiceSelection";
import AppointmentDatePicker from "@/components/AppointmentDatePicker";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";
import { format } from "date-fns";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

const BookAppointment = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleBookAppointment = () => {
    if (!selectedService) {
      showError("Please select a service.");
      return;
    }
    if (!selectedDate) {
      showError("Please select a date.");
      return;
    }

    // In a real application, you would send this data to a backend
    console.log("Booking details:", {
      service: selectedService,
      date: selectedDate.toISOString().split('T')[0], // Format date for display/API
    });
    showSuccess(`Appointment for ${selectedService.name} on ${format(selectedDate, "PPP")} booked successfully! (Mock)`);
    // Reset form
    setSelectedService(null);
    setSelectedDate(undefined);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Book New Appointment</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Select a Service</h2>
        <ServiceSelection
          selectedService={selectedService}
          onServiceSelect={setSelectedService}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Select a Date</h2>
        <AppointmentDatePicker
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>

      <Button
        onClick={handleBookAppointment}
        className="w-full md:w-auto"
        disabled={!selectedService || !selectedDate}
      >
        Proceed to Booking Form
      </Button>
    </div>
  );
};

export default BookAppointment;