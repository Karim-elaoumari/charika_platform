
<script setup>


import {ref} from "vue";
import { useAuthStore } from "../../stores/auth";
import { useAlertStore } from "../../stores/alert";
import Alert from "../composants/alert.vue";
import Loader from "../composants/loader.vue";
const alertStore = useAlertStore();
const authStore = useAuthStore();
const form  = ref({
    'email': '',
    'code' : ''
})


const handleVerify =() => {
  if(form.value.email == '' || form.value.code == '' ){
    alertStore.setAlert('alert-danger','Please fill all fields');
    return;
  }
  else if(!form.value.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
    alertStore.setAlert('alert-danger','Please enter a valid email');
    return;
  }else if(form.value.code.length < 8){
    alertStore.setAlert('alert-danger','Invalid code');
    return;
  }
  else{
    authStore.verifyEmail(form.value.email,form.value.code);
  }
  
}

</script>

<template >
    <section class="" >
  <!-- Jumbotron -->
  <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%);min-height: 80vh;" >
    <div class="container">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <h1 class="my-5 display-3 fw-bold ls-tight">
            The best offer <br />
            <span class="text-primary">for your business</span>
          </h1>
          <p style="color: hsl(217, 10%, 50.8%)">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0" >
          <h1 class="text-center">Email Verification</h1>
          <div class="card">
            <div class="card-body py-5 px-md-5">
              <Alert/>
              <form  @submit.prevent="handleVerify">
                <Loader :loaderName="'verify-Email'"></Loader>
                <!-- 2 column grid layout with text inputs for the first and last names -->
                

                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control" placeholder="enter your Email address" v-model="form.email"/>
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>
                <div class="form-outline mb-4">
                  <input type="text" id="form3Example3" class="form-control" placeholder="Past Your Code here " v-model="form.code"/>
                  <label class="form-label" for="form3Example3">Verification Code:
                  </label>
                </div>
                <!-- Submit button -->
                <div class="text-center">
                    <button type="submit" class="btn btn-primary btn-block mb-4">
                    Verify
                   </button>
                </div>
                

              <div class="row">
                <div class="text-center col-6">
                  <router-link to="/register" class="text-decoration-none">Register</router-link>
                </div>
                <div class="text-center col-6">
                  <router-link to="/login" class="text-decoration-none">Login</router-link>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</section>
</template>

<style>
</style>