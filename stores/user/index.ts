import state from './state';
import * as actions from './action';
import * as getters from './getters';

export const useUsersStore = defineStore('users', {
  state,
  getters: { ...getters },
  actions: { ...actions },
});
