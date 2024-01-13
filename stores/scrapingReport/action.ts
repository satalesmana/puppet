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
    const url =
      form.scraping_account.type === 'kupu'
        ? '/api/scraping/kupu/data'
        : '/api/scraping/jobstreet/data';

    const { data: scrapingTask } = await $useApiFetch(url, {
      method: 'post',
      body: { filter: { ...filter } },
    });
    return scrapingTask;
  } catch (err) {
    console.error('[ERR fetchScrapingAccount]', err);
    throw err?.message;
  } finally {
    Loading.hide();
  }
};

export const fetchDownload = async (form: any) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading fetch data...',
    });

    const filter = {
      'scraping_task._id': form.task,
    };

    const { $useApiFetch } = useNuxtApp();
    const url =
      form.scraping_account.type === 'kupu'
        ? '/api/scraping/task/export-excel-kupu'
        : '/api/scraping/task/export-excel';

    const { data: scrapingTask } = await $useApiFetch(url, {
      method: 'post',
      body: { filter: { ...filter } },
    });
    return scrapingTask;
  } catch (err) {
    console.error('[ERR fetchScrapingAccount]', err);
    throw err?.message;
  } finally {
    Loading.hide();
  }
};
