"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { registerForm } from "@/lib/content";
import { validateRegistration, type RegistrationErrors } from "@/lib/validate-registration";

type Status = "idle" | "submitting" | "success" | "error";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("");
  const [purpose, setPurpose] = useState("");
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = { name, phone, country, budget, purpose };
    const validationErrors = validateRegistration(payload);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setServerMessage(data.message ?? "Something went wrong. Please try again.");
        if (data.errors) setErrors(data.errors);
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-luxe border border-gold/40 bg-surface p-10 text-center"
      >
        <h3 className="font-serif text-2xl text-gold">Thank you.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Your registration has been received. A property consultant will be in touch shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-luxe border border-border-hairline bg-surface p-6 sm:p-8">
      <Field
        label="FULL NAME"
        value={name}
        onChange={setName}
        error={errors.name}
        autoComplete="name"
      />

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="PHONE NUMBER" value={phone} onChange={setPhone} error={errors.phone} type="tel" autoComplete="tel" />
        <Field label="COUNTRY" value={country} onChange={setCountry} error={errors.country} autoComplete="country-name" />
      </div>

      <fieldset className="mt-6">
        <legend className="text-[11px] tracking-[0.2em] text-muted-foreground">
          INVESTMENT BUDGET
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {registerForm.budgets.map((option) => (
            <PillOption
              key={option}
              label={option}
              selected={budget === option}
              onSelect={() => setBudget(option)}
            />
          ))}
        </div>
        {errors.budget && <p className="mt-2 text-xs text-red-400">{errors.budget}</p>}
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-[11px] tracking-[0.2em] text-muted-foreground">PURPOSE</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {registerForm.purposes.map((option) => (
            <PillOption
              key={option}
              label={option}
              selected={purpose === option}
              onSelect={() => setPurpose(option)}
            />
          ))}
        </div>
        {errors.purpose && <p className="mt-2 text-xs text-red-400">{errors.purpose}</p>}
      </fieldset>

      <AnimatePresence>
        {status === "error" && serverMessage && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 text-xs text-red-400"
          >
            {serverMessage}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 w-full rounded-full bg-gold py-4 text-sm font-medium tracking-[0.15em] text-background transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "submitting" ? "SUBMITTING…" : "REGISTER YOUR INTEREST"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full border-b border-input-hairline bg-transparent py-2.5 text-base text-foreground outline-none transition-colors focus:border-gold"
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function PillOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
        selected
          ? "border-gold bg-gold text-background"
          : "border-input-hairline text-foreground hover:border-gold/60"
      }`}
    >
      {label}
    </button>
  );
}
