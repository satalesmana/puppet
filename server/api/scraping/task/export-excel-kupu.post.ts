import writeXlsxFile from 'write-excel-file/node';
import { ScrapingPelamarKupu } from '~/server/models/ScrapingPelamarKupu.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const filter = body?.filter || {};

    const data = await ScrapingPelamarKupu.find(filter);

    const schema = [
      {
        column: 'Telpon',
        type: String,
        value: (val: any) => `+62${val.phone.replace(/\s/g, '')}`,
      },
      {
        column: 'Name',
        type: String,
        value: (val: any) => val.realName,
      },
      {
        column: 'Email',
        type: String,
        value: (val: any) => val.email,
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
