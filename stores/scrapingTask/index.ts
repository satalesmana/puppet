import state from './state';
import * as actions from './action';
import * as getters from './getters';

export const useScrapingTaskStore = defineStore('scrapingTask', {
  state,
  getters: { ...getters },
  actions: { ...actions },
});
