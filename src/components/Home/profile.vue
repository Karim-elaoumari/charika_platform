<script setup>
import { ref,onBeforeMount } from "vue"
import {useRouter} from 'vue-router'
import { useAuthStore } from "../../stores/auth";
import Loader from "../composants/loader.vue";
import Edit_info from "./profile_components/edit_info.vue"
import Footer from "./footer.vue";
import Edit_password_email from "./profile_components/edit_password_email.vue"
onBeforeMount(async ()=>{
  if(useAuthStore().getUser==null){
    await useAuthStore().checkAuth();
  }
});
const currentComponent = ref(Edit_info);
</script>
<template>
    <Loader :loaderName="'main'"></Loader>
    <section  v-if="useAuthStore().getUser" class="row mt-3 px-3">
        <div class=" col-lg-4 col-12 col-md-6 container py-5">
          <div class="row d-flex justify-content-center align-items-center ">
            <div class="col-md-12 col-xl-4 w-100">
              <div class="card" style="border-radius: 15px;">
                <h2 class="text-center mt-4">Profile</h2>
                <div class="card-body text-center">
                  <div class="mt-3 mb-4">
                    <img :src="useAuthStore().getUser.photo"
                      class="rounded-circle img-fluid" style="width: 100px;height: 100px;" />
                  </div>
                  <h4 class="mb-2" style=" color: #012970;">{{ useAuthStore().getUser.first_name+"  "+useAuthStore().getUser.last_name }}</h4>
                  <p class="text-muted mb-4">{{ useAuthStore().getUser.email }}<span class="mx-2">|</span><a href="">{{ useAuthStore().getUser.role }}</a></p>
                  <div class="d-flex justify-content-around text-center mt-5 mb-2">
                    <div class="mt-5">
                      <p class="mb-2 h5">{{ useAuthStore().getUser.speciality }}</p>
                      <p class="text-muted mb-0">Speciality</p>
                    </div>
                    <div class="mt-5">
                      <p class="mb-2 h5">
                        {{ useAuthStore().getUser.job }}</p>
                      <p class="text-muted mb-0">Job name</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 col-12  container py-2  text-center card justify-content-center" style="border-radius: 15px;">
           <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-info " style="width:45%" @click="currentComponent=Edit_info">Edit Profile info</button><button type="button" class="btn btn-info ms-3" style="width:45%" @click="currentComponent=Edit_password_email">Change Password OR Email</button>
           </div>
           <hr>
            <div class="mt-4">
                <component :is="currentComponent"></component>
            </div>
        </div>
  </section>
  <Footer></Footer>
</template>
<style scoped>
</style>