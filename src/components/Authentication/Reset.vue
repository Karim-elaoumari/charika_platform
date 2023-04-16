
<script setup>
import {ref} from "vue";
import Footer from "../Home/footer.vue";
import { useAuthStore } from "../../stores/auth";
import { useAlertStore } from "../../stores/alert";
import Alert from "../composants/alert.vue";
import Loader from "../composants/loader.vue";
const alertStore = useAlertStore();
const authStore = useAuthStore();
const form  = ref({
    'email': '',
    'code': '',
    'password': '',
    'confirm_password': ''
})
const handleReset =() =>{
  if(form.value.email == '' || form.value.password == '' || form.value.confirm_password == ''|| form.value.code == ''){
    alertStore.setAlert('alert-danger','Please fill all the fields');
    return;
  }
  else if(!form.value.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
    alertStore.setAlert('alert-danger','Please enter a valid email');
    return;
  }
  else if(form.value.code.length < 8){
    alertStore.setAlert('alert-danger','Invalid Verification code');
    return;
  }
  else if(form.value.password.length < 8){
    alertStore.setAlert('alert-danger','Password must be at least 8 characters');
    return;
  }
  else if(form.value.password != form.value.confirm_password){
    alertStore.setAlert('alert-danger','Passwords do not match');
    return;
  }
  else{
    authStore.resetPass(form.value.email,form.value.code,form.value.password,form.value.confirm_password);
  }
}
</script>

<template>
    <section class="" >
  <!-- Jumbotron -->
  <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%);min-height: 80vh;" >
    <div class="container">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <h1 class="my-5 display-3 fw-bold ls-tight">
            The best Choice  <br />
            <span class="text-primary">for your Creer</span>
          </h1>
          <p style="color: hsl(217, 10%, 50.8%)">
            Unlock the power of customer feedback to find the best companies
            Expert analysis and unbiased reviews to help you choose the right company
            Make engagement and feedback companies easier
          </p>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0" >
          <h1 class="text-center">Reset Password</h1>
          <div class="card">
            <div class="card-body py-5 px-md-5">
              <Alert/>
              <form  @submit.prevent="handleReset">
                <Loader :loaderName="'reset'"></Loader>
                <!-- 2 column grid layout with text inputs for the first and last names -->
                

                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email"  class="form-control" placeholder="enter your Email address" v-model="form.email"/>
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>
                <div class="form-outline mb-4">
                  <input type="text"  class="form-control" placeholder="enter the code you received in your inbox email" v-model="form.code"/>
                  <label class="form-label" for="form3Example3">Verification Code</label>
                </div>
                <div class="form-outline mb-4">
                  <input type="password" class="form-control" placeholder="enter your new Password" v-model="form.password"/>
                  <label class="form-label" for="form3Example3">New Password</label>
                </div>
                <div class="form-outline mb-4">
                  <input type="password"  class="form-control" placeholder="Confirm new password" v-model="form.confirm_password"/>
                  <label class="form-label" for="form3Example3">Confirm Password</label>
                </div>

        
                <!-- Submit button -->
                <div class="text-center">
                    <button type="submit" class="btn btn-primary btn-block mb-4">
                    Reset
                   </button>
                </div>

              <div class="row">
                <div class="text-center col-6">
                  <router-link to="/forgot" class="text-decoration-none">Re reset</router-link>
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
<Footer></Footer>
</template>

<style>
</style>