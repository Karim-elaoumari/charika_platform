<script setup>
import { ref,onBeforeMount } from "vue";
import {useRouter} from 'vue-router'
import { useAuthStore } from "../../stores/auth";

const router  = useRouter();
const waiting = ref(true);
onBeforeMount(async()=>{
  if(useAuthStore().getUser==null){
    await useAuthStore().checkAuth('No_redirect');
  }
  waiting.value = false;
});
const Logout = async () => {
    useAuthStore().logout();
}
const showDropDown = ref(false);
</script>

<template>


<nav class="navbar navbar-expand-lg bg-body-tertiary" v-if="!waiting">
  <div class="container-fluid">
    <a href="index.html" class="logo d-flex align-items-center">
        <img src="../../assets/img/charika.png" alt="" style="width: 190px;margin-top: -16px;">
      </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
      <ul class="navbar-nav" style="margin-left: 10px;">
        <li class="nav-item">
          <router-link to="/" class="nav-link active">Home</router-link>
        </li>
        <li class="nav-item" v-if="!useAuthStore().getUser">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="!useAuthStore().getUser">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/companies" class="nav-link">Companies</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/reviews" class="nav-link">Reviews</router-link>
        </li>
        <!-- <li class="nav-item dropdown" v-if="useAuthStore().getUser">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Profile
          </a>
          <ul class="dropdown-menu" >
            <li><a class="dropdown-item" href="#">Action</a></li>
            <router-link to="/profile" class="dropdown-item">Profile</router-link>
            <li><a class="dropdown-item" href="#"   @click="Logout">Logout</a></li>
          </ul>
        </li> -->
       
      </ul>
      <div>
        <div class="">
          <a href="#about" class="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center" v-if="!useAuthStore().getUser">
            <span>Make Review</span>
            <i class="bi bi-arrow-right"></i>
          </a>
        
          <div class="btn-group dropdown" v-if="useAuthStore().getUser" style="margin-right: 200px;">
            <img :src="useAuthStore().getUser.photo==null?'https://www.citypng.com/public/uploads/small/11639786938ezifytzfr8tbs8nzjsjdc1z0aqtrhyhq1zkujoyerqksff9tsl1f7vg9k1ujbojemibzdoayolcjrzbhp4euwhqjtyfa00tk9okr.png':useAuthStore().getUser.photo" class="" style="width: 50px;border-radius: 50%;height: 50px;border: 2px solid green;"  alt="" data-bs-toggle="dropdown">
            <ul class="dropdown-menu">
              <router-link to="/profile" class="dropdown-item">Profile</router-link  >
               <li><a class="dropdown-item" @click="Logout" style="cursor: pointer;">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      
     
      
     
    </div>
  </div>
</nav>
</template>

<style>
</style>