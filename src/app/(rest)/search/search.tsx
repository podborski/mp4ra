"use client";

import React, { useState } from "react";
import Table from "@/components/DataDisplay/Table";
import { Record } from "./types";

export default function Search({ data }: { data: Record[] }) {
    const [query, setQuery] = useState("");
    return (
        <div className="flex flex-col gap-6">
            <input
                className="w-full rounded border px-3 py-2 shadow-inner"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                type="text"
            />
            <Table data={data} globalFilter={query} />
        </div>
    );
}
