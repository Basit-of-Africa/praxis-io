"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ClientForm, { ClientFormValues } from "@/components/ClientForm";
import { showSuccess } from "@/utils/toast";

interface Client extends ClientFormValues {
  id: string;
}

const mockClients: Client[] = [
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

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);

  const handleAddClient = (data: ClientFormValues) => {
    const newClient: Client = {
      id: `cl${clients.length + 1}`, // Simple ID generation
      ...data,
    };
    setClients((prevClients) => [...prevClients, newClient]);
    showSuccess(`Client ${newClient.fullName} added successfully!`);
    setIsAddClientDialogOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Client</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <ClientForm onSubmit={handleAddClient} onCancel={() => setIsAddClientDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Clients</CardTitle>
        </CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No clients found. Add your first client!</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="hidden md:table-cell">Address</TableHead>
                    <TableHead className="hidden lg:table-cell">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.fullName}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell className="hidden md:table-cell">{client.address || "N/A"}</TableCell>
                      <TableCell className="hidden lg:table-cell">{client.notes || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;