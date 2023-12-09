import state from './state';
import * as actions from './action';
import * as getters from './getters';

export const useScrapingReportStore = defineStore('scrapingReport', {
  state,
  getters: { ...getters },
  actions: { ...actions },
});
