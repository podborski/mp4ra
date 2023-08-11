"use client";

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import clsx from "clsx";
import { useState, useMemo } from "react";
import type { ColumnFiltersState } from "@tanstack/react-table";
import type { TableRowDef } from "@/types";

// TODO: Keywords to references
export default function Table({ data }: { data: TableRowDef[] }) {
    // Generate columns
    const columnHelper = createColumnHelper<any>();
    const columns = useMemo(
        () =>
            Object.keys(data[0]).map((header) => {
                if (header === "code") {
                    return columnHelper.accessor(header, {
                        // eslint-disable-next-line react/no-danger, react/no-unstable-nested-components
                        cell: (info) => <code>{info.getValue()}</code>
                    });
                }
                return columnHelper.accessor(header, {
                    // eslint-disable-next-line react/no-danger, react/no-unstable-nested-components
                    cell: (info) => <div dangerouslySetInnerHTML={{ __html: info.getValue() }} />
                });
            }),
        [columnHelper, data]
    );

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    // TODO: Styling
    // TODO: Global Filter
    return (
        <div>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        <>
                                            <div
                                                className={clsx(
                                                    header.column.getCanSort() &&
                                                        "cursor-pointer select-none"
                                                )}
                                                onClick={header.column.getToggleSortingHandler()}
                                                onKeyDown={(e) => {
                                                    const handler =
                                                        header.column.getToggleSortingHandler();
                                                    if (!handler) return;
                                                    if (e.key === "Enter") handler(e);
                                                }}
                                                role="rowheader"
                                                tabIndex={0}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: " 🔼",
                                                    desc: " 🔽"
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <input
                                                        className="w-36 rounded border shadow"
                                                        list={`${header.column.id}list`}
                                                        onChange={(e) =>
                                                            header.column.setFilterValue(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder={`Search... (${
                                                            header.column.getFacetedUniqueValues()
                                                                .size
                                                        })`}
                                                        type="text"
                                                        value={
                                                            (header.column.getFilterValue() ??
                                                                "") as string
                                                        }
                                                    />
                                                </div>
                                            ) : null}
                                        </>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
