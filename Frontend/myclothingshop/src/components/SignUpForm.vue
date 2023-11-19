<script setup>
//
import * as yup from "yup";
import { ref, defineEmits } from 'vue';
import {object} from "yup";
import {ErrorMessage, Field, Form} from "vee-validate";

const emit = defineEmits(['submit:SignUp']);

const props = defineProps({
  payload: {type: object, required: true}
})

const payloadLocal = ref(props.payload);
// const payloadLocal = ref("")

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const signupFormSchema = yup.object().shape({
 phone: yup
     .string()
     .required("Please, enter your phone number")
     .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Invalid Phone Number."),
 email: yup
     .string()
     .email("Incorrect Email.")
     .max(50, "E-mail maximum 50 characters.")
     .required("Email can not be null."),
 fullName: yup
     .string()
     .required("Please, enter your name."),
 password: yup
     .string()
     .matches(passwordRules, { message: "Please create a stronger password" })
     .required("Please, enter your password"),
 confirmPassword: yup
     .string()
     .oneOf([yup.ref("password"), null], "Passwords must match")
     .required("Please, enter your confirm password"),
})

function SignUp (payloadLocal)  {
  emit("submit:SignUp", payloadLocal)
}

//TODO: submit form
</script>

<template>
  <div class="section">
    <div class="form-box">
      <div class="form-value">
        <Form
            :validation-schema="signupFormSchema"
            @submit="SignUp()"
        >
          <h2 class="serifFont">Sign Up</h2>
          <div class="inputbox">
            <!--              <ion-icon name="person-outline"></ion-icon>-->
            <Field
                id="phone"
                name="phone"
                required
                type="text"
                v-model="payloadLocal.phone">
            </Field>
            <ErrorMessage class="error-feedback" name="phone"></ErrorMessage>
            <label for="phone">Phone Number</label>
          </div>
          <div class="inputbox">
            <!--              <ion-icon name="mail-outline"></ion-icon>-->
            <Field
                id="email"
                name="email"
                required
                type="email"
                v-model="payloadLocal.email"
            >
            </Field>
            <ErrorMessage name="email" class="error-feedback"></ErrorMessage>
            <label for="email">Email</label>
          </div>
          <div class="inputbox">
            <!--              <ion-icon name="person-outline"></ion-icon>-->
            <Field
                id="fullName"
                name="fullName"
                required type="text"
                v-model="payloadLocal.fullName"
            >
            </Field>
            <ErrorMessage name="fullName" class="error-feedback"></ErrorMessage>
            <label for="fullName">Full Name</label>
          </div>
          <div class="inputbox">
            <!--              <ion-icon name="lock-closed-outline"></ion-icon>-->
            <Field
                id="password"
                name="password"
                required
                type="password"
                v-model="payloadLocal.password"
            >
            </Field>
            <ErrorMessage name="password" class="error-feedback"></ErrorMessage>
            <label for="password">Password</label>
          </div>
          <div class="inputbox">
            <!--              <ion-icon name="lock-closed-outline"></ion-icon>-->
            <Field
                id="confirmPassword"
                name="confirmPassword"
                required type="password"
                v-model="payloadLocal.confirmPassword"
            >
            </Field>
            <ErrorMessage name="confirmPassword" class="error-feedback"></ErrorMessage>
            <label for="password_confirmation">Confirm Password</label>
          </div>
          <button class="button">Register</button>
        </Form>

      </div>
    </div>
  </div>

</template>

<style scoped>
@import "@/assets/form.css";
</style>