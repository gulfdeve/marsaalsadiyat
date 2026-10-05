import { containsHtml, sanitizeFormattedHtml } from "@/lib/formatted-html";

type TagName = "span" | "p" | "div" | "h1" | "h2" | "h3";

export function FormattedText({
  html,
  as: Tag = "span",
  className,
}: {
  html: string;
  as?: TagName;
  className?: string;
}) {
  if (!containsHtml(html)) {
    return <Tag className={className}>{html}</Tag>;
  }

  return (
    <Tag
      className={["formatted-text", className].filter(Boolean).join(" ")}
      dangerouslySetInnerHTML={{ __html: sanitizeFormattedHtml(html) }}
    />
  );
}
