export const getFormInput = (state: any) => {
  return state.formInput;
};

export const clearFormInput = (state: any) => () => {
  const INITIAL_STATE = {
    scraping_account: '',
    initial_id: '',
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
  const optList = payload.map((item) => {
    return {
      value: item._id,
      label: item.name,
      ...item,
    };
  });

  state.optScrapingAccount = optList;
};
