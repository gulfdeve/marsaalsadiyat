"use client";

import { useActionState } from "react";
import { loginAdmin } from "./actions";

export function LoginForm({ defaultPasswordHint }: { defaultPasswordHint: boolean }) {
  const [state, action, pending] = useActionState(loginAdmin, null);

  return (
    <form action={action} className="rounded-luxe border border-border-hairline bg-surface p-6 sm:p-8">
      <label className="block text-[11px] tracking-[0.2em] text-muted-foreground">PASSWORD</label>
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="mt-2 w-full border-b border-input-hairline bg-transparent py-2.5 text-base text-foreground outline-none transition-colors focus:border-gold"
      />
      {state?.error && <p className="mt-3 text-xs text-red-400">{state.error}</p>}
      {defaultPasswordHint && (
        <p className="mt-3 text-xs text-muted-foreground">
          No <code className="text-foreground">ADMIN_PASSWORD</code> is set, so the default is{" "}
          <code className="text-foreground">admin</code>.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-8 w-full rounded-full bg-gold py-4 text-sm font-medium tracking-[0.15em] text-background transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
      >
        {pending ? "SIGNING IN…" : "SIGN IN"}
      </button>
    </form>
  );
}
