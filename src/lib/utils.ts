import { clsx, type ClassValue } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export function isVariableValid(variable: string | null) {
  return variable !== null && variable !== undefined;
}

export const isEmailValidCustom = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Custom regex for phone validation (Iranian or international format)
export const isVietnamesePhoneNumberValid = (phone: string): boolean => {
  const phoneRegex = /^(?:\+84|84|0)(?:3|5|7|8|9)\d{8}$/;
  return phoneRegex.test(phone);
};

export function getErrorResponse(
  status: number = 500,
  message: string,
  errors: ZodError | null = null
) {
  console.error({ errors, status, message });

  return new NextResponse(
    JSON.stringify({
      status: status < 500 ? "fail" : "error",
      message,
      errors: errors ? errors.flatten() : null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
