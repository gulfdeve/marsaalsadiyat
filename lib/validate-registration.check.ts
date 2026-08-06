// Runnable self-check for validate-registration.ts. Not imported by app code —
// run manually with `npx tsx lib/validate-registration.check.ts`.

import { validateRegistration, type RegistrationPayload } from "./validate-registration";
import { registerForm } from "./content";

const valid: RegistrationPayload = {
  name: "Jane Doe",
  phone: "+971 50 000 0000",
  country: "United Arab Emirates",
  budget: registerForm.budgets[0],
  purpose: registerForm.purposes[0],
};

console.assert(validateRegistration(valid) === null, "valid payload should pass");
console.assert(validateRegistration({ ...valid, name: "" })?.name !== undefined, "missing name should fail");
console.assert(validateRegistration({ ...valid, phone: "" })?.phone !== undefined, "missing phone should fail");
console.assert(validateRegistration({ ...valid, phone: "abc" })?.phone !== undefined, "malformed phone should fail");
console.assert(validateRegistration({ ...valid, country: "" })?.country !== undefined, "missing country should fail");
console.assert(
  validateRegistration({ ...valid, budget: "AED 999M" })?.budget !== undefined,
  "out-of-set budget should fail"
);
console.assert(
  validateRegistration({ ...valid, purpose: "Other" })?.purpose !== undefined,
  "out-of-set purpose should fail"
);
console.assert(
  validateRegistration({ ...valid, name: "x".repeat(200) })?.name !== undefined,
  "oversized field should fail"
);
console.assert(validateRegistration(null)?.name !== undefined, "null payload should fail");

console.log("validate-registration: all checks passed");
