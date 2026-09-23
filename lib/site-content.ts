import siteJson from "@/content/site.json";

export type NavItem = { label: string; href: string };

export type HeroContent = {
  eyebrow: string;
  titleLead: string;
  titleLine2: string;
  body: string;
};

export type VisionStat = {
  icon: string;
  value: number;
  decimals: number;
  unit: string;
  prefix: string;
  caption: string;
};

export type VisionContent = {
  eyebrow: string;
  title: string;
  body: string;
  stats: VisionStat[];
};

export type TextCard = { title: string; body: string };

export type LifestyleContent = {
  eyebrow: string;
  title: string;
  body: string;
  cards: TextCard[];
};

export type MasterplanLegendItem = { icon: string; label: string };
export type MasterplanHotspot = {
  id: string;
  x: number;
  y: number;
  title: string;
  body: string;
};

export type MasterplanContent = {
  eyebrow: string;
  title: string;
  body: string;
  legend: MasterplanLegendItem[];
  hotspots: MasterplanHotspot[];
};

export type ResidenceTile = { id: string; label: string; span: "tall" | "normal" };

export type ResidencesContent = {
  eyebrow: string;
  title: string;
  body: string;
  tiles: ResidenceTile[];
};

export type StoryContent = { eyebrow: string; title: string };

export type InvestCard = { icon: string; title: string; body: string };

export type InvestContent = {
  eyebrow: string;
  title: string;
  body: string;
  cards: InvestCard[];
};

export type ConnectivityPlace = { name: string; tag: string };

export type ConnectivityContent = {
  eyebrow: string;
  title: string;
  body: string;
  places: ConnectivityPlace[];
};

export type TimelinePhase = { phase: string; title: string; body: string };

export type TimelineContent = {
  eyebrow: string;
  title: string;
  body: string;
  phases: TimelinePhase[];
};

export type AmenitiesContent = {
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
};

export type RegisterFormContent = {
  eyebrow: string;
  title: string;
  body: string;
  budgets: string[];
  purposes: string[];
};

export type FinalCtaContent = { title: string; body: string };
export type FooterContent = { brand: string };
export type MetaContent = { title: string; description: string };
export type CustomTagsContent = { head: string; body: string };

export type SiteContent = {
  meta: MetaContent;
  nav: NavItem[];
  hero: HeroContent;
  vision: VisionContent;
  lifestyle: LifestyleContent;
  masterplan: MasterplanContent;
  residences: ResidencesContent;
  story: StoryContent;
  invest: InvestContent;
  connectivity: ConnectivityContent;
  timeline: TimelineContent;
  amenities: AmenitiesContent;
  registerForm: RegisterFormContent;
  finalCta: FinalCtaContent;
  footer: FooterContent;
  customTags: CustomTagsContent;
};

export const defaultSiteContent = siteJson as SiteContent;

const SECTION_KEYS = Object.keys(defaultSiteContent) as (keyof SiteContent)[];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeSiteContent(base: SiteContent, override: unknown): SiteContent {
  if (!isPlainObject(override)) return base;
  const next = { ...base };
  for (const key of SECTION_KEYS) {
    if (!(key in override)) continue;
    const current = base[key];
    const incoming = override[key];
    if (Array.isArray(current)) {
      if (Array.isArray(incoming)) {
        (next as Record<string, unknown>)[key] = incoming;
      }
      continue;
    }
    if (isPlainObject(current) && isPlainObject(incoming)) {
      (next as Record<string, unknown>)[key] = { ...current, ...incoming };
    }
  }
  return next;
}

function typeOf(value: unknown) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

export function validateSiteContent(value: unknown): string[] {
  if (!isPlainObject(value)) return ["Content must be an object."];

  const errors: string[] = [];

  function walk(sample: unknown, incoming: unknown, pathLabel: string) {
    const sampleType = typeOf(sample);
    const incomingType = typeOf(incoming);
    if (sampleType !== incomingType) {
      errors.push(`${pathLabel} should be ${sampleType}.`);
      return;
    }
    if (Array.isArray(sample)) {
      const list = incoming as unknown[];
      if (sample.length > 0) {
        list.forEach((item, index) => walk(sample[0], item, `${pathLabel}[${index}]`));
      }
      return;
    }
    if (isPlainObject(sample) && isPlainObject(incoming)) {
      for (const key of Object.keys(sample)) {
        if (!(key in incoming)) {
          errors.push(`${pathLabel}.${key} is required.`);
          continue;
        }
        walk(sample[key], incoming[key], `${pathLabel}.${key}`);
      }
    }
  }

  walk(defaultSiteContent, value, "content");
  return errors;
}
