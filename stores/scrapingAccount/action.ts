export const fetchScrapingAccount = async () => {
  const { $useApiFetch } = useNuxtApp();
  const { data: scrapingAccount } = await $useApiFetch('/api/scraping/account');
  return scrapingAccount;
};

export const submitUser = async (payload: any) => {
  const { $useApiFetch } = useNuxtApp();
  const { data: scrapingAccount } = await $useApiFetch(
    '/api/scraping/account',
    {
      method: 'post',
      body: { ...payload },
    },
  );

  return scrapingAccount;
};

export const deleteScrapingAccount = async (id: any) => {
  const { $useApiFetch } = useNuxtApp();
  const { data: scrapingAccount } = await $useApiFetch(
    `/api/scraping/account/${id}`,
    {
      method: 'delete',
    },
  );

  return scrapingAccount;
};
