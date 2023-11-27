
export const fetchUsers = async () =>{
    const { $useApiFetch } = useNuxtApp()
    const { data: users } = await $useApiFetch('/api/user')
    return users
}

export const submitUser = async (payload:any) =>{
  const { $useApiFetch } = useNuxtApp()
  const { data: users } = await $useApiFetch('/api/user',{
    method: 'post',
    body: {...payload }
  })

  return users
}
