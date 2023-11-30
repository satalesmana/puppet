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
    Loading.hide();
    return scrapingAccount;
  } catch (err) {
    Loading.hide();
    return err;
  }
};

export const submitUser = async (payload: any) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading submit data...',
    });
    const { $useApiFetch } = useNuxtApp();
    const { data: scrapingAccount, error: errSubmit } = await $useApiFetch(
      '/api/scraping/account',
      {
        method: 'post',
        body: { ...payload },
      },
    );
    Loading.hide();
    if (errSubmit.value !== null) {
      throw errSubmit.value?.data;
    }

    Dialog.create({
      title: 'Info',
      message: scrapingAccount.value.message,
      html: true,
    });

    return scrapingAccount;
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
