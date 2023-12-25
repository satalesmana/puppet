import writeXlsxFile from 'write-excel-file/node';
import { ScrapingJobstreetPelamar } from '~/server/models/ScrapingPelamarJobstreet.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const filter = body?.filter || {};

    const data = await ScrapingJobstreetPelamar.find(filter);

    const schema = [
      {
        column: 'Name',
        type: String,
        value: (val: any) => `${val.firstName} ${val.lastName}`,
      },
      {
        column: 'Email',
        type: String,
        value: (val: any) => val.email,
      },
      {
        column: 'Telpon',
        type: String,
        value: (val: any) => val.phone.replace(/\s/g, ''),
      },
    ];

    const timeer = Date.now();
    const fileName = `downloads/phone_${timeer}.xlsx`;
    await writeXlsxFile(data, {
      schema,
      filePath: `./public/${fileName}`,
    });

    return { data: fileName, message: '' } as ApiResponse<string, string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
