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

    const filePath = '/public/file.xlsx';
    await writeXlsxFile(data, {
      schema,
      filePath: `.${filePath}`,
    });

    return { data: filePath, message: '' } as ApiResponse<string, string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
