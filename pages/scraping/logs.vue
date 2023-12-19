<script setup>
const progress = ref(0.1);
const columns = ref([
  {
    name: 'code',
    label: 'CODE',
    field: 'code',
    align: 'left',
  },
  {
    name: 'scraping_account',
    label: 'ACCOUNT TO SCRAP',
    field: '_id',
    align: 'left',
  },
  {
    name: 'initial_id',
    label: 'INITIAL ID',
    field: 'initial_id',
    align: 'left',
  },
  {
    name: 'initial_page',
    label: 'INITIAL PAGE',
    field: 'initial_page',
    align: 'left',
  },
  {
    name: 'counter',
    label: 'COUNTER',
    field: 'counter',
    align: 'left',
  },
  {
    name: 'created_by',
    label: 'CRATED BY',
    field: '_id',
    align: 'left',
  },
]);

const showLogs = ref(false);
const togleShowLogs = () => {
  showLogs.value = !showLogs.value;
};
const logs = ref('');

let nIntervId;
const flashText = () => {
  console.log('asdf');
  logs.value += '[2:37 PM, 12/19/2023] Account 1: asdf asdf \n';
};
const fetchLogs = () => {
  // check if an interval has already been set up
  if (!nIntervId) {
    nIntervId = setInterval(flashText, 2000);
  }
};

const stopFetchLogs = () => {
  logs.value = '';
  clearInterval(nIntervId);
  // release our intervalID from the variable
  nIntervId = null;
};

onNuxtReady(() => {
  stopFetchLogs();
  fetchLogs();
});

onUnmounted(() => {
  stopFetchLogs();
});
</script>

<template>
  <div>
    <q-card-section>
      <div class="q-ma-lg">
        <span class="text-h6">Task In Progres </span>
        <p>TSK-00000001 - Total page 10 - expected data 120</p>
        <q-linear-progress size="10px" :value="progress" />
        <a
          href="javascript:void(0);"
          class="show-logs q-gutter-md row"
          @click="togleShowLogs"
        >
          <q-spinner-ios />
          <p>fetched data 20</p>
        </a>

        <transition
          name="custom-classes-transition"
          enter-active-class="swing-in-top-fwd"
          leave-active-class="swing-out-top-bck"
        >
          <!-- [2:37 PM, 12/19/2023] Account 1: asdf asdf -->
          <pre v-if="showLogs" class="bg-blue-grey-2 q-pa-md">{{ logs }}</pre>
        </transition>
      </div>

      <div class="q-ma-lg">
        <span class="text-h6">Daftar antrian</span>
        <q-table
          :rows="[]"
          row-key="name"
          table-header-class="text-white bg-blue"
          virtual-scroll
          flat
          bordered
          :columns="columns"
        />
      </div>
    </q-card-section>
  </div>
</template>

<style lang="scss" scoped>
.show-logs {
  text-decoration: none;
}
pre {
  display: block;
  unicode-bidi: embed;
  font-family: monospace;
  white-space: pre;
  height: 200px;
  overflow: scroll;
}
</style>
