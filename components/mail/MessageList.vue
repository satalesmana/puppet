<script setup>
import { dateFormat } from '~/server/utils/helpers';
import { useMailStore } from '~/stores/mail';

const useMail = useMailStore();

const props = defineProps({
  status: { type: String, default: 'pending' },
});

const columns = ref([
  {
    align: 'left',
    name: 'id',
    label: 'ID',
    field: '_id',
  },
]);
const selected = ref([]);
const tableListref = ref([]);

const mailList = useMail.getMailList;

const onSelectAll = () => {
  selected.value = tableListref.value.computedRows;
};

const onClerSelectAll = () => {
  selected.value = [];
};

const fetchMailData = async (page, status) => {
  const { value } = await useMail.fetchMailData({
    status,
    page,
  });
  useMail.setMailList(value?.data);
  useMail.setMailPagination(value?.pagination);
};

const onRequest = (param) => {
  const { page } = param.pagination;

  fetchMailData(page, props.status);
};

defineExpose({
  onSelectAll,
  onClerSelectAll,
  selected,
  fetchMailData,
});
</script>
<template>
  <div>
    <q-table
      ref="tableListref"
      v-model:selected="selected"
      v-model:pagination="mailList.pagination"
      row-key="_id"
      :rows="mailList.data"
      :columns="columns"
      selection="multiple"
      :rows-per-page-options="[]"
      @request="onRequest"
    >
      <template #header="props"> </template>

      <template #body-cell-id="props">
        <q-td :props="props">
          <q-item>
            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">[{{ props.row.to }}]</span>
                <span class="text-grey-8"> - {{ props.row.subject }}</span>
              </q-item-label>
              <q-item-label caption>
                @{{ dateFormat(props.row.creted_at) }}
                <div class="line-clamp" v-html="props.row.message" />
              </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  round
                  icon="delete"
                />
                <q-btn size="12px" flat dense round icon="more_vert" />
              </div>
            </q-item-section>
          </q-item>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style setup lang="scss">
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: calc(45vw);
}
</style>
