import React from "react";

type CitationProps = {
  href: string;
  label?: string;
};

export default function Citation({ href, label = "source" }: CitationProps) {
  return (
    <sup className="citation">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={href}
        aria-label={`Source: ${href}`}
      >
        {label}
      </a>
    </sup>
  );
}