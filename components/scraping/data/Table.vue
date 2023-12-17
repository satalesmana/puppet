<script setup lang="ts">
import { useScrapingReportStore } from '~/stores/scrapingReport';
const scrapingReport = useScrapingReportStore();
const rowTable = computed(() => scrapingReport.getListData);
const columns = ref([
  {
    name: 'firstName',
    label: 'FIRST NAME',
    field: 'firstName',
    align: 'left',
  },
  {
    name: 'lastName',
    label: 'LAST NAME',
    field: 'lastName',
    align: 'left',
  },
  {
    name: 'email',
    label: 'EMAIL',
    field: 'email',
    align: 'left',
  },
  {
    name: 'phone',
    label: 'PHONE',
    field: 'phone',
    align: 'left',
  },
  {
    name: 'mostRecentJobTitle',
    label: 'RECENT JOB TITLE',
    field: 'mostRecentJobTitle',
    align: 'left',
  },
  {
    name: 'mostRecentCompanyName',
    label: 'RECENT COMPANY',
    field: 'mostRecentCompanyName',
    align: 'left',
  },
  {
    name: 'mostRecentRoleMonths',
    label: 'ROLE MONTH',
    field: 'mostRecentRoleMonths',
    align: 'left',
  },
]);

const fetTchData = async () => {
  const form = scrapingReport.formFilter;
  const { value } = await scrapingReport.fetchScrapingData(form);
  scrapingReport.setListData(value?.data);
};

defineExpose({
  fetTchData,
});
</script>

<template>
  <div class="q-pa-lg">
    <q-card class="my-card">
      <q-card-section>
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

          <!-- <template #body-cell-action="props">
            <q-td :props="props">
              <div class="row justify-between">
                <q-btn
                  size="xs"
                  rounded
                  color="primary"
                  icon="edit"
                  label="Edit"
                />
              </div>
            </q-td>
          </template> -->
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .q-card__section--vert {
  padding: 0;
}
</style>
