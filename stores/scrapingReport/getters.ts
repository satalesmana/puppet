export const getOptScrapingTask = (state: any) => {
  return state.optTask;
};

export const getOptScrapingAccount = (state: any) => {
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

export const setOptScrapingTask = (state: any) => (payload: any) => {
  const optList = payload.map((item: any) => {
    return {
      value: item._id,
      label: `${item.code}`,
      ...item,
    };
  });

  state.optTask = optList;
};

export const getScrapingStatus = (state: any) => {
  return state.optStatus;
};

export const getListData = (state: any) => {
  return state.listTable.data;
};

export const getListDataLogs = (state: any) => {
  return state.listTableLogs.data;
};

export const setListData = (state: any) => (payload: any) => {
  state.listTable.data = payload;
};

export const setListDataLogs = (state: any) => (payload: any) => {
  state.listTableLogs.data = payload;
};

export const clearFormFilter = (state: any) => () => {
  const INITIAL_STATE = {
    scraping_account: '',
    task_status: '',
    task: '',
  };
  state.formFilter = { ...state.formFilter, ...INITIAL_STATE };
};

export const getTaskInprogres = (state: any) => {
  return state.taskInprogres;
};

export const setTaskInprogres = (state: any) => (payload: any) => {
  state.taskInprogres = payload;
};
