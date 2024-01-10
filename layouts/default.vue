<script setup lang="ts">
import { ref } from 'vue';
definePageMeta({ middleware: 'auth' });
const { data } = useAuth();

const { signOut } = useAuth();
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const onLogout = () => {
  signOut({ callbackUrl: '/login' });
};
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Puppet </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-scroll-area
        style="
          height: calc(100% - 200px);
          margin-top: 200px;
          border-right: 1px solid #ddd;
        "
      >
        <Sidebar />
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="/assets/img/material.png"
        style="height: 200px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="~/assets/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold text-h6">{{ data?.name }}</div>
          <div class="text-italic">{{ data?.id }}</div>

          <q-btn
            class="full-width q-mt-lg"
            rounded
            color="red"
            @click="onLogout"
          >
            Logout
          </q-btn>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container class="bg-grey-2" style="min-height: 100vh">
      <slot />
    </q-page-container>
  </q-layout>
</template>
