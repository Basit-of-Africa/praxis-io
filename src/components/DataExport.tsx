"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { exportToCSV, exportToJSON } from "@/utils/exportUtils";

interface DataExportProps {
  data: any[];
  filename: string;
  title?: string;
}

const DataExport: React.FC<DataExportProps> = ({ data, filename, title = "Export Data" }) => {
  const handleExportCSV = () => {
    exportToCSV(data, filename);
  };

  const handleExportJSON = () => {
    exportToJSON(data, filename);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleExportCSV}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportJSON}>
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataExport;