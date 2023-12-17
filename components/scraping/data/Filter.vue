<script setup lang="ts">
import { useScrapingReportStore } from '~/stores/scrapingReport';
const scrapingReport = useScrapingReportStore();

const optScrapingAccount = computed(() => scrapingReport.getOptScrapingAccount);
const optScrapingTask = computed(() => scrapingReport.getOptScrapingTask);
const optStatus = computed(() => scrapingReport.getScrapingStatus);

const fetchData = async () => {
  const { value } = await scrapingReport.fetchScrapingAccount();
  scrapingReport.setOptScrapingAccount(value?.data);
};

const onChangeStatus = async (val: any) => {
  const { value } = await scrapingReport.fetchScrapingTask({
    'scraping_account._id': scrapingReport.formFilter.scraping_account,
    status: val,
  });
  scrapingReport.setOptScrapingTask(value?.data);
};

onNuxtReady(() => {
  fetchData();
});

const onSubmit = () => {};
const onReset = () => {};
</script>

<template>
  <div class="q-pa-lg">
    <q-form
      ref="scrapingReportFilterRef"
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Filter Form</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div class="row q-mb-sm items-center">
                <div
                  class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
                >
                  <label>
                    <b>Select Account</b>
                  </label>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <span class="custom-input-32">
                    <q-select
                      v-model="scrapingReport.formFilter.scraping_account"
                      outlined
                      dense
                      emit-value
                      map-options
                      hide-bottom-space
                      requird
                      :options="optScrapingAccount"
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

              <div class="row q-mb-sm items-center">
                <div
                  class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
                >
                  <label>
                    <b>Task Status</b>
                  </label>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <span class="custom-input-32">
                    <q-select
                      v-model="scrapingReport.formFilter.task_status"
                      outlined
                      dense
                      emit-value
                      map-options
                      hide-bottom-space
                      requird
                      :options="optStatus"
                      :options-dense="false"
                      @update:model-value="onChangeStatus"
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

              <div class="row q-mb-sm items-center">
                <div
                  class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
                >
                  <label>
                    <b>Select Task</b>
                  </label>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <span class="custom-input-32">
                    <q-select
                      v-model="scrapingReport.formFilter.task"
                      outlined
                      dense
                      emit-value
                      map-options
                      hide-bottom-space
                      requird
                      :options="optScrapingTask"
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
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn color="red">Cancel</q-btn>
          <q-btn color="primary" type="submit">Filter</q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>
