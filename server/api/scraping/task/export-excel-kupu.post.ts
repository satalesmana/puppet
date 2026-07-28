import writeXlsxFile from 'write-excel-file/node';
import { ScrapingPelamarKupu } from '~/server/models/ScrapingPelamarKupu.model';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const filter = body?.filter || {};

    const data = await ScrapingPelamarKupu.find(filter).lean();

    const schema = [
      {
        column: 'Telpon',
        type: String,
        value: (val: any) => `+62${val.phone?.replace(/\s/g, '') ?? ''}`,
      },
      {
        column: 'Name',
        type: String,
        value: (val: any) => val.realName ?? '',
      },
      {
        column: 'Email',
        type: String,
        value: (val: any) => val.email ?? '',
      },
    ];

    const buffer = await writeXlsxFile(data, {
      schema,
      buffer: true,
    });

    setHeader(
      event,
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    setHeader(
      event,
      'Content-Disposition',
      `attachment; filename="phone_${Date.now()}.xlsx"`,
    );

    setHeader(event, 'Content-Length', buffer.length);

    return buffer;
  } catch (error: any) {
    console.error(error);

    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to generate excel',
    });
  }
});
