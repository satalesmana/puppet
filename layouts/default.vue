<script setup lang="ts">
import { ref } from "vue";

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
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

    <q-drawer v-model="leftDrawerOpen" show-if-above >
      <div class="q-scrollarea" style="height: calc(100% - 204px); margin-top: 204px">
        <div class="q-scrollarea__container scroll relative-position fit hide-scrollbar" >
          <div class="q-scrollarea__content absolute">
            <Sidebar/>
          </div>
        </div>
      </div>

      <div class="q-img q-img--menu absolute-top" role="img" style="height: 204px" >
        <div class="q-img__container absolute-full">
          <img
            class="q-img__image q-img__image--with-transition q-img__image--loaded"
            loading="lazy"
            fetchpriority="auto"
            aria-hidden="true"
            draggable="false"
            src="~/assets/img/material.png"
            style="object-fit: cover; object-position: 50% 50%"
          />
        </div>
        <div class="q-img__content absolute-full q-anchor--skip">
          <div class="absolute-bottom bg-transparent">
            <div class="q-avatar q-mb-sm" style="font-size: 56px">
              <div class="q-avatar__content row flex-center overflow-hidden">
                <img src="~/assets/img/boy-avatar.png" />
              </div>
            </div>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>
