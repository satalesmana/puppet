<script setup lang="ts">
import { useScrapingReportStore } from '~/stores/scrapingReport';
const scrapingReport = useScrapingReportStore();
const rowTable = computed(() => scrapingReport.getListDataLogs);
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
  {
    name: 'status',
    label: 'STATUS',
    field: 'status',
    align: 'left',
  },
]);

const fetTchData = async () => {
  const { value } = await scrapingReport.fetchScrapingTask({ status: 'open' });
  scrapingReport.setListDataLogs(value?.data);
};

defineExpose({
  fetTchData,
});
</script>

<template>
  <q-table
    :rows="rowTable"
    row-key="name"
    table-header-class="text-white bg-blue"
    virtual-scroll
    flat
    bordered
    :columns="columns"
  >
    <template #body-cell-scraping_account="props">
      <q-td :props="props">
        <div class="text-body2 text-weight-medium">
          {{ props.row.scraping_account.email }}
        </div>
        <div class="text-caption">
          {{ props.row.scraping_account.type }}
        </div>
      </q-td>
    </template>

    <template #body-cell-counter="props">
      <q-td :props="props"> {{ props.row.counter }} Times </q-td>
    </template>

    <template #body-cell-created_by="props">
      <q-td :props="props">
        {{ props.row.created_by.name }}
      </q-td>
    </template>
  </q-table>
</template>

<style lang="scss" scoped>
:deep(.q-card__section--vert) {
  padding: 0;
}
</style>
