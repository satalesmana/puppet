import { Loading, QSpinnerFacebook, Dialog } from 'quasar';

export const fetchScrapingTask = async () => {
  const { $useApiFetch } = useNuxtApp();
  const { data: scrapingTask } = await $useApiFetch('/api/scraping/task');
  return scrapingTask;
};

export const submitScrapingTask = async (payload: any) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading submiting data...',
    });

    const { $useApiFetch } = useNuxtApp();
    const { data: scrapingTask, error: errorSubmit } = await $useApiFetch(
      '/api/scraping/task',
      {
        method: 'post',
        body: { ...payload },
      },
    );

    if (errorSubmit.value !== null) {
      throw errorSubmit.value?.data;
    }

    Dialog.create({
      title: 'Info',
      message: scrapingTask.value.message,
      html: true,
    });

    return scrapingTask;
  } catch (err) {
    Dialog.create({
      title: 'Error',
      message: `<span class="text-red">${err.message}</span>`,
      html: true,
    });
    throw err;
  } finally {
    Loading.hide();
  }
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

export const arsipkanTask = async (id: any) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading submiting data...',
    });

    const { $useApiFetch } = useNuxtApp();
    const { data: scrapingTask } = await $useApiFetch(
      `/api/scraping/task/arsip/${id}`,
      {
        method: 'post',
      },
    );

    console.log('scrapingTask', scrapingTask);
    Dialog.create({
      title: 'Info',
      message: scrapingTask.value.message,
      html: true,
    });

    return scrapingTask;
  } catch (err) {
    Dialog.create({
      title: 'Error',
      message: `<span class="text-red">${err.message}</span>`,
      html: true,
    });
    throw err;
  } finally {
    Loading.hide();
  }
};

export const jobstreetFetchPosition = async (account: any) => {
  try {
    const { $useApiFetch, $pinia } = useNuxtApp();

    const dataState = $pinia.state.value.scrapingTask.optPosition;
    if (dataState.length > 0) {
      return dataState;
    }

    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading fetch data...',
    });

    if (account.type === 'kupu') {
      const { data: optProviderKupu, error: errorProviderKupu } =
        await $useApiFetch(`/api/scraping/task/kupu/provider`, {
          method: 'post',
          body: { cookies: account.cookies },
        });

      if (errorProviderKupu.value !== null) {
        throw errorProviderKupu.value?.data;
      }

      return optProviderKupu.value;
    } else {
      const { data: optJobtreetPosition, error: errorFetch } =
        await $useApiFetch(`/api/scraping/task/position/${account.value}`, {
          method: 'post',
        });

      if (errorFetch.value !== null) {
        throw errorFetch.value?.data;
      }

      return optJobtreetPosition.value;
    }
  } catch (err) {
    Loading.hide();
    Dialog.create({
      title: 'Error',
      message: `<span class="text-red">${err.message}</span>`,
      html: true,
    });
    throw err;
  } finally {
    Loading.hide();
  }
};

export const jobstreetFetchBiller = async () => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading fetch data...',
    });

    const { $useApiFetch, $pinia } = useNuxtApp();

    const state = $pinia.state.value.scrapingTask.formInput;

    const { data: optJobtreetPosition, error: errorFetch } = await $useApiFetch(
      `/api/scraping/task/biller/${state.scraping_account._id}`,
      {
        method: 'post',
        body: { position_id: state.initial_id },
      },
    );

    const { data } = optJobtreetPosition.value;
    $pinia.state.value.scrapingTask.formInput.biller_id = data.billingId;

    Loading.hide();
    return data;
  } catch (err) {
    Loading.hide();
    Dialog.create({
      title: 'Error',
      message: `<span class="text-red">${err.message}</span>`,
      html: true,
    });
    throw err;
  }
};
