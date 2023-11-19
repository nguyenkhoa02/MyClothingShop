<script setup>

import Logout from "@/components/Logout.vue";
</script>

<template>
  <nav class="navbar navbar-expand-lg mt-1">
    <div class="container-fluid">
      <RouterLink :to="{name: 'home'}" class="navbar-brand">myClothingShop</RouterLink>
      <button aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
              data-bs-target="#navbarNav" data-bs-toggle="collapse" type="button">
        <span class="navbar-togger-icon"></span>
      </button>
      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink :to="{name: 'about'}" class="nav-link">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{name: 'Authentication'}" class="nav-link">Authentication</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
                :to="{
              name: 'DetailItem',
              params: {id: 1}
            }"
                class="nav-link"
            >
              Detail
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{
              name: 'Cart'
              }"
                class="nav-link"
                        >
              Cart
            </RouterLink>
          </li>
          <li class="nav-item">
            <Logout></Logout>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<style scoped>
.nav-link {
  font-size: 15px;
}
</style>