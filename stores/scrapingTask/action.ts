export const fetchScrapingTask = async () => {
  const { $useApiFetch } = useNuxtApp();
  const { data: scrapingTask } = await $useApiFetch('/api/scraping/task');
  return scrapingTask;
};

export const submitScrapingTask = async (payload: any) => {
  const { $useApiFetch } = useNuxtApp();
  const { data: scrapingTask } = await $useApiFetch('/api/scraping/task', {
    method: 'post',
    body: { ...payload },
  });

  return scrapingTask;
};

export const deleteScrapingTask = async (id: any) => {
  const { $useApiFetch } = useNuxtApp();
  const { data: scrapingTask } = await $useApiFetch(
    `/api/scraping/task/${id}`,
    {
      method: 'delete',
    },
  );

  return scrapingTask;
};
