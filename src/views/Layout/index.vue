<script setup>
import UserHeader from "@/views/Layout/components/UserHeader.vue";
</script>

<template>
  <div class="layout-container">
    <UserHeader></UserHeader>
    <div class="content-wrapper">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

</style>