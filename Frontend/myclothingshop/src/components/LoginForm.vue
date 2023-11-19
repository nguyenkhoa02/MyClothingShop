<script setup>
import { ref, defineEmits } from 'vue';
import {object} from "yup";
import {ErrorMessage, Form, Field} from "vee-validate";

const emit = defineEmits(['submit:Login']);

const props = defineProps({
  payload: {type: object, required: true}
});

const payloadLocal = ref(props.payload);


const Login = async () => {
  emit("submit:Login", payloadLocal);
}

</script>

<template>
  <div class="section">
    <div class="container d-flex justify-content-center">
      <div class="form-box">
        <div class="form-value">
          <Form
              @submit="Login"
              role="form">
            <h2 class="serifFont">Sign In</h2>
            <div class="inputbox">
              <!--              <ion-icon name="person-outline"></ion-icon>-->
              <Field id="phone"
                     name="phone"
                     required
                     type="text"
                     v-model="payloadLocal.phone"
              >
              </Field>
              <ErrorMessage name="phone" class="error-feedback"></ErrorMessage>
              <label for="phone">Phone Number</label>
            </div>
            <div class="inputbox">
              <!--              <ion-icon name="lock-closed-outline"></ion-icon>-->
              <Field id="password"
                     name="password"
                     required
                     type="password"
                     v-model="payloadLocal.password"
              >
              </Field>
              <ErrorMessage name="password" class="error-feedback"></ErrorMessage>
              <label for="password">Password</label>
            </div>
            <div class="forget">
              <label for=""><input type="checkbox">Remember Me </label>
              <a href="#">Forget Password</a>
            </div>
            <button class="button" @click="login">login</button>
          </Form>
          <!--            <div class="register">-->
          <!--              <p>Don't have a account ? //Register</p>-->
          <!--            </div>-->
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import "@/assets/form.css"
</style>