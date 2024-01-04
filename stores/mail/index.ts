import state from './state';
import * as actions from './action';
import * as getters from './getters';

export const useMailStore = defineStore('mail', {
  state,
  getters: { ...getters },
  actions: { ...actions },
});
