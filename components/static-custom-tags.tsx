import {
  isExecutableScript,
  isJsonLdScript,
  parseCustomTags,
  toReactProps,
} from "@/lib/parse-custom-tags";

export function StaticCustomTags({ html }: { html: string }) {
  const tags = parseCustomTags(html).filter((tag) => !isExecutableScript(tag));

  return (
    <>
      {tags.map((tag, index) => {
        const key = `${tag.tag}-${index}`;
        const props = toReactProps(tag.attrs, key);

        if (tag.tag === "meta") return <meta {...props} />;
        if (tag.tag === "link") return <link {...props} />;
        if (tag.tag === "base") return <base {...props} />;
        if (tag.tag === "title") return <title {...props}>{tag.children}</title>;
        if (tag.tag === "style") {
          return <style {...props} dangerouslySetInnerHTML={{ __html: tag.children ?? "" }} />;
        }
        if (tag.tag === "noscript") {
          return <noscript {...props} dangerouslySetInnerHTML={{ __html: tag.children ?? "" }} />;
        }
        if (isJsonLdScript(tag)) {
          return <script {...props} dangerouslySetInnerHTML={{ __html: tag.children ?? "" }} />;
        }
        return null;
      })}
    </>
  );
}
