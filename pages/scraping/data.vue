<script setup>
const lisdataRefs = ref([]);
const onFilterData = async () => {
  await lisdataRefs.value.fetTchData();
};
</script>
<template>
  <div>
    <scraping-data-filter @on-submit-filter="onFilterData" />
    <scraping-data-table ref="lisdataRefs" />
  </div>
</template>
