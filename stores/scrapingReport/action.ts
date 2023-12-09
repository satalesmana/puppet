import { Loading, QSpinnerFacebook, Dialog } from 'quasar';

export const fetchScrapingTask = async () => {
  const { $useApiFetch } = useNuxtApp();
  const { data: scrapingTask } = await $useApiFetch('/api/scraping/task/all', {
    method: 'post',
  });
  return scrapingTask;
};
