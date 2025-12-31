"use client";

import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
          <p className="text-muted-foreground">This is your main dashboard. You can see an overview of your practice here.</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
          <p className="text-muted-foreground">No upcoming appointments for today.</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Recent Clients</h2>
          <p className="text-muted-foreground">No recent client activity.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;