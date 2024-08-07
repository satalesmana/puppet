<script setup lang="ts">
import { useScrapingReportStore } from '~/stores/scrapingReport';
const scrapingReport = useScrapingReportStore();
const rowTable = computed(() => scrapingReport.getListData);
const showTable = ref(false);
const columns = ref([]) as any;

const setColums = (type: string) => {
  if (type === 'kupu') {
    columns.value = [
      {
        name: 'photo',
        label: 'FOTO',
        field: 'photo',
        align: 'left',
      },
      {
        name: 'realName',
        label: 'FULL NAME',
        field: 'realName',
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
        name: 'ageFmt',
        label: 'USIA',
        field: 'ageFmt',
        align: 'left',
      },

      {
        name: 'levelName',
        label: 'PENDIDIKAN TERAKHIR',
        field: 'levelName',
        align: 'left',
      },
    ];
  } else {
    columns.value = [
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
    ];
  }
};

const fetTchData = async () => {
  const form = scrapingReport.formFilter;

  const { value } = await scrapingReport.fetchScrapingData(form);
  scrapingReport.setListData(value?.data);

  setColums(form.scraping_account?.type);
  showTable.value = true;
};

const onDownload = async () => {
  const form = scrapingReport.formFilter;
  const { value } = await scrapingReport.fetchDownload(form);
  if (value?.data) {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/${value?.data}`;
  }
};

defineExpose({
  fetTchData,
});
</script>

<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="swing-in-top-fwd"
    leave-active-class="swing-out-top-bck"
  >
    <div v-if="showTable" class="q-pa-lg">
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
            <template #top>
              <q-btn
                outline
                color="primary"
                label="Export to excel"
                @click="onDownload"
              />
            </template>
            <template #body-cell-photo="props">
              <q-td :props="props">
                <q-avatar>
                  <img :src="props.row.photo" />
                </q-avatar>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
:deep(.q-card__section--vert) {
  padding: 0;
}
</style>
