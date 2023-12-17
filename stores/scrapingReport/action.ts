import { Loading, QSpinnerFacebook, Dialog } from 'quasar';

export const fetchScrapingAccount = async () => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading fetch data...',
    });

    const { $useApiFetch } = useNuxtApp();
    const { data: scrapingAccount } = await $useApiFetch(
      '/api/scraping/account',
    );

    return scrapingAccount;
  } catch (err) {
    console.error('[ERR fetchScrapingAccount]', err);
    throw err?.message;
  } finally {
    Loading.hide();
  }
};

export const fetchScrapingTask = async (filter: any) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading fetch data...',
    });

    const { $useApiFetch } = useNuxtApp();
    const { data: scrapingTask } = await $useApiFetch(
      '/api/scraping/task/all',
      {
        method: 'post',
        body: { filter: { ...filter } },
      },
    );
    return scrapingTask;
  } catch (err) {
    console.error('[ERR fetchScrapingAccount]', err);
    throw err?.message;
  } finally {
    Loading.hide();
  }
};

export const fetchScrapingData = async (form: any) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading fetch data...',
    });

    const filter = {
      'scraping_task._id': form.task,
    };

    const { $useApiFetch } = useNuxtApp();
    const { data: scrapingTask } = await $useApiFetch(
      '/api/scraping/jobstreet/data',
      {
        method: 'post',
        body: { filter: { ...filter } },
      },
    );
    return scrapingTask;
  } catch (err) {
    console.error('[ERR fetchScrapingAccount]', err);
    throw err?.message;
  } finally {
    Loading.hide();
  }
};
