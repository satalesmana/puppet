<script setup lang="ts">
const iconName = ref('mood');

const randIconName = () => {
  const iconList = [
    'mood',
    'sentiment_neutral',
    'mood_bad',
    'sick',
    'account_circle',
    'face',
    'warning',
  ];
  const x = Math.floor(Math.random() * 7 + 1);
  iconName.value = iconList[x];
};

onNuxtReady(() => {
  randIconName();
});
</script>
<template>
  <div class="q-pa-lg text-center">
    <div class="center">
      <q-icon :name="iconName" color="warning" size="15rem" />
    </div>

    <!-- <h4>Welcome...</h4> -->
    <!-- <DashboardProgres />
    <DashboardChart /> -->
  </div>
</template>

<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>
