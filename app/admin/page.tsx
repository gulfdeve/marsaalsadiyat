import type { Metadata } from "next";
import { isAdminAuthenticated, isDefaultAdminPassword } from "@/lib/admin-session";
import { getContentStorageStatus, getSiteContent } from "@/lib/content";
import { ContentEditor } from "./content-editor";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Content editor",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const signedIn = await isAdminAuthenticated();

  if (!signedIn) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
        <p className="text-xs tracking-[0.3em] text-gold">ADMIN</p>
        <h1 className="mt-4 font-serif text-4xl text-foreground">Update site content</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Edit the landing page copy stored in <code className="text-foreground">content/site.json</code>.
          On Vercel, that file is updated through GitHub so the change survives deploys.
        </p>
        <div className="mt-8">
          <LoginForm defaultPasswordHint={isDefaultAdminPassword()} />
        </div>
      </main>
    );
  }

  const content = await getSiteContent();
  return <ContentEditor initialContent={content} persistence={getContentStorageStatus()} />;
}
