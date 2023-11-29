<template>
  <VueAwesomeSideBar
    v-model:miniMenu="miniMenu"
    v-model:collapsed="collapsed"
    :menu="testMenu"
    vueRouterEnabel
    width="100%"
  ></VueAwesomeSideBar>
</template>

<script setup>
const collapsed = ref(false);
const miniMenu = ref(false);

const testMenu = [
  {
    name: 'Dashboard',
    icon: { class: 'material-symbols-outlined', text: 'dashboard' },
    href: '/',
  },
  {
    name: 'Scraping',
    icon: { class: 'material-symbols-outlined', text: 'admin_panel_settings' },
    children: [
      {
        href: '/scraping/account',
        name: 'Scraping Account',
      },
      {
        href: '/scraping/task',
        name: 'Scraping Task',
      },
      {
        href: '/scraping/report',
        name: 'Scraping Report',
      },
    ],
  },
  {
    name: 'User Account',
    icon: { class: 'material-symbols-outlined', text: 'manage_accounts' },
    href: '/account',
  },
];
</script>
