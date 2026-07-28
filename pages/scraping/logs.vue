<script setup>
import { useScrapingReportStore } from '~/stores/scrapingReport';
const scrapingReport = useScrapingReportStore();
const { $useApiFetch } = useNuxtApp();

const scraingTaskTableRef = ref([]);
const showLogs = ref(true);
const logs = ref('');
const fetchInprogresTask = async () => {
  const { value } = await scrapingReport.fetchScrapingTask({
    status: 'in progress',
  });
  scrapingReport.setTaskInprogres(value?.data);
};
let nIntervId;
let poolingInterval;
const loadingStart = () => {
  const flashText = () => {
    logs.value += '.';
  };

  // check if an interval has already been set up
  if (!nIntervId) {
    nIntervId = setInterval(flashText, 1000);
  }
};

const loadingEnd = () => {
  logs.value += '\n';
  clearInterval(nIntervId);
  clearInterval(poolingInterval);
  // release our intervalID from the variable
  nIntervId = null;
  poolingInterval = null;
};

const clearLogs = async () => {
  logs.value += '\n';
  await $useApiFetch('/api/scraping/clear', { method: 'POST' });
};

// start polling logs and status every second
const pollLogs = async () => {
  try {
    const { data } = await $useApiFetch('/api/scraping/logs');
    const serverLogs = data.value.logs || [];
    // join logs array into a single string for display
    logs.value = serverLogs.join('\n');
    // if scraping is done, refresh queue/task table
    if (data.value.status === 'done') {
      scraingTaskTableRef.value.fetTchData();
      loadingEnd();
    }
  } catch (err) {
    // ignore polling errors
    // console.error('pollLogs', err);
  }
};

onNuxtReady(async () => {
  await fetchInprogresTask();
  scraingTaskTableRef.value.fetTchData();
  clearLogs();

  // initial poll and interval
  await pollLogs();
  poolingInterval = setInterval(pollLogs, 2000);
});

onUnmounted(() => {
  loadingEnd();
});

const startScraping = async () => {
  const { $useApiFetch } = useNuxtApp();
  try {
    await $useApiFetch('/api/scraping/start', { method: 'post' });
    loadingEnd();
    await pollLogs();
    poolingInterval = setInterval(pollLogs, 2000);
    // clear client logs and start polling will pick up server logs
    // logs.value = '';
    loadingStart();
  } catch (err) {
    console.error('failed to start scraping', err);
  }
};
</script>

<template>
  <div>
    <q-card-section>
      <div class="q-ma-lg q-gutter-sm">
        <q-btn color="primary" @click="startScraping">Start Scraping</q-btn>
        <q-btn color="secondary" @click="clearLogs"> Clear Log </q-btn>
      </div>
      <div class="q-ma-lg">
        <transition
          name="custom-classes-transition"
          enter-active-class="swing-in-top-fwd"
          leave-active-class="swing-out-top-bck"
        >
          <pre v-if="showLogs" class="bg-blue-grey-2 q-pa-md">{{ logs }}</pre>
        </transition>
      </div>

      <div class="q-ma-lg">
        <span class="text-h6">Daftar antrian</span>
        <scraping-logs-task-table ref="scraingTaskTableRef" />
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
