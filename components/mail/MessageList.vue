<template>
  <div>
    <q-item>
      <q-item-section avatar top>
        <q-checkbox />
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-weight-medium">[quasarframework/quasar]</span>
          <span class="text-grey-8"> - GitHub repository</span>
        </q-item-label>
        <q-item-label caption lines="1">
          @rstoenescu in #3: > Generic type parameter for props
        </q-item-label>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
          <q-btn size="12px" flat dense round icon="more_vert" />
        </div>
      </q-item-section>
    </q-item>
    <q-separator spaced />

    <q-item>
      <q-item-section avatar top>
        <q-checkbox />
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-weight-medium">[quasarframework/quasar]</span>
          <span class="text-grey-8"> - GitHub repository</span>
        </q-item-label>
        <q-item-label caption lines="1">
          @rstoenescu in #3: > Generic type parameter for props
        </q-item-label>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
          <q-btn size="12px" flat dense round icon="more_vert" />
        </div>
      </q-item-section>
    </q-item>

    <div class="q-pa-lg flex flex-center">
      <q-pagination :max="5" direction-links />
    </div>
  </div>
</template>
