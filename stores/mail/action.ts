import { Loading, QSpinnerFacebook, Dialog } from 'quasar';

export const submitSendMail = async (payload: any) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading submiting data...',
    });

    const { $useApiFetch } = useNuxtApp();
    const { data: sendMail, error: errSubmit } = await $useApiFetch(
      '/api/mail/send',
      {
        method: 'post',
        body: { ...payload },
      },
    );

    if (errSubmit.value !== null) {
      throw errSubmit.value?.data;
    }

    Dialog.create({
      title: 'Info',
      message: sendMail.value.message,
    });
  } catch (err) {
    Dialog.create({
      title: 'Error',
      message: `<span class="text-red">${err?.message}</span>`,
      html: true,
    });
    throw err;
  } finally {
    Loading.hide();
  }
};

export const fetchMailData = async (request: any) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading fetch data...',
    });

    const { $useApiFetch } = useNuxtApp();
    const { data: mailData } = await $useApiFetch('/api/mail', {
      method: 'post',
      body: {
        filter: { status: request?.status },
        page: request?.page,
      },
    });

    return mailData;
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

export const deleteMailList = async (request: []) => {
  try {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Loading deleting data...',
    });
    const { $useApiFetch } = useNuxtApp();

    const deletedId = request.map((item: any) => item._id);

    const { error: errDelete } = await $useApiFetch(`/api/mail`, {
      method: 'delete',
      body: { deleted: deletedId },
    });
    if (errDelete.value !== null) {
      throw errDelete.value?.data;
    }

    Dialog.create({
      title: 'Info',
      message: 'data berhasil di hapus',
    });
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
