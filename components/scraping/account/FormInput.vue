<script setup lang="ts">
import { useScrapingAccountStore } from '~/stores/scrapingAccount';
const scrapingAccount = useScrapingAccountStore();
const optAccounttype = computed(() => scrapingAccount.getOptAccountType);
const scrapingAccountFormRef = ref([]);

const fetTchData = async () => {
  const { value } = await scrapingAccount.fetchScrapingAccount();
  scrapingAccount.setListData(value?.data);
};

const onSubmit = async () => {
  try {
    const formInput = scrapingAccount.getFormInput;
    await scrapingAccount.submitUser(formInput);
    onReset();
    await fetTchData();
  } catch (err) {}
};

const onReset = () => {
  scrapingAccount.clearFormInput();
  setTimeout(() => {
    scrapingAccountFormRef.value.resetValidation();
  });
};

const isValidEmail = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
  return regex.test(email);
};
</script>
<template>
  <div class="q-pa-lg">
    <q-form
      ref="scrapingAccountFormRef"
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Scraping Account</div>
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
                    <b>Name</b>
                  </label>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <span class="custom-input-32">
                    <q-input
                      v-model="scrapingAccount.formInput.name"
                      outlined
                      dense
                      hide-bottom-space
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') || 'Please type name',
                      ]"
                    />
                  </span>
                </div>
              </div>

              <div class="row q-mb-sm items-center">
                <div
                  class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
                >
                  <label>
                    <b>Type</b>
                  </label>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <span class="custom-input-32">
                    <q-select
                      v-model="scrapingAccount.formInput.type"
                      outlined
                      dense
                      emit-value
                      map-options
                      hide-bottom-space
                      requird
                      :options="optAccounttype"
                      :options-dense="false"
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') || 'Please select type',
                      ]"
                    />
                  </span>
                </div>
              </div>

              <div
                v-if="!scrapingAccount.isKupuAccout"
                class="row q-mb-sm items-center"
              >
                <div
                  class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
                >
                  <label>
                    <b>Email</b>
                  </label>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <span class="custom-input-32">
                    <q-input
                      v-model="scrapingAccount.formInput.email"
                      outlined
                      dense
                      hide-bottom-space
                      requird
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') || 'Please type email',
                        (val) => isValidEmail(val) || 'Invalid email address',
                      ]"
                    />
                  </span>
                </div>
              </div>

              <div
                v-if="!scrapingAccount.isKupuAccout"
                class="row q-mb-sm items-center"
              >
                <div
                  class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
                >
                  <label>
                    <b>Password</b>
                  </label>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <span class="custom-input-32">
                    <q-input
                      v-model="scrapingAccount.formInput.password"
                      outlined
                      dense
                      hide-bottom-space
                      requird
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') ||
                          'Please type password',
                      ]"
                    />
                  </span>
                </div>
              </div>

              <div class="row q-mb-sm items-center">
                <div
                  class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
                >
                  <label>
                    <b>Phone</b>
                  </label>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <span class="custom-input-32">
                    <q-input
                      v-model="scrapingAccount.formInput.phone"
                      outlined
                      dense
                      hide-bottom-space
                      requird
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') || 'Please type Phone',
                      ]"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn color="red" type="reset">Cancel</q-btn>
          <q-btn color="primary" type="submit">Submit</q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>
