export const getOptScrapingTask = (state: any) => {
  return state.optScrapingAccount;
};

export const setOptScrapingAccount = (state: any) => (payload: any) => {
  const optList = payload.map((item) => {
    return {
      value: item._id,
      label: `${item.code}`,
      ...item,
    };
  });

  state.optScrapingAccount = optList;
};
