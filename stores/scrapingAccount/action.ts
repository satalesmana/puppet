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

    Dialog.create({
      title: 'Info',
      message: scrapingAccount.value.message,
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

export const loginScrapingAccount = async (row: any) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading login account...',
    });
    const { $useApiFetch } = useNuxtApp();
    const { data: loginScrapingAccount, error: errLoginScrapingAccount } =
      await $useApiFetch(`/api/scraping/account/login/${row._id}`, {
        method: 'post',
      });
    if (errLoginScrapingAccount.value !== null) {
      throw errLoginScrapingAccount.value?.data;
    }

    if (row.type === 'kupu') {
      Dialog.create({
        title: 'Prompt',
        message: 'Please input token',
        prompt: {
          model: '',
          isValid: (val) => val.length > 2,
          type: 'text',
        },
        cancel: true,
        persistent: true,
      }).onOk(async (data) => {
        await kupuSendOTPLogin(row._id, data);
      });
    }

    if (row.type !== 'kupu') {
      Dialog.create({
        title: 'Info',
        message: loginScrapingAccount.value.message,
      });
    }

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

export const kupuSendOTPLogin = async (id: any, otp: string) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading login account...',
    });

    const { $useApiFetch } = useNuxtApp();
    const { data: loginKupu, error: errLoginKupu } = await $useApiFetch(
      `/api/scraping/account/kupu/get-token`,
      {
        method: 'post',
        body: { _id: id, otp },
      },
    );

    if (errLoginKupu.value !== null) {
      throw errLoginKupu.value?.data;
    }

    Dialog.create({
      title: 'Info',
      message: loginKupu.value.message,
    });

    return loginKupu;
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

export const logOutScrapingAccount = async (id: any) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading login account...',
    });
    const { $useApiFetch } = useNuxtApp();
    const { data: logOutScrapingAccount, error: errLoginOutScrapingAccount } =
      await $useApiFetch(`/api/scraping/account/logout/${id}`, {
        method: 'post',
      });
    if (errLoginOutScrapingAccount.value !== null) {
      throw errLoginOutScrapingAccount.value?.data;
    }
    Loading.hide();

    Dialog.create({
      title: 'Info',
      message: logOutScrapingAccount.value.message,
    });
    return logOutScrapingAccount;
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
