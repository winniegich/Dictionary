import * as React from "react";
// import { cn } from "@/lib/utils"; // optional helper for conditional classes

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`bg-white dark:bg-neutral-900 shadow-md rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex justify-between items-center ${className}`}>{children}</div>;
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mt-4 ${className}`}>{children}</div>;
}
