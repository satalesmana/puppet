import { User } from '~/server/models/User.model'
import type { ApiResponse }  from '~/server/types/apiresponse.interface';
import bcrypt from 'bcryptjs'

export default defineEventHandler(async event => {
  const body = await readFormData(event);
  const config = useRuntimeConfig();
  try{
    const name = body.get("name")
    const email = body.get("email")
    const password = body.get("password")

    if(name === '') throw new Error('name harus di isi')
    if(password === '') throw new Error('password harus di isi')

    const cekMail = await User.findOne({ email })
    if(cekMail)  throw new Error('email already exist')

    const salt = bcrypt.genSaltSync(config.saltRounds);
    const passwordHas = await bcrypt.hashSync(password, salt)

    const res = await User.create({
      name : name,
      email : email,
      password : passwordHas
    });

    return {data: res, message:'user hasbeen saved'} as ApiResponse<[], string>
  }catch(error){
    return error as ApiResponse<[],string>;
  }
});
