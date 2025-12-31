"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useClientContext } from "@/context/ClientContext";
import { Users } from "lucide-react";

const RecentClients = () => {
  const { clients } = useClientContext();
  
  // Sort clients by ID (assuming ID is timestamp-based for recency)
  const recentClients = [...clients]
    .sort((a, b) => parseInt(b.id.replace('cl', '')) - parseInt(a.id.replace('cl', '')))
    .slice(0, 3); // Show up to 3 recent clients

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Recent Clients</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {recentClients.length === 0 ? (
          <p className="text-muted-foreground">No clients added yet.</p>
        ) : (
          <ul className="space-y-3">
            {recentClients.map((client) => (
              <li key={client.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                <Link to={`/clients/${client.id}`} className="block hover:bg-muted/50 -mx-3 px-3 py-2 rounded-md transition-colors">
                  <p className="font-medium">{client.fullName}</p>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                </Link>
              </li>
            ))}
            {clients.length > 3 && (
              <li className="pt-2">
                <Link to="/clients" className="text-primary hover:underline text-sm">
                  View all {clients.length} clients
                </Link>
              </li>
            )}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentClients;