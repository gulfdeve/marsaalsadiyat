"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { defaultSiteContent, type SiteContent } from "@/lib/site-content";
import { iconMap } from "@/lib/icon-map";
import { logoutAdmin, saveSiteContentAction } from "./actions";

const SECTIONS: { id: keyof SiteContent; label: string }[] = [
  { id: "meta", label: "SEO" },
  { id: "nav", label: "Navigation" },
  { id: "hero", label: "Hero" },
  { id: "vision", label: "Vision" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "masterplan", label: "Masterplan" },
  { id: "residences", label: "Residences" },
  { id: "story", label: "Story" },
  { id: "invest", label: "Invest" },
  { id: "connectivity", label: "Connectivity" },
  { id: "timeline", label: "Timeline" },
  { id: "amenities", label: "Amenities" },
  { id: "registerForm", label: "Register form" },
  { id: "finalCta", label: "Final CTA" },
  { id: "footer", label: "Footer" },
  { id: "customTags", label: "Custom tags" },
];

const ICON_OPTIONS = Object.keys(iconMap);

function humanize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^\w/, (char) => char.toUpperCase());
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function setAtPath(root: SiteContent, path: Array<string | number>, value: unknown): SiteContent {
  const next = clone(root);
  let cursor: unknown = next;
  for (let i = 0; i < path.length - 1; i += 1) {
    cursor = (cursor as Record<string | number, unknown>)[path[i]];
  }
  (cursor as Record<string | number, unknown>)[path[path.length - 1]] = value;
  return next;
}

function blankFrom(sample: unknown): unknown {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") {
    return Object.fromEntries(Object.entries(sample).map(([key, value]) => [key, blankFrom(value)]));
  }
  return sample;
}

function sampleAt(path: Array<string | number>): unknown {
  let cursor: unknown = defaultSiteContent;
  for (const key of path) {
    if (Array.isArray(cursor)) {
      cursor = cursor[0];
      continue;
    }
    if (cursor && typeof cursor === "object") {
      cursor = (cursor as Record<string, unknown>)[String(key)];
    }
  }
  return Array.isArray(cursor) ? cursor[0] : cursor;
}

export function ContentEditor({
  initialContent,
  persistence,
}: {
  initialContent: SiteContent;
  persistence: { vercel: boolean; github: boolean; ready: boolean };
}) {
  const [content, setContent] = useState(initialContent);
  const [saved, setSaved] = useState(initialContent);
  const [section, setSection] = useState<keyof SiteContent>("hero");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const dirty = useMemo(() => JSON.stringify(content) !== JSON.stringify(saved), [content, saved]);

  function update(path: Array<string | number>, value: unknown) {
    setContent((current) => setAtPath(current, path, value));
    setMessage("");
    setError("");
  }

  function save() {
    startTransition(async () => {
      const result = await saveSiteContentAction(content);
      if (result.error) {
        setError(result.error);
        setMessage("");
        return;
      }
      setSaved(content);
      setError("");
      setMessage(result.message ?? "Saved.");
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border-hairline bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-gold">CONTENT</p>
            <h1 className="font-serif text-2xl text-foreground">Edit site copy</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-border-hairline px-5 py-2.5 text-xs tracking-[0.15em] text-foreground hover:border-gold/60"
            >
              VIEW SITE
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-full border border-border-hairline px-5 py-2.5 text-xs tracking-[0.15em] text-muted-foreground hover:text-foreground"
              >
                SIGN OUT
              </button>
            </form>
            <button
              type="button"
              onClick={save}
              disabled={pending || !persistence.ready}
              className="rounded-full bg-gold px-6 py-2.5 text-xs font-medium tracking-[0.15em] text-background disabled:opacity-60"
            >
              {pending ? "SAVING…" : dirty ? "SAVE CHANGES" : "SAVED"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[220px_1fr] sm:px-6">
        <nav className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {SECTIONS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSection(item.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-left text-xs tracking-[0.12em] transition-colors ${
                    section === item.id
                      ? "bg-gold text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section className="rounded-luxe border border-border-hairline bg-surface p-5 sm:p-8">
          <p className="text-[11px] tracking-[0.2em] text-gold">{humanize(section).toUpperCase()}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {persistence.vercel
              ? persistence.github
                ? "On Vercel, saves write content/site.json in GitHub. The live site reads that file immediately."
                : "This Vercel deployment cannot keep local file writes. Add GITHUB_TOKEN in Vercel project settings so /admin can update content/site.json in the repo."
              : "Saved values live in content/site.json."}
          </p>
          {!persistence.ready && (
            <p className="mt-4 text-sm text-red-400">
              Saving is blocked on Vercel until <code>GITHUB_TOKEN</code> is set. File writes on the
              serverless disk are discarded after the request.
            </p>
          )}
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
          {message && <p className="mt-4 text-sm text-gold">{message}</p>}
          <div className="mt-8">
            {section === "customTags" ? (
              <CustomTagsEditor
                head={content.customTags?.head ?? ""}
                body={content.customTags?.body ?? ""}
                onChange={update}
              />
            ) : (
              <ValueEditor path={[section]} value={content[section]} onChange={update} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function CustomTagsEditor({
  head,
  body,
  onChange,
}: {
  head: string;
  body: string;
  onChange: (path: Array<string | number>, value: unknown) => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <label className="block">
        <span className="text-[11px] tracking-[0.2em] text-muted-foreground">HEAD TAGS</span>
        <p className="mt-2 text-sm text-muted-foreground">
          Paste <code className="text-foreground">&lt;meta&gt;</code>,{" "}
          <code className="text-foreground">&lt;link&gt;</code>, JSON-LD, or{" "}
          <code className="text-foreground">&lt;script&gt;</code> tags. They are injected into{" "}
          <code className="text-foreground">&lt;head&gt;</code> on the live site.
        </p>
        <textarea
          value={head}
          rows={10}
          spellCheck={false}
          placeholder={'<meta name="example" content="value" />\n<script src="https://example.com/pixel.js" async></script>'}
          onChange={(event) => onChange(["customTags", "head"], event.target.value)}
          className="mt-3 w-full resize-y border border-border-hairline bg-background px-3 py-3 font-mono text-sm leading-relaxed text-foreground outline-none focus:border-gold"
        />
      </label>
      <label className="block">
        <span className="text-[11px] tracking-[0.2em] text-muted-foreground">BODY TAGS</span>
        <p className="mt-2 text-sm text-muted-foreground">
          Optional tags rendered at the end of <code className="text-foreground">&lt;body&gt;</code>,
          such as extra scripts or noscript pixels.
        </p>
        <textarea
          value={body}
          rows={8}
          spellCheck={false}
          placeholder={'<script>console.log("custom tag")</script>'}
          onChange={(event) => onChange(["customTags", "body"], event.target.value)}
          className="mt-3 w-full resize-y border border-border-hairline bg-background px-3 py-3 font-mono text-sm leading-relaxed text-foreground outline-none focus:border-gold"
        />
      </label>
    </div>
  );
}

function ValueEditor({
  path,
  value,
  onChange,
}: {
  path: Array<string | number>;
  value: unknown;
  onChange: (path: Array<string | number>, value: unknown) => void;
}) {
  const leaf = String(path[path.length - 1]);
  const label = typeof path[path.length - 1] === "number" ? "Text" : humanize(leaf);

  if (typeof value === "string") {
    if (leaf === "icon") {
      return (
        <label className="block">
          <span className="text-[11px] tracking-[0.2em] text-muted-foreground">{label}</span>
          <select
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            className="mt-2 w-full border-b border-input-hairline bg-transparent py-2.5 text-base text-foreground outline-none focus:border-gold"
          >
            {!ICON_OPTIONS.includes(value) && <option value={value}>{value}</option>}
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </label>
      );
    }

    if (leaf === "span") {
      return (
        <label className="block">
          <span className="text-[11px] tracking-[0.2em] text-muted-foreground">Span</span>
          <select
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            className="mt-2 w-full border-b border-input-hairline bg-transparent py-2.5 text-base text-foreground outline-none focus:border-gold"
          >
            <option value="normal">normal</option>
            <option value="tall">tall</option>
          </select>
        </label>
      );
    }

    const multiline = value.length > 80 || ["body", "description"].includes(leaf);
    return (
      <label className="block">
        <span className="text-[11px] tracking-[0.2em] text-muted-foreground">{label}</span>
        {multiline ? (
          <textarea
            value={value}
            rows={4}
            onChange={(event) => onChange(path, event.target.value)}
            className="mt-2 w-full resize-y border-b border-input-hairline bg-transparent py-2.5 text-base leading-relaxed text-foreground outline-none focus:border-gold"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            className="mt-2 w-full border-b border-input-hairline bg-transparent py-2.5 text-base text-foreground outline-none focus:border-gold"
          />
        )}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block">
        <span className="text-[11px] tracking-[0.2em] text-muted-foreground">{label}</span>
        <input
          type="number"
          step={leaf === "decimals" ? 1 : "any"}
          value={value}
          onChange={(event) => onChange(path, Number(event.target.value))}
          className="mt-2 w-full border-b border-input-hairline bg-transparent py-2.5 text-base text-foreground outline-none focus:border-gold"
        />
      </label>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[11px] tracking-[0.2em] text-muted-foreground">{humanize(leaf)}</p>
          <button
            type="button"
            onClick={() => {
              const template = value[value.length - 1] ?? sampleAt(path);
              onChange(path, [...value, blankFrom(template)]);
            }}
            className="text-xs tracking-[0.12em] text-gold hover:text-gold-soft"
          >
            ADD ITEM
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {value.map((item, index) => (
            <div key={`${leaf}-${index}`} className="rounded-luxe border border-border-hairline p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] tracking-[0.16em] text-muted-foreground">
                  {humanize(leaf)} {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}
                  className="text-xs tracking-[0.12em] text-red-400"
                >
                  REMOVE
                </button>
              </div>
              <ValueEditor path={[...path, index]} value={item} onChange={onChange} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    return (
      <div className={typeof path[path.length - 1] === "number" ? "flex flex-col gap-5" : "flex flex-col gap-6"}>
        {entries.map(([key, child]) => (
          <ValueEditor key={key} path={[...path, key]} value={child} onChange={onChange} />
        ))}
      </div>
    );
  }

  return null;
}
