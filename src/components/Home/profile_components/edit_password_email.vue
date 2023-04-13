<script setup>
import { ref } from "vue";
import Loader from "../../composants/loader.vue";
import Alert from "../../composants/alert.vue";
import { useAlertStore } from "../../../stores/alert";
import { useAuthStore } from "../../../stores/auth";
const userStore = useAuthStore();

const alertStore = useAlertStore();
const whoClicked = ref(null);
const email_form = ref({
  'email': 'qsdq',
  'password': 'dqsd',
});
const password_form = ref({
  'last_password': '',
  'new_password': '',
  'confirm_password': '',
});
const handleEmailInfo = ()=>{
  whoClicked.value = 'email';
  if(email_form.value.email == '' || email_form.value.password == ''){
    alertStore.setAlert('alert-danger','Please fill all the fields');
    return;
  }
  else if(!email_form.value.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
    alertStore.setAlert('alert-danger','Please enter a valid email');
    return;
  }
  else{
    userStore.updateEmail(email_form.value.email,email_form.value.password);
  }
}
const handlePasswordInfo = ()=>{
  whoClicked.value = 'password';
  if(password_form.value.last_password == '' || password_form.value.new_password == '' || password_form.value.confirm_password == ''){
    alertStore.setAlert('alert-danger','Please fill all the fields');
    return;
  }
  else if(password_form.value.new_password.length < 8){
    alertStore.setAlert('alert-danger','Password must be at least 8 characters');
    return;
  }
  else if(password_form.value.new_password != password_form.value.confirm_password){
    alertStore.setAlert('alert-danger','Passwords do not match');
    return;
  }
  else{
    userStore.updatePassword(password_form.value.last_password,password_form.value.new_password,password_form.value.confirm_password);
  }
}
</script>
<template>
    <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-md-12 col-xl-4 w-100" >
        
                <div>
                  <div class="card-body text-center row " style="min-height:400px">
                    <div class="col-lg-6 col-md-6 col-12 card "  style="height:330px;border-radius: 15px;padding-bottom: 20px;" >
                      <Alert v-if="whoClicked=='email'"></Alert>
                        <form @submit.prevent="handleEmailInfo">
                          <Loader :loaderName="'updateEmail'"></Loader>
                        <h4 class="mt-4">Change Email</h4>
                         <div class="mb-3 mt-5">
                            <input type="email" class="form-control " name="name"  placeholder="New Email" v-model="email_form.email">
                          </div>
                          <div class="mb-3">
                            <input type="password" name="password" class="form-control"  placeholder="Confirme Password" v-model="email_form.password">
                          </div>
                          <button type="submit" class="btn  w-100" style="margin-top:53px;background-color: #012970;color:aliceblue">Edit Email</button>
                        </form>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12 card " style="height:330px;border-radius: 15px;padding-bottom: 20px;">
                        <Alert v-if="whoClicked=='password'"></Alert>
                        <form @submit.prevent="handlePasswordInfo">
                          <h4 class="mt-4">Change Password</h4>
                          <Loader :loaderName="'updatePassword'"></Loader>
                            <div class="mb-3 mt-5">
                               <input type="password" name="last_password" class="form-control "  placeholder="Last Password" v-model="password_form.last_password">
                             </div>
                             <div class="mb-3">
                               <input type="password" name="new_password" class="form-control "  placeholder="New Password" v-model="password_form.new_password">
                             </div>
                             <div class="mb-3">
                                <input type="password" name="conf_password" class="form-control "  placeholder="Confirme Password" v-model="password_form.confirm_password">
                            </div>
                              <div class="" style="margin-bottom: 20px;">
                                <button type="submit" class="btn  w-100 " style="background-color: #012970;color:aliceblue">Edit Password</button>
                              </div>
                            
                        </form>
                        </div>
                    </div>

                  </div>
                </div>
        
              </div>
    
</template>
<style scoped>
</style>