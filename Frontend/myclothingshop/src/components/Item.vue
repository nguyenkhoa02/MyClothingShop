<script setup>
import image from "@/assets/images/ex2.jpg"

</script>

<template>
  <div class="d-flex flex-wrap justify-content-center">
    <div class="item-info">
      <img :src="image" class="item-img img-fluid">
      <div class="item-name">Summer Beach Blue Dress</div>
      <div class="mb-2 item-divider"></div>
      <div class="item-price">22000$</div>
    </div>
  </div>
</template>

<style scoped>



.item-img {
  //height: ;
  //width: ;
}

.item-info {
  height: fit-content;
  border: solid 1px #c5c5c5;
  border-radius: 5px;
  width: calc(95%/4);
  margin: calc(2%/4)
;
}

.item-name {
  padding: 5px;
  display: -webkit-flex;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.item-price{
  padding: 5px;
  font-family: var(--source-serif);
  justify-content: center;
  display: flex;
}

.item-divider{
  //display: block;
  //content: "";
  height: 5px;
}

</style>