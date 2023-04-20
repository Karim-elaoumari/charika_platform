
<script setup>



import {ref, onBeforeMount,computed} from "vue";

import Footer from "../Home/footer.vue";
import {useRouter} from 'vue-router'
import { useAuthStore } from "../../stores/auth";
import { useAlertStore } from "../../stores/alert";
import { useJobStore} from "../../stores/job";
import Alert from "../composants/alert.vue";
import Loader from "../composants/loader.vue";
const alertStore = useAlertStore();

const form  = ref({
    'first_name':'',
    'last_name':'',
    'email': '',
    'password' : '',
    'confirm_password' : '',
    'speciality' : '',
    'job_id' : '',
})


onBeforeMount(async()=>{
  if(useJobStore().getJobs.length == 0){
    
    await useJobStore().fetchJobs();

  }
});
const handleRegister =() =>{
  if(form.value.first_name == '' || form.value.last_name == '' || form.value.email == '' || form.value.password == '' || form.value.confirm_password == ''|| form.value.speciality == '' || form.value.job_id == ''){
    alertStore.setAlert('alert-danger','Please fill all the fields');
    return;
  }
  else if(!form.value.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
    alertStore.setAlert('alert-danger','Please enter a valid email');
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
    useAuthStore().register(form.value.first_name,form.value.last_name,form.value.email,form.value.password,form.value.confirm_password,form.value.speciality,form.value.job_id);
  }
   
}
</script>

<template>
     <Loader :loaderName="'main'"></Loader>
<section class="">
  <!-- Jumbotron -->
  <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%);min-height: 80vh;">
    <div class="container">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <h1 class="my-5 display-3 fw-bold ls-tight">
            The best Choice  <br />
            <span class="text-primary">for your Carrer</span>
          </h1>
          <p style="color: hsl(217, 10%, 50.8%)">
            Unlock the power of customer feedback to find the best companies
            Expert analysis and unbiased reviews to help you choose the right company
            Make engagement and feedback companies easier
          </p>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0" >
          <h1 class="text-center">Resgister</h1>
          <div class="card">
            <div class="card-body py-5 px-md-5">
              <form  @submit.prevent="handleRegister">
                <Alert></Alert>
                <Loader :loaderName="'register'"></Loader>
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input type="text" v-model="form.first_name" class="form-control" placeholder="First name" />
                      <label class="form-label" for="form3Example1">First name</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input type="text" v-model="form.last_name" placeholder="Last name" class="form-control" />
                      <label class="form-label" for="form3Example2" >Last name</label>
                    </div>
                  </div>
                </div>

                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" v-model="form.email" class="form-control"  placeholder="Email address"/>
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input type="password" v-model="form.password" class="form-control" placeholder=" password" />
                  <label class="form-label" for="form3Example4">Password</label>
                </div>
                <div class="form-outline mb-4">
                  <input type="password" v-model="form.confirm_password" class="form-control" placeholder="Confirm password"/>
                  <label class="form-label" for="form3Example4"> Confirm Password</label>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                     
                      <select id="job" v-model="form.job_id" class="form-select" >
                        <option value="">Select a job</option>
                       <option v-for="job in useJobStore().getJobs" :value="job.id">{{job.name}}</option>
                      </select>
                      <label for="job">Select a job</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      
                      <input type="text" v-model="form.speciality" class="form-control" placeholder="Enter your speciality" />
                      <label for="speciality">Speciality</label>
                    </div>
                  </div>
                </div>


                
                <div class="text-center">
                    <button type="submit" class="btn btn-primary btn-block mb-4">
                    Sign up
                   </button>

                </div>
                
                <div class="text-center col-6">
                 Have Account  :    <router-link to="/login" class="text-decoration-none">Login</router-link>
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