"use client";

import React from "react";
import Sidebar from "./Sidebar";
import { MadeWithDyad } from "./made-with-dyad";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className={isMobile ? "flex-1 pb-20" : "flex-1 ml-14"}>
        {children}
        <MadeWithDyad />
      </main>
    </div>
  );
};

export default Layout;