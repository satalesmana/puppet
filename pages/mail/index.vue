<script setup lang="ts">
const selectAll = ref(false);
const status = ref('pending');
const listMailRef = ref([]);

const setDataList = (value: string) => {
  status.value = value;
  listMailRef.value.fetchMailData(null, value);
};

const setSelectAll = () => {
  if (selectAll.value) listMailRef.value.onSelectAll();
  if (!selectAll.value) listMailRef.value.onClerSelectAll();
};

const onDeleteItem = () => {
  listMailRef.value.onDeleteMailList();
  selectAll.value = false;
};

onNuxtReady(() => {
  listMailRef.value.fetchMailData();
});
</script>
<template>
  <div class="q-pa-lg">
    <div class="q-pb-lg">
      <span class="text-h4">Mail Sender</span>
    </div>

    <div class="row items-start">
      <q-list bordered separator class="bg-white col-3 height">
        <q-item-label header>
          <MailFormInput />
        </q-item-label>

        <q-item v-ripple clickable @click="setDataList('pending')">
          <q-item-section avatar>
            <q-icon name="timer" />
          </q-item-section>
          <q-item-section>Pending</q-item-section>
          <!-- <q-item-section side>
            <q-badge color="red">4</q-badge>
          </q-item-section> -->
        </q-item>

        <q-item v-ripple clickable @click="setDataList('done')">
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>
          <q-item-section>Terkirim</q-item-section>
        </q-item>
      </q-list>

      <div class="col-9 q-pl-md">
        <q-list bordered class="rounded-borders bg-white">
          <q-item-label header>
            <div class="q-gutter-xs q-mb-sm">
              <q-checkbox v-model="selectAll" @click="setSelectAll" />

              <q-btn
                class="q-ml-md"
                icon="delete"
                outline
                rounded
                style="cursor: pointer"
                @click="onDeleteItem"
              >
                Delete
              </q-btn>
            </div>
          </q-item-label>

          <MailMessageList ref="listMailRef" :status="status" />
        </q-list>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.height {
  min-height: 79vh;
}
::v-deep .q-list {
  .q-item__label--header {
    padding-bottom: 0px !important;
  }
}
</style>
