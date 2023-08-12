import fs from "fs";
import path from "path";
import { glob } from "glob";
import { parse } from "csv/sync";
import { NextResponse } from "next/server";
import cleanRecords from "@/utils/misc";

// FIXME: Do not expose this as we are gonna do csv mapping. Search library can be wrapped with a RSC
// eslint-disable-next-line import/prefer-default-export
export async function GET() {
    const ignore = ["unlisted", "knownduplicates"];
    const all: object[] = [];
    const CSVs = await glob(path.join(process.cwd(), "..", "data", "*.csv"));

    CSVs.forEach((file) => {
        if (ignore.some((i) => file.includes(i))) return;
        const data = fs.readFileSync(file, "utf8");
        const records = parse(data, {
            columns: true,
            skip_empty_lines: true
        });
        all.push(...records);
    });

    return NextResponse.json(cleanRecords(all, true));
}
