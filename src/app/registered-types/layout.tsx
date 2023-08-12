import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return <section className="markdown-body">{children}</section>;
}

// TODO: codecs "See the color information..." what is this suppose to mean
