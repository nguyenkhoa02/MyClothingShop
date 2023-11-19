<script setup>
import image from "@/assets/images/ex3.jpg"
import {ref} from "vue";
const props = defineProps(['id']);

const payload ={
  name: "Blue Dress",
  description: "Blue dress for dinner party",
  price: "220$",
  instock: "10",
  image: image,
  category: "Dress"
}

let quantity = ref(1);

function increase() {
  if (quantity.value < payload.instock)
    quantity.value += 1;
  else
    return
}
const decrease = () => {
  if (quantity.value > 1)
    quantity.value -= 1;
  else
    return;
}


</script>

<template>
  ID: {{id}}
<div class="row">
  <div class="col-lg-5">
    <img :src="payload.image" class='detail-img img-fluid'>
  </div>
  <div class="col-lg-1"></div>
  <div class="col-lg-6">
    <div class="detail-name">
      {{payload.name}}
    </div>
    <div class="detail-price">
      {{payload.price}}
    </div>
    <div class="detail-category">
      {{payload.category}}
    </div>
    <div class="detail-description">
      {{payload.description}}
    </div>
    <div class="detail-instock">
      Remain: {{payload.instock}}
    </div>
    <div>
      <button class="quantity-btn" @click="decrease">
        <ion-icon name="remove-outline"></ion-icon>
      </button>
      <input v-model="quantity" class="quantity text-center" >
      <button class="quantity-btn" @click="increase">
        <ion-icon name="add-outline"></ion-icon>
      </button>
    </div>
    <div>
      <button class="addCart-btn">Add to cart</button>
    </div>
  </div>


</div>
</template>

<style scoped>
.detail-img {
  height: 80vh;
  width: 100vw;
  object-fit: contain;
}

.detail-name {
  font-size: 50px;
  color: var(--secondary-color);
  //font-weight: 300;
  font-family: var(--newreader);
  font-style: italic;
  font-weight: 100;
}

.detail-price {
  font-size: 3em;
  color: var(--quaternaty-color);
  //font-family: var(--sans-font);
  font-family: var(--source-serif);
}

.detail-category {
  font-size: 1.5em;
  color: var(--secondary-color);
}

.detail-description {
  font-size: 1.5em;
  color: var(--secondary-color);
}

.quantity-btn {
  background: transparent;
  border:none;
}

.quantity {
  width: 60px;
}



.addCart-btn {
  //width: 100%;
  height: 40px;
  border-radius: 40px;
  background: var(--quinary-color);
  color: var(--primary-color);
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  font-family: var(--serif-font);
  margin: 15px 0px;
}
</style>