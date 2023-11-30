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
  try {
    // const confirm =  Dialog.create({
    //   title: 'Confirm',
    //   message: 'Would you like to delete this data?',
    //   cancel: true,
    //   persistent: true,
    // }).onOk(() => {
    //   return true;
    // });

    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading deleting data...',
    });
    const { $useApiFetch } = useNuxtApp();
    const { data: scrapingAccount, error: errDelete } = await $useApiFetch(
      `/api/scraping/account/${id}`,
      {
        method: 'delete',
      },
    );
    if (errDelete.value !== null) {
      throw errDelete.value?.data;
    }
    Loading.hide();
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

export const loginScrapingAccount = async (id: any) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading login account...',
    });
    const { $useApiFetch } = useNuxtApp();
    const { data: loginScrapingAccount, error: errLoginScrapingAccount } =
      await $useApiFetch(`/api/scraping/account/login/${id}`, {
        method: 'post',
      });
    if (errLoginScrapingAccount.value !== null) {
      throw errLoginScrapingAccount.value?.data;
    }
    Loading.hide();
    return loginScrapingAccount;
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
