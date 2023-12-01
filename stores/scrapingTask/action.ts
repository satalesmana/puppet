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

export const jobstreetFetchPosition = async (id: any) => {
  const { $useApiFetch, $pinia } = useNuxtApp();

  const dataState = $pinia.state.value.scrapingTask.optPosition;
  if (dataState.length > 0) {
    return dataState;
  }

  const { data: optJobtreetPosition } = await $useApiFetch(
    `/api/scraping/task/position/${id}`,
    {
      method: 'post',
    },
  );

  return optJobtreetPosition.value;
};

export const jobstreetFetchBiller = async () => {
  const { $useApiFetch, $pinia } = useNuxtApp();

  const state = $pinia.state.value.scrapingTask.formInput;

  const { data: optJobtreetPosition } = await $useApiFetch(
    `/api/scraping/task/biller/${state.scraping_account}`,
    {
      method: 'post',
      body: { position_id: state.initial_id },
    },
  );

  const { data } = optJobtreetPosition.value;
  $pinia.state.value.scrapingTask.formInput.biller_id = data.billingId;

  return data;
};
