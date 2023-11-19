<script setup>
import {useAuthStore} from "@/stores/auth.store";
import AuthService from "@/services/auth.service";

const logout = async () => {
  const authStore = useAuthStore();
  const response = await AuthService.logout();
  if (response) {
    authStore.logout()
  }
}
</script>

<template>
<button @click="logout" class="btn">Logout</button>
</template>

<style scoped>

</style>