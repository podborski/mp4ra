"use client";

import React, { useState } from "react";
import { useAsync, useDebounce } from "react-use";
import Table from "@/components/DataDisplay/Table";

// TODO: Ability to hyperlink categories
// TODO: Improve performance. Could be because of nested components. Profile and fix. Try virtualization first.
export default function Page() {
    const [query, setQuery] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    useDebounce(() => setDebouncedValue(query), 500, [query]);

    const data = useAsync(async () => {
        const response = await (await fetch("/api/all")).json();

        // filter only code, description, specification
        return response.map((record: any) => ({
            code: record.code ?? "",
            description: record.description ?? "",
            specification: record.specification ?? ""
        }));
    }, []);

    return (
        <section className="markdown-body">
            <h1>Search</h1>
            <p>
                Trying to find a 4cc, a specification, any information registered, just type in
                below the keyword you are looking for.
            </p>
            {data.loading ? (
                <div className="flex flex-col gap-6">
                    <div className="h-11 w-full animate-pulse rounded bg-black/20" />
                    <div className="h-52 w-full animate-pulse rounded bg-black/20" />
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    <input
                        className="w-full rounded border px-3 py-2 shadow-inner"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."
                        type="text"
                    />
                    <Table data={data.value} globalFilter={debouncedValue} />
                </div>
            )}
        </section>
    );
}
