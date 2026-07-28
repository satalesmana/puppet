import writeXlsxFile from "write-excel-file/node";
import { ScrapingIndeedPelamar } from "~/server/models/ScrapingPelamarIndeed.model";

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
          row.phoneNumber?.replace(/\s/g, "") ?? "",
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

    // Generate Excel ke memory (Buffer)
    const buffer = await writeXlsxFile(data, {
      schema,
      buffer: true,
    });

    // Header download
    setHeader(
      event,
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    setHeader(
      event,
      "Content-Disposition",
      `attachment; filename="phone_${Date.now()}.xlsx"`
    );

    setHeader(event, "Content-Length", buffer.length);

    return buffer;
  } catch (error: any) {
    console.error(error);

    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to generate excel",
    });
  }
});
