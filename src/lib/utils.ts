import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
