import fs from "fs";
import { parse } from "csv/sync";
import sanitizeHtml from "sanitize-html";
import type { TableRowDef } from "@/types";

const clean = (dirty: string) =>
    sanitizeHtml(dirty, {
        allowedTags: ["b", "i", "em", "strong", "br", "a"],
        allowedAttributes: {
            a: ["href"]
        }
    });

// TODO: Should be able to load it in MDX, with key to CSV
export default async function getData(csv: string): Promise<TableRowDef[]> {
    try {
        const data = fs.readFileSync(`../data/${csv}.csv`, "utf8");
        const records = parse(data, {
            columns: true,
            skip_empty_lines: true
        });

        // Sanitize data
        const sanitizedRecords = records.map((record: TableRowDef) => {
            return Object.entries(record).reduce((acc, [key, value]) => {
                return {
                    ...acc,
                    [key]: clean(value).trim()
                };
            }, {});
        });

        return sanitizedRecords;
    } catch (err) {
        console.error(err);
        throw new Error(`Error loading data ${csv}`);
    }
}
