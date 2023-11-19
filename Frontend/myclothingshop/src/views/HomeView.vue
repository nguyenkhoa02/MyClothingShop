<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import LoginForm from "@/components/LoginForm.vue";
import {RouterLink} from "vue-router";
import Banner from "@/components/Banner.vue";
import Item from "@/components/Item.vue";
import DetailItemView from "@/views/DetailItemView.vue";
</script>

<template>
  <main>
    <Banner></Banner>
    <Item></Item>

  </main>
</template>
