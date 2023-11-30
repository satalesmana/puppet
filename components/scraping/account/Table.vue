<script setup lang="ts">
import { useScrapingAccountStore } from '~/stores/scrapingAccount';
const scrapingAccount = useScrapingAccountStore();
const rowTable = computed(() => scrapingAccount.getListData);
const columns = ref([
  { name: 'name', label: 'NAME', field: 'name', align: 'left' },
  { name: 'email', label: 'EMAIL', field: 'email', align: 'left' },
  { name: 'type', label: 'ACCOUNT TYPE', field: 'type', align: 'left' },
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
  const { value } = await scrapingAccount.fetchScrapingAccount();
  scrapingAccount.setListData(value?.data);
};

const onDeleteItem = async (params: any) => {
  await scrapingAccount.deleteScrapingAccount(params.value);
  fetTchData();
};

const onLoaginAccount = async (params: any) => {
  await scrapingAccount.loginScrapingAccount(params.value);
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
          <template #body-cell-action="props">
            <q-td :props="props">
              <q-btn-dropdown
                split
                color="primary"
                rounded
                icon="login"
                label="Loagin Account"
                @click="onLoaginAccount(props)"
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
