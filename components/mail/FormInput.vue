<script setup lang="ts">
const showModal = ref(false);
</script>
<template>
  <div>
    <q-btn
      color="primary"
      icon="edit"
      class="full-width"
      label="Compose"
      @click="showModal = true"
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
                <q-input outlined dense hide-bottom-space requird :rules="[]" />
              </span>
            </div>
          </div>

          <div class="row q-mb-sm items-center">
            <div
              class="text-right q-pr-md col-lg-2 col-md-2 col-sm-2 col-xs-12"
            >
              <label>
                <b>Task</b>
              </label>
            </div>
            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
              <span class="custom-input-32">
                <q-input outlined dense hide-bottom-space requird :rules="[]" />
              </span>
            </div>
          </div>

          <div class="row q-mb-sm items-center">
            <div
              class="text-right q-pr-md col-lg-2 col-md-2 col-sm-2 col-xs-12"
            >
              <label>
                <b>To</b>
              </label>
            </div>
            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
              <span class="custom-input-32">
                <q-input outlined dense hide-bottom-space requird :rules="[]" />
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
          <q-btn color="primary" flat label="Send E-mail" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
