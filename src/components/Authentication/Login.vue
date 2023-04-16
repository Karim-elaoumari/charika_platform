
<script setup>



import {ref} from "vue";
import { useAuthStore } from "../../stores/auth";
import { useAlertStore } from "../../stores/alert";
import Footer from "../Home/footer.vue";
import Alert from "../composants/alert.vue";
import Loader from "../composants/loader.vue";
const alertStore = useAlertStore();
const authStore = useAuthStore();
const form  = ref({
    'email': '',
    'password' : ''
})


const handleLogin =() => {
  if(form.value.email == '' || form.value.password ==  '' ){
    alertStore.setAlert('alert-danger','Please fill all fields');
    return;
  }
  else if(!form.value.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
    alertStore.setAlert('alert-danger','Please enter a valid email');
    return;
  }else if(form.value.password.length < 8){
    alertStore.setAlert('alert-danger','Password must be at least 8 characters');
    return;
  }
  else{
    authStore.login(form.value.email,form.value.password);
  }
  
}
</script>

<template>
   <!-- Section: Design Block -->
<section class="" style="min-height: 90vh;">
  <!-- Jumbotron -->
  <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%);min-height: 80vh;">
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
           <h1 class="text-center">Login</h1>
          <div class="card" >
            <div class="card-body py-5 px-md-5">
              
              <Alert/>
              <form @submit.prevent="handleLogin">
                <Loader :loaderName="'login'"></Loader>
                
                <!-- 2 column grid layout with text inputs for the first and last names -->
                

                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3" v-model="form.email" class="form-control" />
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input type="password" v-model="form.password" id="form3Example4" class="form-control" />
                  <label class="form-label" for="form3Example4">Password</label>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary btn-block mb-4">
                    Login
                   </button>

                </div>
                <div class="row">
                <div class="text-center col-6">
                  <router-link to="/register" class="text-decoration-none">Register</router-link>
                </div>
                <div class="text-center col-6">
                  <router-link to="/forgot" class="text-decoration-none">Forgot Password</router-link>
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