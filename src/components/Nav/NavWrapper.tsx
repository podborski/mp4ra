import path from "path";
import React from "react";
import { glob } from "glob";
import Nav from "./Nav";
import type { Meta } from ".";

const meta: Meta = {
    social: {
        github: "https://github.com/mp4ra/mp4ra.github.io"
    },
    menu: {
        References: {
            link: "/references"
        },
        "Registered Types": {
            link: "/registered-types"
        },
        "Request Registiration": {
            link: "/request"
        },
        Search: {
            link: "/search"
        }
    }
};

const capitalize = (str: string) =>
    str
        .split(" ")
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(" ");

export default async function NavWrapper() {
    // Get all paths under /registered-types
    const paths = await glob(path.join(process.cwd(), "app", "registered-types", "**", "*.mdx"));
    const expandedMeta = meta;

    // For each path, get the directory name and the link
    paths.forEach((p) => {
        if (!expandedMeta.menu["Registered Types"].items)
            expandedMeta.menu["Registered Types"].items = {};

        const dir = p.split(path.sep).slice(-2)[0];
        const name = capitalize(dir.replace(/-/g, " "));

        expandedMeta.menu["Registered Types"].items[name] = {
            link: `/registered-types/${dir}`
        };
    });

    return <Nav meta={expandedMeta} />;
}
