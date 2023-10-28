<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import LoginForm from "@/components/LoginForm.vue";
import {RouterLink} from "vue-router";
</script>

<template>
  <main>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/authentication">Authentications</RouterLink>
  </main>
</template>
