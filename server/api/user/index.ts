import { User } from '~/server/models/User.model'
import type { ApiResponse }  from '~/server/types/apiresponse.interface';

export default defineEventHandler(async event => {
  try{

    const res = await User.find();

    return {data: res, message:''} as ApiResponse<[], string>
  }catch(error){
    return error as ApiResponse<[],string>;
  }
});
