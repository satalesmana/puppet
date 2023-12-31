<script setup lang="ts">
import { useScrapingTaskStore } from '~/stores/scrapingTask';
const scrapingTask = useScrapingTaskStore();
const rowTable = computed(() => scrapingTask.getListData);
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
  {
    name: 'action',
    label: 'ACTION',
    field: '_id',
    align: 'center',
    headerStyle: 'width: 200px',
  },
]);

onNuxtReady(() => {
  fetTchData();
});

const fetTchData = async () => {
  const { value } = await scrapingTask.fetchScrapingTask();
  scrapingTask.setListData(value?.data);
};

const onDeleteItem = async (params: any) => {
  await scrapingTask.deleteScrapingTask(params.value);
  fetTchData();
};

const onArsipkan = async (params: any) => {
  const { value } = await scrapingTask.arsipkanTask(params.value);
  fetTchData();
};
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

          <template #body-cell-action="props">
            <q-td :props="props">
              <q-btn-dropdown
                split
                color="primary"
                rounded
                label="Arsipkan"
                @click="onArsipkan(props)"
              >
                <q-list>
                  <q-item v-close-popup clickable>
                    <q-item-section side>
                      <q-icon name="edit" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Edit</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-close-popup clickable @click="onDeleteItem(props)">
                    <q-item-section side>
                      <q-icon name="delete" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Delete</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-td>
          </template>
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
