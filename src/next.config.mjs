import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    pageExtensions: ["ts", "tsx", "mdx"],
    env: {
        BUILD_TIMESTAMP: new Date().toLocaleString("default", {
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    }
};

const withMDX = createMDX({
    options: {
        extension: /\.mdx?$/,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug]
    }
});
export default withMDX(nextConfig);
