<script setup>
import { useScrapingReportStore } from '~/stores/scrapingReport';
const scrapingReport = useScrapingReportStore();

const progress = ref(0.1);
const scraingTaskTableRef = ref([]);
const showLogs = ref(true);
const togleShowLogs = () => {
  showLogs.value = !showLogs.value;
};

const logs = ref('');

const inProgresTask = computed(() => scrapingReport.getTaskInprogres);
const fetchInprogresTask = async () => {
  const { value } = await scrapingReport.fetchScrapingTask({
    status: 'in progress',
  });
  scrapingReport.setTaskInprogres(value?.data);
};
let nIntervId;
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
  // release our intervalID from the variable
  nIntervId = null;
};

onNuxtReady(async () => {
  await fetchInprogresTask();
  scraingTaskTableRef.value.fetTchData();

  $io.on('create logs', (data) => {
    logs.value += `${data}`;
  });

  $io.on('done scraping', () => {
    logs.value = '';
  });

  $io.on('loading start', () => {
    loadingStart();
  });

  $io.on('loading end', () => {
    loadingEnd();
  });
});

const { $io } = useNuxtApp();
const startScraping = () => {
  $io.emit('start scraping');
};
</script>

<template>
  <div>
    <q-card-section>
      <div class="q-ma-lg">
        <q-btn color="primary" @click="startScraping">Start Scraping</q-btn>
      </div>
      <!-- v-if="inProgresTask.length > 0" -->
      <div class="q-ma-lg">
        <!-- <span class="text-h6">Task In Progres </span>
        <p>
          {{ inProgresTask[0]?.code }}- Counter page
          {{ inProgresTask[0]?.counter }} - expected data
          {{ inProgresTask[0]?.counter * 20 }} | Created by
          {{ inProgresTask[0]?.created_by.name }}
        </p>
        <q-linear-progress size="10px" :value="progress" />
        <a
          href="javascript:void(0);"
          class="show-logs q-gutter-md row"
          @click="togleShowLogs"
        >
          <q-spinner-ios />
          <p>fetched data 20</p>
        </a> -->

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
