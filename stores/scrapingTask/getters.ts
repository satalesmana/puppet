export const getFormInput = (state: any) => {
  return state.formInput;
};

export const clearFormInput = (state: any) => () => {
  const INITIAL_STATE = {
    scraping_account: '',
    initial_id: '',
    biller_id: '',
    positionId: '',
    initial_page: '',
    counter: '',
    status: 'open',
  };

  state.formInput = INITIAL_STATE;
};

export const getListData = (state: any) => {
  return state.listTable.data;
};

export const setListData = (state: any) => (payload: any) => {
  state.listTable.data = payload;
};

export const getOptScrapingTask = (state: any) => {
  return state.optScrapingAccount;
};

export const setOptScrapingAccount = (state: any) => (payload: any) => {
  const optList = payload.map((item: any) => {
    const label = item.type === 'kupu' ? item.phone : item.email;
    return {
      value: item._id,
      label: `${item.name} (${label})`,
      ...item,
    };
  });

  state.optScrapingAccount = optList;
};

export const getOptPosition = (state: any) => {
  return state.optPosition;
};

export const setOptPosition = (state: any) => (payload: any) => {
  const optList = [];
  const isKupuAccount = isKupuAccout(state);
  for (let i = 0; i < payload.length; i++) {
    if (payload[i].jobId != null && !isKupuAccount)
      optList.push({
        value: payload[i].jobId,
        label: `${payload[i].jobId} ${payload[i].title} (${payload[i].status})`,
        ...payload[i],
      });

    if (isKupuAccount) {
      optList.push({
        value: payload[i].id,
        label: payload[i].jobTitle,
        ...payload[i],
      });
    }
  }

  state.optPosition = optList;
};

export const isKupuAccout = (state: any) => {
  if (state.formInput.scraping_account?.type === 'kupu') {
    return true;
  }
  return false;
};

export const getSubmitForm = (state: any) => {
  return {
    ...state.formInput,
    scraping_account: state.formInput.scraping_account?._id,
    initial_id: state.formInput.initial_id?.value,
  };
};
