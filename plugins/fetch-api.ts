export default defineNuxtPlugin(() => {
  return {
    provide: {
      useApiFetch: async (url: string, options:any={}) =>{
        return useFetch(url, {
          // baseURL: config.API_URL,
          async onRequest(ctx) {
              const accessToken = await useCookie('auth:token' ,{ default: undefined })
              if (accessToken !== undefined) {
                    ctx.options.headers = new Headers(ctx.options.headers)
                    ctx.options.headers.append('Authorization', `Bearer ${accessToken.value}`)
              }
          },
          ...options
        });
      }
    }
  }
})
