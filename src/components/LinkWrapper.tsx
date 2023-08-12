import Link from "next/link";
import React from "react";

export default function LinkWrapper({
    children,
    to,
    className
}: {
    children: React.ReactNode;
    to: string;
    className?: string;
}) {
    if (to.includes("//"))
        return (
            <a
                aria-label={`Link to ${children}`}
                className={className}
                href={to}
                rel="noreferrer"
                target="_blank"
            >
                {children}
            </a>
        );
    return (
        <Link aria-label={`Link to ${children}`} className={className} href={to}>
            {children}
        </Link>
    );
}
