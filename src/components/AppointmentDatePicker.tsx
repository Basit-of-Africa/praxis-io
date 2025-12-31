"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface AppointmentDatePickerProps {
  onDateSelect: (date: Date | undefined) => void;
  selectedDate: Date | undefined;
}

const AppointmentDatePicker: React.FC<AppointmentDatePickerProps> = ({ onDateSelect, selectedDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Date</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          initialFocus
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
};

export default AppointmentDatePicker;