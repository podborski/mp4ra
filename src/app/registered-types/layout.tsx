import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return <div className="markdown-body">{children}</div>;
}

// TODO: Finish other types as well
