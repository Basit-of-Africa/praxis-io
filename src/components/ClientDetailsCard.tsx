"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Calendar, Users, Shield } from "lucide-react";
import { format } from "date-fns";

interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  emergencyContact?: {
    name?: string;
    phone?: string;
  };
  insurance?: {
    provider?: string;
    policyNumber?: string;
  };
  notes?: string;
}

interface ClientDetailsCardProps {
  client: Client;
}

const ClientDetailsCard: React.FC<ClientDetailsCardProps> = ({ client }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start">
          <User className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="font-medium">{client.fullName}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{client.email}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{client.phone}</p>
          </div>
        </div>
        
        {client.address && (
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{client.address}</p>
            </div>
          </div>
        )}
        
        {client.dateOfBirth && (
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="font-medium">{format(new Date(client.dateOfBirth), "PPP")}</p>
            </div>
          </div>
        )}
        
        {client.gender && (
          <div className="flex items-start">
            <Users className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Gender</p>
              <p className="font-medium capitalize">{client.gender.replace("-", " ")}</p>
            </div>
          </div>
        )}
        
        {client.emergencyContact && (client.emergencyContact.name || client.emergencyContact.phone) && (
          <div className="border-t pt-3 mt-3">
            <h3 className="font-medium mb-2">Emergency Contact</h3>
            {client.emergencyContact.name && (
              <p className="text-sm"><span className="font-medium">Name:</span> {client.emergencyContact.name}</p>
            )}
            {client.emergencyContact.phone && (
              <p className="text-sm"><span className="font-medium">Phone:</span> {client.emergencyContact.phone}</p>
            )}
          </div>
        )}
        
        {client.insurance && (client.insurance.provider || client.insurance.policyNumber) && (
          <div className="border-t pt-3 mt-3">
            <h3 className="font-medium mb-2">Insurance Information</h3>
            {client.insurance.provider && (
              <p className="text-sm"><span className="font-medium">Provider:</span> {client.insurance.provider}</p>
            )}
            {client.insurance.policyNumber && (
              <p className="text-sm"><span className="font-medium">Policy Number:</span> {client.insurance.policyNumber}</p>
            )}
          </div>
        )}
        
        {client.notes && (
          <div className="border-t pt-3 mt-3">
            <h3 className="font-medium mb-2">Notes</h3>
            <p className="text-sm">{client.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientDetailsCard;