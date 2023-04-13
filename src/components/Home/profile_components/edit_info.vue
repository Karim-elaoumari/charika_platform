<script setup>
import { ref,onBeforeMount } from 'vue';
import { useAuthStore } from "../../../stores/auth";
import { useAlertStore } from "../../../stores/alert";
import { useJobStore} from "../../../stores/job";
import Alert from "../../composants/alert.vue";
import Loader from "../../composants/loader.vue";
const imageUrl = ref('https://www.citypng.com/public/uploads/small/11639786938ezifytzfr8tbs8nzjsjdc1z0aqtrhyhq1zkujoyerqksff9tsl1f7vg9k1ujbojemibzdoayolcjrzbhp4euwhqjtyfa00tk9okr.png');



onBeforeMount(async()=>{
  if(useJobStore().getJobs.length == 0){
    await useJobStore().fetchJobs();
  }
});
const form = ref({
  'first_name':useAuthStore().getUser.first_name,
  'last_name':useAuthStore().getUser.last_name,
  'speciality':useAuthStore().getUser.speciality,
  'job_id':useAuthStore().getUser.job_id,
});
const updateImage = (event) =>{
      const file = event.target.files[0];
      imageUrl.value = URL.createObjectURL(file);
      form.value.photo = file;
}
if(useAuthStore().getUser.photo!=null){
  imageUrl.value = useAuthStore().getUser.photo;
}
const handleInfo = ()=> {
  if(form.value.first_name == '' || form.value.last_name == '' || form.value.speciality == '' || form.value.job_id == ''){
    useAlertStore().setAlert('alert-danger','Please fill all the fields');
  }
  else{
    const formData = new FormData()
    formData.append('first_name', form.value.first_name)
    formData.append('last_name', form.value.last_name)
    formData.append('speciality', form.value.speciality)
    formData.append('job_id', form.value.job_id)
    formData.append('photo', form.value.photo)
    formData.append('_method', 'PUT')
    useAuthStore().updateUser(formData);
  }
}
const switchSelect = (event)=>{
      form.value.job_id = event.target.value;
      console.log(form.value.job_id);
}
</script>
<template>
    <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-md-12 col-xl-4 w-100" >
                <div>
                 
              <form @submit.prevent="handleInfo">
                <Alert/>
                <Loader :loaderName="'updateInfoUser'"></Loader>
                  <div class="card-body text-center row" style="min-height:400px">
                    
                  
                   
                    <div class="col-lg-6 col-md-6 col-12"  style="height:300px">
                      <h4 class="mt-4">Your Photo</h4>
                         <div class="mb-3 mt-3">
                             <img :src="imageUrl" style="width: 200px;border-radius: 50%;height:200px;" alt="image_profile">
                          </div>
                          <div class="mb-3">
                            <input type="file"  class="form-control" v-on:change="updateImage">
                          </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12" style="height:300px">
                      <h4 class="mt-4">Détails</h4>
                            <div class="mb-3 mt-5">
                               <input type="text"  class="form-control "  v-model="form.first_name"  placeholder="First Name">
                             </div>
                             <div class="mb-3">
                               <input type="text"  class="form-control "  v-model="form.last_name"  placeholder="Last Name">
                             </div>
                             <div class="mb-3">
                                <input type="text"  class="form-control "  v-model="form.speciality" placeholder="Speciality">
                              </div>
                             
                              <div class="mb-3">

                                <select class="form-select" @change="switchSelect($event)">
                                  <option v-for="job in useJobStore().getJobs" :value="job.id" :selected="job.id==form.job_id">{{ job.name }}</option>
                                </select>
                              </div>
                            
                        
                    </div>
                    <div class="text-center pt-5">
                      <button type="submit" class="btn " style="background-color: #012970;color:aliceblue;height:40px;width:300px;" >Save Profile Information</button>
                    </div>
                    </div>
                  </form>
                  </div>
               
                </div>
        
              </div>

</template>
<style scoped>
</style>