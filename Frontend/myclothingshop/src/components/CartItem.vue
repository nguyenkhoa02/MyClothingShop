<script setup>

import image from "@/assets/images/ex5.jpg"
import {ref} from "vue";

const payload ={
  name: "Blue Dress",
  description: "Blue dress for dinner party",
  price: "220$",
  quantity: "2",
  img: image,
}

</script>

<template>
  <div class="d-flex">
    <div class="col-lg-1 me-5 ">
      <img :src="payload.img" class='img-item detail-img img-fluid d-inline'>
    </div>
    <div class="col-lg-6">
      <div class="row">
        <div class="col">
          {{ payload.price }}
        </div>
        <div class="col">
          {{ payload.quantity }}
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.img-item {
  width: 100px;
}

</style>