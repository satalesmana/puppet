export const getComposeForm = (state: any) => {
  return state.compose;
};

export const setComposeForm = (state: any) => (payload: any) => {
  state.compose = { ...state.compose, ...payload };
};

export const clearComposeForm = (state: any) => () => {
  const INITIAL_STATE = {
    mode: 'manual', // manual //task
    to: '',
    task: '',
    message: '',
  };

  state.compose = INITIAL_STATE;
};

export const getIsinputManual = (state: any) => {
  const { mode } = state.compose;
  return mode === 'manual';
};

export const setOptTask = (state: any) => (payload: any) => {
  const item = payload.map((data: any) => {
    return {
      label: data.code,
      value: data.code,
      ...data,
    };
  });
  state.optTask = item;
};

export const getOptTask = (state: any) => {
  return state.optTask;
};
