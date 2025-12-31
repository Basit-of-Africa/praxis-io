"use client";

import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react"; // Import Trash2 icon
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog, // Import AlertDialog components
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ClientForm, { ClientFormValues } from "@/components/ClientForm";
import { useClientContext } from "@/context/ClientContext";

const ClientDetails = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { clients, updateClient, deleteClient } = useClientContext(); // Use deleteClient from context
  const navigate = useNavigate(); // Initialize useNavigate
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const client = clients.find((c) => c.id === clientId);

  const handleEditClient = (data: ClientFormValues) => {
    if (clientId) {
      updateClient(clientId, data);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteClient = () => {
    if (clientId) {
      deleteClient(clientId);
      navigate("/clients"); // Redirect to clients list after deletion
    }
  };

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/clients">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Clients</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{client.fullName}</h1>
        </div>
        <div className="flex gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" /> Edit Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Client Details</DialogTitle>
              </DialogHeader>
              <ClientForm
                onSubmit={handleEditClient}
                onCancel={() => setIsEditDialogOpen(false)}
                defaultValues={client}
              />
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Client
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete {client.fullName}'s record
                  and remove their data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteClient} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
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