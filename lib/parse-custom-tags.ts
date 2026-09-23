export type ParsedTag = {
  tag: string;
  attrs: Record<string, string>;
  children?: string;
};

const ATTR_RE = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

export function parseAttributes(raw = "") {
  const attrs: Record<string, string> = {};
  for (const match of raw.matchAll(ATTR_RE)) {
    const name = match[1].toLowerCase();
    if (name.startsWith("on")) continue;
    attrs[name] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return attrs;
}

export function parseCustomTags(html: string): ParsedTag[] {
  if (!html.trim()) return [];

  const tags: ParsedTag[] = [];
  const paired = /<(script|style|noscript|title)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi;
  const voids = /<(meta|link|base)(\s[^>]*)?\/?>/gi;

  for (const match of html.matchAll(paired)) {
    tags.push({
      tag: match[1].toLowerCase(),
      attrs: parseAttributes(match[2]),
      children: match[3] ?? "",
    });
  }
  for (const match of html.matchAll(voids)) {
    tags.push({
      tag: match[1].toLowerCase(),
      attrs: parseAttributes(match[2]),
    });
  }
  return tags;
}

const REACT_ATTR: Record<string, string> = {
  class: "className",
  charset: "charSet",
  "http-equiv": "httpEquiv",
  crossorigin: "crossOrigin",
  srcset: "srcSet",
  hreflang: "hrefLang",
  referrerpolicy: "referrerPolicy",
};

export function toReactProps(attrs: Record<string, string>, key: string) {
  const props: Record<string, string> = { key };
  for (const [name, value] of Object.entries(attrs)) {
    props[REACT_ATTR[name] ?? name] = value;
  }
  return props;
}

export function isJsonLdScript(tag: ParsedTag) {
  return tag.tag === "script" && /json/i.test(tag.attrs.type ?? "");
}

export function isExecutableScript(tag: ParsedTag) {
  return tag.tag === "script" && !isJsonLdScript(tag);
}
