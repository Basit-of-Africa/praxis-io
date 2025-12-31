"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ClientForm, { ClientFormValues } from "@/components/ClientForm";
import { Link } from "react-router-dom";
import { useClientContext } from "@/context/ClientContext";
import ClientSearch from "@/components/ClientSearch";
import DataExport from "@/components/DataExport";

const Clients = () => {
  const { clients, addClient } = useClientContext();
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddClient = (data: ClientFormValues) => {
    addClient(data);
    setIsAddClientDialogOpen(false);
  };

  const filteredClients = clients.filter(client => 
    client.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  // Prepare data for export (remove functions, keep only data)
  const exportData = filteredClients.map(client => ({
    id: client.id,
    fullName: client.fullName,
    email: client.email,
    phone: client.phone,
    address: client.address || "",
    notes: client.notes || ""
  }));

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Clients</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <ClientSearch onSearch={setSearchQuery} />
          <div className="flex gap-2">
            <DataExport 
              data={exportData} 
              filename="clients-export" 
              title="Export Clients" 
            />
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
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Clients</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredClients.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              {searchQuery ? "No clients match your search." : "No clients found. Add your first client!"}
            </p>
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
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        <Link to={`/clients/${client.id}`} className="text-primary hover:underline">
                          {client.fullName}
                        </Link>
                      </TableCell>
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