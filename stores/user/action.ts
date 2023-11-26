
export const fetchUsers = async () =>{
    const { $useApiFetch } = useNuxtApp()
    return await $useApiFetch('/api/user')

}

export const submitUser = async (payload:any) =>{
console.log('tes')
}
