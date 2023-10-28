<script setup>

import LoginForm from "@/components/LoginForm.vue";
import {ref} from "vue";
import SignUpForm from "@/components/SignUpForm.vue";

import image from "@/assets/images/myclothingshop.jpg";

const Page = ref(true);

function changeView() {
  this.Page = !this.Page;
}

</script>

<template>
  <main>

    <div class="row">
      <div class="col-sm-6 d-flex align-items-center justify-content-center">
        <div>
          <div class="brand">
            myClothingShop
          </div>
          <div class="d-flex justify-content-center mt-3">
            <button class="auth-button" v-on:click="Page = true">
              <p class="auth-text">Sign In</p>
            </button>
            <img :src="image" class="image">
            <button class="auth-button" v-on:click="Page = false">
              <p class="auth-text">Sign Up</p>
            </button>
          </div>
        </div>
      </div>

      <div class="col-sm-1 divider"></div>

      <LoginForm v-if="Page" class="col-sm"></LoginForm>
      <SignUpForm v-else v-model="Page" class="col"></SignUpForm>
    </div>
  </main>
</template>

<style scoped>

button {
  background: transparent;
  border: none;
  font-family: var(--serif-font);

}

.brand {
  font-size: 6vw;
  color: var(--secondary-color);
//align-items: center; //margin-top: 15vh;
}

@media screen and (max-width: 600px) {
  .brand {
    font-size: 50px;
  }

  .auth-button {
    font-size: 45px;
  }
  .auth-text{
    font-size: 20px;
  }

}

.auth-button {
  font-size: 2vw;
  position: relative;
  top: -5vh;
}

.image {
  width: 15vw;
  min-width: 200px;
}

</style>