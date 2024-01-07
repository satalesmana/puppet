export const getFormInput = (state: any) => {
  return state.formInput;
};

export const getOptAccountType = (state: any) => {
  return state.optAccountType;
};

export const clearFormInput = (state: any) => () => {
  const INITIAL_STATE = {
    name: '',
    type: '',
    email: '',
    password: '',
    phone: '',
  };

  state.formInput = INITIAL_STATE;
};

export const getListData = (state: any) => {
  return state.listTable.data;
};

export const setListData = (state: any) => (payload: any) => {
  state.listTable.data = payload;
};

export const isKupuAccout = (state: any) => {
  if (state.formInput.type === 'kupu') {
    return true;
  }
  return false;
};
