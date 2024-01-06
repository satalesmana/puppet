import { MailMessages } from '~/server/models/MailMessages.model';
import type {
  ApiResponse,
  ApiResponsePagination,
} from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { id } = getMetadata(event);
    const filter = body?.filter || {};
    const page = body?.page || 1;
    const skip = page > 1 ? (page - 1) * 10 : 0;

    const res = await MailMessages.find({
      'created_by.email': id,
      ...filter,
    })
      // .sort({
      //   creted_at: 'descending',
      // })
      .skip(skip)
      .limit(10);

    const rowsNumber = await MailMessages.countDocuments({
      'created_by.email': id,
      ...filter,
    });

    const pagination = {
      page,
      rowsPerPage: 10,
      rowsNumber,
    };
    return {
      data: res,
      pagination,
      message: '',
    } as ApiResponsePagination<[], any, string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
