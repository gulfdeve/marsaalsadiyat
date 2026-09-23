"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useSiteContent } from "@/components/site-content-provider";
import { RegisterForm } from "./register-form";

const SEEN_KEY = "register-popup-seen";
const SHOW_DELAY_MS = 1200;

export function RegisterPopup() {
  const { registerForm } = useSiteContent();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;
    const timer = setTimeout(() => dialogRef.current?.showModal(), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem(SEEN_KEY, "1");
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => sessionStorage.setItem(SEEN_KEY, "1")}
      onClick={(e) => {
        if (e.target === dialogRef.current) dismiss();
      }}
      className="popup-dialog m-auto w-[92vw] max-w-lg max-h-[90vh] overflow-y-auto rounded-luxe border-0 bg-transparent p-0 backdrop:bg-background"
    >
      <div className="relative rounded-luxe border border-border-hairline bg-surface p-6 shadow-luxe sm:p-8">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full p-2.5 text-muted-foreground transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <p className="pr-8 text-xs tracking-[0.3em] text-gold">{registerForm.eyebrow}</p>
        <h2 className="mt-3 pr-8 font-serif text-2xl leading-tight text-foreground sm:text-3xl">
          {registerForm.title}
        </h2>

        <div className="mt-6">
          <RegisterForm />
        </div>
      </div>
    </dialog>
  );
}
