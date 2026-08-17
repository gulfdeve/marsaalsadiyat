// Shared client + server validation for the registration form. The server route
// treats this as a trust boundary check, not a UX nicety — it must run even if
// the client-side checks were bypassed.

import { registerForm } from "./content";
import { DIAL_CODES } from "./phone-codes";

export interface RegistrationPayload {
  name: string;
  phone: string;
  country: string;
  budget: string;
  purpose: string;
}

export type RegistrationErrors = Partial<Record<keyof RegistrationPayload, string>>;

const MAX_FIELD_LENGTH = 120;

export function validateRegistration(data: unknown): RegistrationErrors | null {
  if (typeof data !== "object" || data === null) {
    return { name: "Invalid submission." };
  }
  const d = data as Record<string, unknown>;
  const errors: RegistrationErrors = {};

  const name = typeof d.name === "string" ? d.name.trim() : "";
  if (!name) errors.name = "Full name is required.";
  else if (name.length > MAX_FIELD_LENGTH) errors.name = "Full name is too long.";

  const phone = typeof d.phone === "string" ? d.phone.trim() : "";
  if (!phone) errors.phone = "Phone number is required.";
  else {
    const dial = DIAL_CODES.find((code) => phone.startsWith(code));
    const nationalNumber = dial ? phone.slice(dial.length) : "";
    if (!dial || !/^\d{6,14}$/.test(nationalNumber)) {
      errors.phone = "Enter a valid phone number.";
    }
  }

  const country = typeof d.country === "string" ? d.country.trim() : "";
  if (!country) errors.country = "Country is required.";
  else if (country.length > MAX_FIELD_LENGTH) errors.country = "Country is too long.";

  const budget = typeof d.budget === "string" ? d.budget : "";
  if (!budget) errors.budget = "Select an investment budget.";
  else if (!(registerForm.budgets as readonly string[]).includes(budget)) {
    errors.budget = "Select a valid investment budget.";
  }

  const purpose = typeof d.purpose === "string" ? d.purpose : "";
  if (!purpose) errors.purpose = "Select a purpose.";
  else if (!(registerForm.purposes as readonly string[]).includes(purpose)) {
    errors.purpose = "Select a valid purpose.";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

