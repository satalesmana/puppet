<script setup lang="ts">
import { useScrapingTaskStore } from '~/stores/scrapingTask';
import { useScrapingAccountStore } from '~/stores/scrapingAccount';
const scrapingTask = useScrapingTaskStore();
const scrapingAccount = useScrapingAccountStore();

const optScrapingAccount = computed(() => scrapingTask.getOptScrapingTask);
const optPosition = computed(() => scrapingTask.getOptPosition);

const optCounter = computed(() => {
  const opt = [];
  for (let i = 1; i <= 15; i++) {
    opt.push({
      label: `${i} Times`,
      value: i,
    });
  }
  return opt;
});

const fetTchScrapingAccount = async () => {
  const { value } = await scrapingAccount.fetchScrapingAccount();
  scrapingTask.setOptScrapingAccount(value?.data);
};

const fetTchData = async () => {
  const { value } = await scrapingTask.fetchScrapingTask();
  scrapingTask.setListData(value?.data);
};

const onSubmit = async () => {
  const formInput = scrapingTask.getFormInput;
  formInput.initial_id = scrapingTask.getFormInput.initial_id?.value;
  await scrapingTask.submitScrapingTask(formInput);
  scrapingTask.clearFormInput();
  fetTchData();
};

const filterPositionId = async (val, update) => {
  const { data } = await scrapingTask.jobstreetFetchPosition(
    scrapingTask.formInput.scraping_account,
  );

  update(() => {
    if (data) {
      scrapingTask.setOptPosition(data);
    }
  });
};

const onChangeAccount = () => {
  scrapingTask.setOptPosition([]);
  scrapingTask.formInput.initial_id = '';
  scrapingTask.formInput.positionId = '';
  scrapingTask.formInput.totaldata = '';
};

const onChangePositionId = (value: any) => {
  if (!scrapingTask.isKupuAccout) {
    scrapingTask.formInput.positionId = value.positionId;
    scrapingTask.formInput.totaldata = value.numberOfCandidates;
    scrapingTask.jobstreetFetchBiller();
  }
};

onNuxtReady(() => {
  fetTchScrapingAccount();
});
</script>
<template>
  <div class="q-pa-lg">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Scraping Task</div>
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
                  <b>Account to scrap</b>
                </label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input-32">
                  <q-select
                    v-model="scrapingTask.formInput.scraping_account"
                    outlined
                    dense
                    map-options
                    hide-bottom-space
                    requird
                    :options="optScrapingAccount"
                    :options-dense="false"
                    @update:model-value="onChangeAccount"
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
                  <b>Position Id</b>
                </label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input-32">
                  <q-select
                    v-model:model-value="scrapingTask.formInput.initial_id"
                    outlined
                    dense
                    map-options
                    hide-bottom-space
                    requird
                    :disable="scrapingTask.formInput.scraping_account === ''"
                    :filled="scrapingTask.formInput.scraping_account === ''"
                    :options="optPosition"
                    :options-dense="false"
                    @update:model-value="onChangePositionId"
                    @filter="filterPositionId"
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

            <div v-if="!scrapingTask.isKupuAccout">
              <div class="row q-mb-sm items-center">
                <div
                  class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
                >
                  <label>
                    <b>Biller Id</b>
                  </label>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <span class="custom-input-32">
                    <q-input
                      v-model="scrapingTask.formInput.biller_id"
                      outlined
                      dense
                      filled
                      disable
                      hide-bottom-space
                      requird
                    />
                  </span>
                </div>
              </div>

              <div class="row q-mb-sm items-center">
                <div
                  class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
                >
                  <label>
                    <b>Total data</b>
                  </label>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <span class="custom-input-32">
                    <q-input
                      v-model="scrapingTask.formInput.totaldata"
                      outlined
                      dense
                      filled
                      disable
                      hide-bottom-space
                      requird
                    />
                  </span>
                </div>
              </div>

              <div class="row q-mb-sm items-center">
                <div
                  class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
                >
                  <label>
                    <b>Position Id</b>
                  </label>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <span class="custom-input-32">
                    <q-input
                      v-model="scrapingTask.formInput.positionId"
                      outlined
                      dense
                      filled
                      disable
                      hide-bottom-space
                      requird
                    />
                  </span>
                </div>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
              >
                <label>
                  <b>Initial Page</b>
                </label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input-32">
                  <q-input
                    v-model="scrapingTask.formInput.initial_page"
                    outlined
                    dense
                    hide-bottom-space
                    requird
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
              >
                <label>
                  <b>Counter</b>
                </label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input-32">
                  <q-select
                    v-model="scrapingTask.formInput.counter"
                    outlined
                    dense
                    emit-value
                    map-options
                    hide-bottom-space
                    requird
                    :options="optCounter"
                    :options-dense="false"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="red">Cancel</q-btn>
        <q-btn color="primary" @click="onSubmit">Submit</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
