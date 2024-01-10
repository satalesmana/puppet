<script setup lang="ts">
const { data } = useAuth();
const router = useRouter();

onMounted(() => {
  if (data.value?.role !== 'admin') {
    router.push('/');
  }
});
</script>
<template>
  <div>
    <user-form-input />
    <user-table />
  </div>
</template>
