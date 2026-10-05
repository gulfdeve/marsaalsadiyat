"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { Bold, Italic, Underline, Link as LinkIcon, List, Palette, RemoveFormatting } from "lucide-react";
import { sanitizeFormattedHtml, toInlineHtml } from "@/lib/formatted-html";

export function FormattedField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const focused = useRef(false);

  useLayoutEffect(() => {
    if (!ref.current || focused.current) return;
    if (ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  function emit() {
    if (!ref.current) return;
    let html = ref.current.innerHTML;
    if (html === "<br>" || html === "<br />") html = "";
    if (!multiline) html = toInlineHtml(html);
    onChange(sanitizeFormattedHtml(html));
  }

  function run(command: string, argument?: string) {
    ref.current?.focus();
    document.execCommand(command, false, argument);
    emit();
  }

  function addLink() {
    const url = window.prompt("Link URL", "https://");
    if (!url) return;
    run("createLink", url);
  }

  function addGold() {
    ref.current?.focus();
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand("foreColor", false, "var(--gold)");
    emit();
  }

  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.2em] text-muted-foreground">{label}</span>
      <div className="mt-2 rounded-luxe border border-border-hairline focus-within:border-gold">
        <div className="flex flex-wrap gap-1 border-b border-border-hairline px-2 py-1.5">
          <FormatButton label="Bold" onClick={() => run("bold")}>
            <Bold size={14} />
          </FormatButton>
          <FormatButton label="Italic" onClick={() => run("italic")}>
            <Italic size={14} />
          </FormatButton>
          <FormatButton label="Underline" onClick={() => run("underline")}>
            <Underline size={14} />
          </FormatButton>
          <FormatButton label="Gold" onClick={addGold}>
            <Palette size={14} />
          </FormatButton>
          <FormatButton label="Link" onClick={addLink}>
            <LinkIcon size={14} />
          </FormatButton>
          {multiline && (
            <FormatButton label="List" onClick={() => run("insertUnorderedList")}>
              <List size={14} />
            </FormatButton>
          )}
          <FormatButton label="Clear formatting" onClick={() => run("removeFormat")}>
            <RemoveFormatting size={14} />
          </FormatButton>
        </div>
        <div
          ref={ref}
          contentEditable
          role="textbox"
          aria-label={label}
          suppressContentEditableWarning
          onFocus={() => {
            focused.current = true;
          }}
          onBlur={() => {
            focused.current = false;
            emit();
          }}
          onInput={emit}
          className={`rich-field px-3 py-2.5 text-base leading-relaxed text-foreground outline-none ${
            multiline ? "min-h-28" : "min-h-11"
          }`}
        />
      </div>
    </label>
  );
}

function FormatButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-gold"
    >
      {children}
    </button>
  );
}
