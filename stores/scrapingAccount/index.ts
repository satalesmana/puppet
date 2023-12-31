import state from './state';
import * as actions from './action';
import * as getters from './getters';

export const useScrapingAccountStore = defineStore('scrapingAccount', {
  state,
  getters: { ...getters },
  actions: { ...actions },
});
