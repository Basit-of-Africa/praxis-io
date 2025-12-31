"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "General Consultation",
    description: "A standard consultation with a healthcare professional.",
    price: 50.00,
  },
  {
    id: "2",
    name: "Follow-up Visit",
    description: "A follow-up appointment to review progress or results.",
    price: 30.00,
  },
  {
    id: "3",
    name: "Nutritional Counseling",
    description: "Personalized advice on diet and nutrition.",
    price: 75.00,
  },
  {
    id: "4",
    name: "Physical Therapy Session",
    description: "A session with a licensed physical therapist.",
    price: 100.00,
  },
];

interface ServiceSelectionProps {
  onServiceSelect: (service: Service | null) => void;
  selectedService: Service | null;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onServiceSelect, selectedService }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockServices.map((service) => (
        <Card
          key={service.id}
          className={cn(
            "cursor-pointer hover:border-primary transition-colors",
            selectedService?.id === service.id && "border-primary ring-2 ring-primary",
          )}
          onClick={() => onServiceSelect(service)}
        >
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2">{service.description}</p>
            <p className="text-lg font-semibold">${service.price.toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceSelection;