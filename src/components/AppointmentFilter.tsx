"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface AppointmentFilterProps {
  onFilterChange: (filters: { status: string; service: string }) => void;
}

const AppointmentFilter: React.FC<AppointmentFilterProps> = ({ onFilterChange }) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const handleApplyFilters = () => {
    onFilterChange({
      status: statusFilter,
      service: serviceFilter
    });
  };

  const handleResetFilters = () => {
    setStatusFilter("all");
    setServiceFilter("all");
    onFilterChange({
      status: "all",
      service: "all"
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label className="text-sm font-medium mb-1 block">Status</label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <label className="text-sm font-medium mb-1 block">Service</label>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="1">General Consultation</SelectItem>
            <SelectItem value="2">Follow-up Visit</SelectItem>
            <SelectItem value="3">Nutritional Counseling</SelectItem>
            <SelectItem value="4">Physical Therapy Session</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-end space-x-2">
        <Button onClick={handleApplyFilters} className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Apply
        </Button>
        <Button variant="outline" onClick={handleResetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default AppointmentFilter;