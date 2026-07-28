<script setup lang="ts">
import { useScrapingAccountStore } from '~/stores/scrapingAccount';

const scrapingAccount = useScrapingAccountStore();
const rowTable = computed(() => scrapingAccount.getListData);
const columns = ref([
  { name: 'name', label: 'NAME', field: 'name', align: 'left' },
  { name: 'email', label: 'EMAIL / PHONE', field: 'email', align: 'left' },
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
  Dialog.create({
    title: 'Confirm',
    message: 'Would you like to delete this data?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await scrapingAccount.deleteScrapingAccount(params.value);
    fetTchData();
  });
};

const onEditItem = (params: any) => {
  scrapingAccount.setFormInput(params);
};

const updateSessionModal = ref(false);
const updateIdModal = ref<string | null>(null);

const onLoaginAccount = async (row: any) => {
  if (row.cookies != null) {
    await scrapingAccount.logOutScrapingAccount(row._id);
    fetTchData();
  } else {
    updateSessionModal.value = true;
    updateIdModal.value = row._id;
  }
};

const onLoginJobstreet = async (row: any) => {
  await scrapingAccount.loginScrapingAccount(row);
  fetTchData();
};

const updateTokenModal = ref(false);
const updateData = ref({
  _id: null,
  name: null,
  cookies: null,
  account_id: null,
});

const onUpdateToken = () => {
  updateTokenModal.value = false;
  scrapingAccount.updateAccountToken(updateData.value);
};

const onUploaded = () => {
  updateSessionModal.value = false;
  fetTchData();
};

const onShowDialogUpdateToken = (params: any) => {
  updateTokenModal.value = true;
  updateData.value.account_id = params.account_id;
  updateData.value.cookies = params.cookies;
  updateData.value._id = params._id;
  updateData.value.name = params.name;
};
</script>

<template>
  <div class="q-pa-lg">
    <q-dialog
      v-model="updateTokenModal"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6 q-pa-sm">Update Token: {{ updateData.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-sm">
            <q-form class="q-gutter-md" @submit="onUpdateToken">
              <q-input
                v-model="updateData.account_id"
                filled
                label="User Id"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                v-model="updateData.cookies"
                filled
                label="New Token"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </q-form>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn v-close-popup flat label="Cancel" />
          <q-btn flat label="OK" @click="onUpdateToken" />
        </q-card-actions>
        <q-card-section class="q-pt-none"> </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="updateSessionModal"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6 q-pa-sm">
            Upload Session: {{ updateData.name }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-pa-sm">
            <q-uploader
              :url="`/api/scraping/account/update-sessions/${updateIdModal}`"
              method="POST"
              field-name="session"
              label="Session JSON"
              color="amber"
              text-color="black"
              accept=".json"
              style="width: 100%"
              @uploaded="onUploaded"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn v-close-popup flat label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
          <template #body-cell-email="props">
            <q-td :props="props">
              <span v-if="props.row.type !== 'kupu'">
                {{ props.row.email }}
              </span>
              <span v-if="props.row.type === 'kupu'">
                {{ props.row.phone }}
              </span>
            </q-td>
          </template>
          <template #body-cell-action="props">
            <q-td :props="props">
              <q-btn-dropdown
                split
                :color="props.row.cookies != null ? 'warning' : 'primary'"
                rounded
                :label="
                  props.row.cookies != null
                    ? 'Log Out Account'
                    : 'Upload Session'
                "
                :icon="props.row.cookies != null ? 'logout' : 'login'"
                @click="onLoaginAccount(props.row)"
              >
                <q-list>
                  <q-item
                    v-close-popup
                    clickable
                    @click="onShowDialogUpdateToken(props.row)"
                  >
                    <q-item-section side>
                      <q-icon name="settings" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Manual Update Token</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item
                    v-if="props.row.type === 'jobstreet'"
                    v-close-popup
                    clickable
                    @click="onLoginJobstreet(props.row)"
                  >
                    <q-item-section side>
                      <q-icon name="login" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Login Jobstreet</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item
                    v-close-popup
                    clickable
                    @click="onEditItem(props.row)"
                  >
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
:deep(.q-card__section--vert) {
  padding: 0;
}
</style>
