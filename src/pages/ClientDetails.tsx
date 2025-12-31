"use client";

import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// This is a placeholder for fetching client data.
// In a real application, you would fetch this from a backend.
const mockClients = [
  {
    id: "cl1",
    fullName: "Alice Smith",
    email: "alice.smith@example.com",
    phone: "123-456-7890",
    address: "101 Oak Ave",
    notes: "Regular patient, prefers morning appointments.",
  },
  {
    id: "cl2",
    fullName: "Bob Johnson",
    email: "bob.j@example.com",
    phone: "098-765-4321",
    address: "202 Pine St",
    notes: "New patient, referred by Dr. Lee.",
  },
];

const ClientDetails = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const client = mockClients.find((c) => c.id === clientId);

  if (!client) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Client Not Found</h1>
        <p className="text-muted-foreground mb-6">The client you are looking for does not exist.</p>
        <Link to="/clients">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Clients
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center mb-6">
        <Link to="/clients">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Clients</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{client.fullName}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
            <p><strong>Address:</strong> {client.address || "N/A"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{client.notes || "No additional notes."}</p>
          </CardContent>
        </Card>
      </div>

      {/* Future sections like Appointments, Medical History can go here */}
    </div>
  );
};

export default ClientDetails;