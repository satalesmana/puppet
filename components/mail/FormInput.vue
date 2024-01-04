<script setup lang="ts">
import { useMailStore } from '~/stores/mail';
import { useScrapingReportStore } from '~/stores/scrapingReport';
const mailStore = useMailStore();
const srapingTaskReort = useScrapingReportStore();
const { getSession } = useAuth();

const showModal = ref(false);
const isInputManual = computed(() => mailStore.getIsinputManual);
const optTask = computed(() => mailStore.getOptTask);

const fetchTask = async () => {
  const res = await getSession();
  const { value } = await srapingTaskReort.fetchScrapingTask({
    status: 'done',
    'created_by.email': res?.id,
  });
  mailStore.setOptTask(value?.data);
};

const onComposeCreate = async () => {
  await fetchTask();
  mailStore.clearComposeForm();
  showModal.value = true;
};

const onSendMail = async () => {
  try {
    const formInput = mailStore.getComposeForm;
    await mailStore.submitSendMail(formInput);

    showModal.value = false;
  } catch {}
};
</script>
<template>
  <div>
    <q-btn
      color="primary"
      icon="edit"
      class="full-width"
      label="Compose"
      @click="onComposeCreate"
    />

    <q-dialog v-model="showModal" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Create New Message</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-mb-sm items-center">
            <div
              class="text-right q-pr-md col-lg-2 col-md-2 col-sm-2 col-xs-12"
            >
              <label>
                <b>Mode</b>
              </label>
            </div>
            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
              <span class="custom-input-32">
                <div class="q-gutter-sm">
                  <q-radio
                    v-model="mailStore.compose.mode"
                    val="manual"
                    label="Manual"
                  />
                  <q-radio
                    v-model="mailStore.compose.mode"
                    val="task"
                    label="Send by Task"
                  />
                </div>
              </span>
            </div>
          </div>

          <div v-if="!isInputManual" class="row q-mb-sm items-center">
            <div
              class="text-right q-pr-md col-lg-2 col-md-2 col-sm-2 col-xs-12"
            >
              <label>
                <b>Task</b>
              </label>
            </div>
            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
              <span class="custom-input-32">
                <q-select
                  v-model="mailStore.compose.task"
                  outlined
                  dense
                  map-options
                  hide-bottom-space
                  requird
                  :options="optTask"
                  :options-dense="false"
                >
                  <template #no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </span>
            </div>
          </div>

          <div v-if="isInputManual" class="row q-mb-sm items-center">
            <div
              class="text-right q-pr-md col-lg-2 col-md-2 col-sm-2 col-xs-12"
            >
              <label>
                <b>To</b>
              </label>
            </div>
            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
              <span class="custom-input-32">
                <q-input
                  v-model="mailStore.compose.to"
                  outlined
                  dense
                  hide-bottom-space
                  requird
                  :rules="[]"
                />
              </span>
            </div>
          </div>

          <div class="row q-mb-sm items-center">
            <div
              class="text-right q-pr-md col-lg-2 col-md-2 col-sm-2 col-xs-12"
            >
              <label>
                <b>Subject</b>
              </label>
            </div>
            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
              <span class="custom-input-32">
                <q-input
                  v-model="mailStore.compose.subject"
                  outlined
                  dense
                  hide-bottom-space
                  requird
                  :rules="[]"
                />
              </span>
            </div>
          </div>

          <div class="row q-mb-sm">
            <div
              class="text-right q-pr-md col-lg-2 col-md-2 col-sm-2 col-xs-12"
            >
              <label>
                <b>Message</b>
              </label>
            </div>
            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
              <span class="custom-input-32">
                <q-editor
                  v-model="mailStore.compose.message"
                  :definitions="{
                    bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
                  }"
                />
              </span>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn v-close-popup color="red" flat label="Cancel" />
          <q-btn color="primary" flat label="Send E-mail" @click="onSendMail" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
