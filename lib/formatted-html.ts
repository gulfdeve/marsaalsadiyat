const ALLOWED_TAGS = new Set(["b", "strong", "i", "em", "u", "s", "br", "p", "ul", "ol", "li", "a", "span"]);

const CLASS_ALLOW = new Set(["text-gold", "text-gold-soft", "text-white", "underline"]);

export function containsHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value: string) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

export function plainTextFromHtml(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeHref(href: string) {
  const trimmed = href.trim();
  if (/^(https?:|mailto:|#|\/)/i.test(trimmed)) return trimmed;
  return "";
}

function sanitizeStyle(style: string) {
  const color = style.match(/color\s*:\s*([^;]+)/i)?.[1]?.trim();
  if (!color) return "";
  if (
    /^#([0-9a-f]{3,8})$/i.test(color) ||
    /^oklch\([^)]+\)$/i.test(color) ||
    /^rgba?\([^)]+\)$/i.test(color) ||
    /^var\(--[\w-]+\)$/i.test(color)
  ) {
    return `color: ${color}`;
  }
  return "";
}

function attr(source: string, name: string) {
  const match = source.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return match?.[2] ?? match?.[3] ?? match?.[4] ?? "";
}

export function sanitizeFormattedHtml(input: string) {
  if (!input) return "";
  const stripped = input
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "");

  return stripped.replace(/<\/?([a-z0-9]+)([^>]*)\/?>/gi, (full, rawTag: string, rawAttrs: string) => {
    const tag = rawTag.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    const closing = full.startsWith("</");
    if (closing) return `</${tag}>`;
    if (tag === "br") return "<br />";
    if (tag === "a") {
      const safe = sanitizeHref(attr(rawAttrs, "href"));
      return safe ? `<a href="${escapeAttr(safe)}">` : "<span>";
    }
    if (tag === "span") {
      const safeStyle = sanitizeStyle(attr(rawAttrs, "style"));
      const safeClass = attr(rawAttrs, "class")
        .split(/\s+/)
        .filter((name) => CLASS_ALLOW.has(name))
        .join(" ");
      const bits = [
        safeClass ? `class="${safeClass}"` : "",
        safeStyle ? `style="${escapeAttr(safeStyle)}"` : "",
      ].filter(Boolean);
      return bits.length ? `<span ${bits.join(" ")}>` : "<span>";
    }
    return `<${tag}>`;
  });
}

export function toInlineHtml(html: string) {
  return html
    .replace(/&nbsp;/gi, " ")
    .replace(/<\/p>\s*<p[^>]*>/gi, " ")
    .replace(/<\/div>\s*<div[^>]*>/gi, " ")
    .replace(/<\/?p[^>]*>/gi, "")
    .replace(/<\/?div[^>]*>/gi, "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/^\s+|\s+$/g, "")
    .replace(/\s+/g, " ");
}
