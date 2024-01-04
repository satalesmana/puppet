<script setup lang="ts">
const selectAll = ref(false);
</script>
<template>
  <div class="q-pa-lg">
    <div class="q-pb-lg">
      <span class="text-h4">Mail Sender</span>
    </div>

    <div class="row items-start">
      <q-list bordered separator class="bg-white col-3">
        <q-item-label header>
          <MailFormInput />
        </q-item-label>

        <q-item v-ripple clickable>
          <q-item-section avatar>
            <q-icon name="timer" />
          </q-item-section>
          <q-item-section>Pending</q-item-section>
          <q-item-section side>
            <q-badge color="red">4</q-badge>
          </q-item-section>
        </q-item>

        <q-item v-ripple clickable>
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>
          <q-item-section>Terkirim</q-item-section>
          <q-item-section side>
            <!-- <q-badge color="red">4</q-badge> -->
          </q-item-section>
        </q-item>

        <q-item v-ripple clickable active-class="text-orange">
          <q-item-section avatar>
            <q-icon name="delete" />
          </q-item-section>
          <q-item-section>Deleted</q-item-section>
          <q-item-section side>
            <!-- <q-badge color="red">4</q-badge> -->
          </q-item-section>
        </q-item>
      </q-list>

      <div class="col-9 q-pl-md">
        <q-list bordered class="rounded-borders bg-white">
          <q-item-label header>
            <div class="q-gutter-xs">
              <q-checkbox v-model="selectAll" />

              <q-chip class="q-ml-md" icon="delete" style="cursor: pointer">
                Delete
              </q-chip>
            </div>
            <q-separator spaced />
          </q-item-label>

          <MailMessageList style="min-height: calc(65vh)" />
        </q-list>
      </div>
    </div>
  </div>
</template>
