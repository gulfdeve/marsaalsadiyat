import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Vision } from "@/components/vision";
import { Lifestyle } from "@/components/lifestyle";
import { Masterplan } from "@/components/masterplan";
import { Residences } from "@/components/residences";
import { StoryVideo } from "@/components/story-video";
import { Invest } from "@/components/invest";
import { Connectivity } from "@/components/connectivity";
import { Timeline } from "@/components/timeline";
import { Amenities } from "@/components/amenities";
import { RegisterSection } from "@/components/register-section";
import { FinalCta } from "@/components/final-cta";
import { SiteFooter } from "@/components/site-footer";
import { RegisterPopup } from "@/components/register-popup";
import { SiteContentProvider } from "@/components/site-content-provider";
import { getSiteContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getSiteContent();
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function Home() {
  const content = await getSiteContent();

  return (
    <SiteContentProvider content={content}>
      <RegisterPopup />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Vision />
        <Lifestyle />
        <Masterplan />
        <Residences />
        <StoryVideo />
        <Invest />
        <Connectivity />
        <Timeline />
        <Amenities />
        <RegisterSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </SiteContentProvider>
  );
}
