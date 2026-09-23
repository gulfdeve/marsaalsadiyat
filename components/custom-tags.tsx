"use client";

import { useEffect } from "react";
import { isExecutableScript, parseCustomTags } from "@/lib/parse-custom-tags";

function injectExecutableScripts(html: string, target: "head" | "body") {
  const parent = target === "head" ? document.head : document.body;
  const inserted: HTMLElement[] = [];

  for (const tag of parseCustomTags(html)) {
    if (!isExecutableScript(tag)) continue;
    const script = document.createElement("script");
    for (const [name, value] of Object.entries(tag.attrs)) {
      if (value === "") script.setAttribute(name, "");
      else script.setAttribute(name, value);
    }
    if (tag.children) script.text = tag.children;
    script.dataset.customTag = "true";
    parent.appendChild(script);
    inserted.push(script);
  }

  return inserted;
}

export function CustomTagsRuntime({ head, body }: { head: string; body: string }) {
  useEffect(() => {
    const inserted = [
      ...injectExecutableScripts(head, "head"),
      ...injectExecutableScripts(body, "body"),
    ];
    return () => inserted.forEach((node) => node.remove());
  }, [head, body]);

  return null;
}
