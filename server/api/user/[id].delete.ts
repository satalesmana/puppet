import { User } from '~/server/models/User.model'
import type { ApiResponse }  from '~/server/types/apiresponse.interface';

export default defineEventHandler(async event => {
  try{
    const { params } = event.context

    const { deletedCount } = await User.deleteOne({_id:params?.id});
    if(deletedCount <= 0) throw new Error('delete failed')

    return {data: [], message:'delete success'} as ApiResponse<[], string>
  }catch(error){
    return error as ApiResponse<[],string>;
  }
});
