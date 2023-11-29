<template>
  <div class="q-pa-lg">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Scraping Account</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                  <q-input outlined dense filled hide-bottom-space requird />
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
                    outlined
                    dense
                    filled
                    hide-bottom-space
                    requird
                    :options="[]"
                    label="Select Type"
                  />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
              >
                <label>
                  <b>Email</b>
                </label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input-32">
                  <q-input outlined dense filled hide-bottom-space requird />
                </span>
              </div>
            </div>

            <div class="row q-mb-sm items-center">
              <div
                class="text-right q-pr-md col-lg-4 col-md-4 col-sm-4 col-xs-12"
              >
                <label>
                  <b>Password</b>
                </label>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <span class="custom-input-32">
                  <q-input outlined dense filled hide-bottom-space requird />
                </span>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn outline color="red">Cancel</q-btn>
        <q-btn outline color="primary">Submit</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
