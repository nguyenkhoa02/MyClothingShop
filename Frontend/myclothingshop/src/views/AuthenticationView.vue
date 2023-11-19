<script setup>
import {ref} from "vue";
import LoginForm from "@/components/LoginForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";


import router from "@/router";
import AuthService from "@/services/auth.service";
import {useAuthStore} from "@/stores/auth.store";


import image from "@/assets/images/myclothingshop.jpg";


const Page = ref(true);

const authStore = useAuthStore();

const payload = {
  phone: ref(null),
  email: ref(null),
  fullName: ref(null),
  password: ref(null),
  confirmPassword: ref(null)
};



const submitSignUp = async () => {
  try{
    const data = {
      phone: payload.phone.value,
      email: payload.email.value,
      fullName: payload.fullName.value,
      password: payload.password.value,
      confirmPassword: payload.confirmPassword.value
    }
    const response = await AuthService.SignUp(data);
    if (response) {
      // authStore.setToken(response.data.token);
      // authStore.setUser(response.data.user);
      authStore.login(response.data.token, response.data.user);
      alert("Success Sign Up");
      await router.push({name: 'home'})
    }
    else {
      await router.push({name: 'about'});
    }

  }
  catch (e) {
    console.log(e);
    alert("Phone number is already in use.");
    // await router.push({name: 'Authentication'})
  }
}

const submitLogin = async () => {
  try {
    const data = {
      phone: payload.phone.value,
      email: payload.email.value,
      fullName: payload.fullName.value,
      password: payload.password.value,
      confirmPassword: payload.confirmPassword.value
    }

    const response = await AuthService.Login(data);

    if (response) {
      // authStore.setToken(response.data.token);
      // authStore.setUser(response.data.user);
      alert("Login Successful");
      authStore.login(response.data.token, response.data.user);
      await router.push({name: 'home'})
    }
  }
  catch (e) {
    console.log(e);
    alert("Login Failed!");
    // alert(e.response.data.error)
  }
}

</script>

<template>
  <main>

    <div class="row">
      <div class="col-xl-6 d-flex align-items-center justify-content-center">
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

      <div class="col-lg-1 d-flex justify-content-sm-end align-items-center">
        <div class="divider"></div>
      </div>

      <LoginForm
          :payload="payload"
          v-if="Page"
          @submit:Login="submitLogin"
          class="col-sm mt-5"
      >
      </LoginForm>
      <SignUpForm
          :payload="payload"
          v-else
          @submit:SignUp="submitSignUp"
          class="col-sm mt-5"
      >
      </SignUpForm>
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

@media screen and (max-width: 900px) {
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

@media screen and (min-width: 1200px){
  .divider {
    border-right: 2px solid var(--secondary-color);
    height: 45vh;
  }
}

</style>