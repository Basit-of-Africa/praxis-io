"use client";

import React, { useState } from "react";
import ServiceSelection from "@/components/ServiceSelection";
import AppointmentDatePicker from "@/components/AppointmentDatePicker";
import BookingForm from "@/components/BookingForm";
import PaystackPayment from "@/components/PaystackPayment";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";
import { format } from "date-fns";
import { useAppointmentContext } from "@/context/AppointmentContext"; // Import useAppointmentContext

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface BookingDetails {
  service: Service;
  date: Date;
  patient: {
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
  };
}

const BookAppointment = () => {
  const { addAppointment } = useAppointmentContext(); // Use addAppointment from context
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [patientDetails, setPatientDetails] = useState<BookingDetails['patient'] | null>(null);
  const [step, setStep] = useState(1); // 1: Service, 2: Date, 3: Form, 4: Payment

  const handleServiceSelect = (service: Service | null) => {
    setSelectedService(service);
    if (service) setStep(2); // Move to date selection
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) setStep(3); // Move to booking form
  };

  const handleBookingFormSubmit = (data: BookingDetails['patient']) => {
    setPatientDetails(data);
    if (!selectedService || !selectedDate) {
      showError("An unexpected error occurred. Please restart the booking process.");
      setStep(1); // Reset to start
      return;
    }
    setStep(4); // Move to payment step
  };

  const handlePaymentSuccess = (reference: string) => {
    if (!selectedService || !selectedDate || !patientDetails) {
      showError("An unexpected error occurred after payment. Please check your booking history.");
      setStep(1); // Reset to start
      return;
    }

    const newAppointment = {
      service: selectedService,
      date: selectedDate,
      patient: patientDetails,
      paymentReference: reference,
    };

    addAppointment(newAppointment); // Add appointment to context

    // Reset form and go back to step 1
    setSelectedService(null);
    setSelectedDate(undefined);
    setPatientDetails(null);
    setStep(1);
  };

  const handlePaymentClose = () => {
    showError("Payment was not completed. You can try again or go back.");
    // User can stay on step 4 or go back to step 3
  };

  const handleBack = () => {
    setStep(prevStep => Math.max(1, prevStep - 1));
  };

  const currentServicePrice = selectedService ? selectedService.price : 0;
  const amountInKobo = Math.round(currentServicePrice * 100); // Paystack amount is in kobo

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Book New Appointment</h1>

      {step === 1 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Select a Service</h2>
          <ServiceSelection
            selectedService={selectedService}
            onServiceSelect={handleServiceSelect}
          />
          {!selectedService && (
            <p className="text-muted-foreground mt-4">Please select a service to proceed.</p>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Select a Date</h2>
          <AppointmentDatePicker
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
          {!selectedDate && (
            <p className="text-muted-foreground mt-4">Please select a date to proceed.</p>
          )}
          <div className="flex justify-start mt-6">
            <Button variant="outline" onClick={handleBack}>
              Back to Services
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Enter Your Details</h2>
          <BookingForm
            onSubmit={handleBookingFormSubmit}
            onBack={handleBack}
            defaultValues={patientDetails || undefined}
          />
        </div>
      )}

      {step === 4 && selectedService && selectedDate && patientDetails && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Make Payment</h2>
          {import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ? (
            <PaystackPayment
              amount={amountInKobo}
              email={patientDetails.email}
              fullName={patientDetails.fullName}
              onSuccess={handlePaymentSuccess}
              onClose={handlePaymentClose}
            />
          ) : (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert">
              <p className="font-bold">Paystack Public Key Missing</p>
              <p>Please set your <code>VITE_PAYSTACK_PUBLIC_KEY</code> environment variable to enable payments.</p>
            </div>
          )}
          <div className="flex justify-start mt-6">
            <Button variant="outline" onClick={handleBack}>
              Back to Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;