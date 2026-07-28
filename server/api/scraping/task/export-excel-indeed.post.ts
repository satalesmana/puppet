import writeXlsxFile from "write-excel-file/node";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { ScrapingIndeedPelamar } from "~/server/models/ScrapingPelamarIndeed.model";
import type { ApiResponse } from "~/server/types/apiresponse.interface";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const filter = body?.filter || {};

    const data = await ScrapingIndeedPelamar.find(filter).lean();

    const schema = [
      {
        column: "Telpon",
        type: String,
        value: (row: any) =>
          row.phoneNumber ? row.phoneNumber.replace(/\s/g, "") : "",
      },
      {
        column: "Name",
        type: String,
        value: (row: any) =>
          `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim(),
      },
      {
        column: "Email",
        type: String,
        value: (row: any) => row.email ?? "",
      },
    ];

    // Pastikan folder tersedia
    const downloadDir = join(process.cwd(), "public", "downloads");
    await mkdir(downloadDir, { recursive: true });

    // Nama file unik
    const fileName = `phone_${Date.now()}_${randomUUID()}.xlsx`;
    const outputPath = join(downloadDir, fileName);

    // Generate buffer Excel
    const buffer = await writeXlsxFile(data, {
      schema,
      buffer: true,
    });

    // Simpan ke file
    await writeFile(outputPath, buffer);

    return {
      data: `downloads/${fileName}`,
      message: "",
    } as ApiResponse<string, string>;
  } catch (error: any) {
    console.error(error);

    return {
      data: "",
      message: error.message ?? "Failed to generate excel",
    } as ApiResponse<string, string>;
  }
});
