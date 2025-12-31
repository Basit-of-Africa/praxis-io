"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClientContext } from "@/context/ClientContext";
import { Users } from "lucide-react";

const ClientStats = () => {
  const { clients } = useClientContext();
  
  const totalClients = clients.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card className="sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClients}</div>
          <p className="text-xs text-muted-foreground">Registered clients</p>
        </CardContent>
      </Card>
      
      <Card className="sm:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Client Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-lg font-bold">0</div>
              <div className="text-xs text-muted-foreground">New this week</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">0</div>
              <div className="text-xs text-muted-foreground">Active this month</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">0</div>
              <div className="text-xs text-muted-foreground">Returning clients</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientStats;