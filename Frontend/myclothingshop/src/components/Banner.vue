<script setup>
import image from "@/assets/images/myclothingshop.jpg"
import ex1 from "@/assets/images/ex1.jpg";
</script>

<template>

  <div class="">
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="ex1" class="img-fluid img-thumbnail banner-img b-block w-100">
        </div>
        <div class="carousel-item">
          <img :src="image" class="img-fluid img-thumbnail banner-img">
        </div>
        <div class="carousel-item">
          <img :src="image" class="img-fluid img-thumbnail banner-img">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.banner-img {
  height: 40vh;
  width: 100%;
  object-fit: contain;
}

</style>