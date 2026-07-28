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
    let url = '/api/scraping/jobstreet/data' ;
    if(form.scraping_account.type === 'kupu'){
      url = '/api/scraping/kupu/data';
    }

    if(form.scraping_account.type === 'glints'){
      url = '/api/scraping/glints/data';
    }

    if(form.scraping_account.type === 'indeed'){
      url = '/api/scraping/indeed/data';
    }

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
    let url = '/api/scraping/task/export-excel' ;
    if(form.scraping_account.type === 'kupu'){
      url = '/api/scraping/task/export-excel-kupu';
    }

    if(form.scraping_account.type === 'glints'){
      url = '/api/scraping/task/export-excel-glints';
    }

    if(form.scraping_account.type === 'indeed'){
      url = '/api/scraping/task/export-excel-indeed';
    }

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
