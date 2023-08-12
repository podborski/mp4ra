import React from "react";
import getData from "@/utils/data";
import Table from "./Table";

export default async function DataDisplay({
    csv,
    globalFilter
}: {
    csv: string;
    globalFilter?: string;
}) {
    const data = await getData(csv);
    return <Table data={data} globalFilter={globalFilter} />;
}
