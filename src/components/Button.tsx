import React from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "tertiary";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
};

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorProps = BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-[#8338e8]",

  secondary:
    "border border-primary text-white bg-transparent hover:bg-[#9747FF]/10",

  tertiary: "bg-transparent text-white hover:bg-[#9747FF]/10",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 cursor-pointer rounded-full px-7 py-2.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#9747FF] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

export default function Button(props: ButtonProps | AnchorProps) {
  const { children, variant = "primary", className, href, ...rest } = props;

  const classes = twMerge(baseClasses, variants[variant], className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
