"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { showSuccess, showError } from "@/utils/toast";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Appointment {
  id: string;
  service: Service;
  date: Date;
  patient: {
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
  };
  paymentReference?: string;
  status: "booked" | "completed" | "cancelled";
  notes?: string;
  isRecurring?: boolean;
  recurrencePattern?: {
    frequency: "daily" | "weekly" | "monthly";
    endDate?: Date;
  };
}

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointmentData: Omit<Appointment, "id" | "status">) => void;
  updateAppointmentStatus: (appointmentId: string, status: Appointment["status"]) => void;
  updateAppointment: (appointmentId: string, appointmentData: Partial<Appointment>) => void;
  deleteAppointment: (appointmentId: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

const initialMockAppointments: Appointment[] = [
  {
    id: "app1",
    service: {
      id: "1",
      name: "General Consultation",
      description: "A standard consultation",
      price: 50.00
    },
    date: new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from now
    patient: {
      fullName: "Alice Smith",
      email: "alice.smith@example.com",
      phone: "123-456-7890"
    },
    status: "booked",
  },
  {
    id: "app2",
    service: {
      id: "2",
      name: "Follow-up Visit",
      description: "A follow-up appointment",
      price: 30.00
    },
    date: new Date(new Date().setDate(new Date().getDate() - 1)), // 1 day ago
    patient: {
      fullName: "Bob Johnson",
      email: "bob.j@example.com",
      phone: "098-765-4321"
    },
    status: "completed",
  },
];

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialMockAppointments);

  const addAppointment = (appointmentData: Omit<Appointment, "id" | "status">) => {
    const newAppointment: Appointment = {
      id: `app${Date.now()}`,
      status: "booked",
      ...appointmentData,
    };
    
    // If it's a recurring appointment, generate multiple appointments
    if (appointmentData.isRecurring && appointmentData.recurrencePattern) {
      const recurringAppointments: Appointment[] = [];
      const { frequency, endDate } = appointmentData.recurrencePattern;
      let currentDate = new Date(appointmentData.date);
      
      // Generate appointments for the next 3 occurrences or until end date
      for (let i = 0; i < 3; i++) {
        if (endDate && currentDate > endDate) break;
        
        recurringAppointments.push({
          ...newAppointment,
          id: `app${Date.now() + i}`,
          date: new Date(currentDate)
        });
        
        // Calculate next date based on frequency
        switch (frequency) {
          case "daily":
            currentDate.setDate(currentDate.getDate() + 1);
            break;
          case "weekly":
            currentDate.setDate(currentDate.getDate() + 7);
            break;
          case "monthly":
            currentDate.setMonth(currentDate.getMonth() + 1);
            break;
        }
      }
      
      setAppointments((prevAppointments) => [...prevAppointments, ...recurringAppointments]);
      showSuccess(`Recurring appointment for ${newAppointment.patient.fullName} created successfully!`);
    } else {
      setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
      showSuccess(`Appointment for ${newAppointment.patient.fullName} booked successfully!`);
    }
  };

  const updateAppointmentStatus = (appointmentId: string, status: Appointment["status"]) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app.id === appointmentId ? { ...app, status } : app
      )
    );
    showSuccess(`Appointment status updated to ${status}!`);
  };

  const updateAppointment = (appointmentId: string, appointmentData: Partial<Appointment>) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app.id === appointmentId ? { ...app, ...appointmentData } : app
      )
    );
    showSuccess(`Appointment updated successfully!`);
  };

  const deleteAppointment = (appointmentId: string) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((app) => app.id !== appointmentId)
    );
    showSuccess(`Appointment deleted successfully!`);
  };

  return (
    <AppointmentContext.Provider value={{ 
      appointments, 
      addAppointment, 
      updateAppointmentStatus, 
      updateAppointment,
      deleteAppointment
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointmentContext must be used within an AppointmentProvider");
  }
  return context;
};