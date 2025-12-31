"use client";

import React from "react";

const Calendar = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Calendar</h1>
      <div className="bg-card p-6 rounded-lg shadow-sm border">
        <p className="text-muted-foreground">View and manage your schedule.</p>
      </div>
    </div>
  );
};

export default Calendar;