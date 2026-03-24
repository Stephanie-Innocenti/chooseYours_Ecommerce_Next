"use client";
import * as React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FormProps {
  children: React.ReactNode;
  className?: string;
}

export function Form({ children, className }: FormProps) {
  return <form className={cn("space-y-6", className)}>{children}</form>;
}

export const FormItem = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-2">{children}</div>
);

export const FormLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <label className={cn("text-sm font-medium", className)}>{children}</label>
);

export const FormControl = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export const FormMessage = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-destructive">{children}</p>
);

interface FormFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  render: (props: {
    field: any
  }) => React.ReactNode
}

export function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  render
}: FormFieldProps<TFieldValues>) {
  return render({
    field: { name, control }  // ← Passa name + control
  })
}
