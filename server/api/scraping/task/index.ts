import { ScrapingTask } from '~/server/models/ScrapingTask.model'
import type { ApiResponse }  from '~/server/types/apiresponse.interface';

export default defineEventHandler(async event => {
  try{
    const { id } = getMetadata(event)

    const res = await ScrapingTask.find({"created_by.email":id});

    return {data: res, message:''} as ApiResponse<[], string>
  }catch(error){
    return error as ApiResponse<[],string>;
  }
});
