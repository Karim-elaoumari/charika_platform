<script setup>
import { ref, onBeforeMount,computed } from "vue";
import { useAuthStore } from '../../../stores/auth';
import Loader from "../../composants/loader.vue";
import Alert from "../../composants/alert.vue";
import {useRouter} from 'vue-router'
import Swal from 'sweetalert2';
const router = useRouter();
const typeSelected = ref('');
const userStore = useAuthStore();
const users = computed(()=>{
  if(typeSelected.value!=''){
    return userStore.getUsers.filter(user=>user.role==typeSelected.value);
  }else{
    return userStore.getUsers
  }
});


onBeforeMount(async() => {
  if(!userStore.getUsers.length!=0){
   await userStore.fetchUsers();
  }
});
const current_page = ref(1);
const handle_page = (page)=>{
  if(page < 1 || page > Math.ceil(users.value.length/7)) return;
  current_page.value = page;
}
const items = computed(()=>{
  return users.value.slice((current_page.value-1)*7,current_page.value*7);
});
const selectedCompanyLink = (user)=>{
 const slug = user.name.replace(/\s+/g, '-');
  router.push({name:'user',params:{name:slug}});
}
const selectedManager = ref(null);
const selectedSecondManager = ref(null);
const switchToManager = (id)=>{
  Swal.fire({
  title: 'Are you sure?',
  text: "You want to Switch this User into Manager!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: 'green',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) =>{
  if (result.isConfirmed) {
    userStore.switchUserToManager(id);
  }
}) 
}
const switchToUser = (id)=>{
  Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.isConfirmed) {
    if(selectedSecondManager.value==null){userStore.switchManagerToUser(id)}
    else {userStore.switchManagerToUser(selectedManager.value.id,selectedSecondManager.value)}
    selectedManager.value = null;
    selectedSecondManager.value = null;
  }
})
}
</script>

<template>
<div class="card mt-2" style="min-height: 80vh;">
<div class="card-body  px-md-5">
<div class=" table-responsive mt-2">
    <Alert></Alert>
    <Loader :loaderName="'wait_users'"></Loader>
    <h5 class="text-primary">Search</h5>
        <div class="d-flex" role="search">
       
        <select class="form-select" aria-label="Default select example" v-model="typeSelected" style="width:40%">
          <option selected value="">--- All ---</option>
          <option value="manager">--- Managers ---</option>
          <option value="user">--- Users ---</option>
        </select>
      </div>
      <br>
    <h3 v-if="items.length==0" class="text-center">No Users Available</h3>
    

    <table v-else class="table align-middle mb-0 bg-white" style="border: 1px solid blue;" >
  <thead class="bg-light">
    <tr>
      <th>User</th>
      <th>Job</th>
      <th>Email</th>
      <th>Role</th>
      <th>Speciality</th>
      <th>action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in items">
      
      <td>
        <div class="d-flex align-items-center">
          <img
              :src="user.logo"
              alt=""
              style="width: 45px; height: 45px;border-radius: 10%;"
              />
          <div class="ms-3">
            <p class="fw-bold mb-1">{{ user.first_name }}</p>
            <p class="fw-bold mb-1">{{ user.last_name }}</p>
          </div>
        </div>
      </td>
      <td>
        {{ user.job}} 
      </td>
      <td>
       
        <p class="fw-bold mb-1">{{ user.email }}</p>
      </td>
      <td>{{ user.role }}</td>
      <td>{{ user.speciality }}</td>
      <td>
        <button type="button" v-if="user.role=='user'"  class="btn  btn-outline-primary btn-sm btn-rounded" @click="switchToManager(user.id)">
          Switch to Manager
        </button>
        <div v-else>
          <button type="button"  v-if="user.companies_count>0" class="btn  btn-outline-success btn-sm btn-rounded" @click="selectedManager=user" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Switch to User
        </button>
        <button type="button"  v-else class="btn  btn-outline-success btn-sm btn-rounded" @click="switchToUser(user.id)">
          Switch to User
        </button>
        </div>
        
      </td>
    </tr>
   
  </tbody>
</table>
<ul class="pagination  justify-content-center mt-3" style="cursor: pointer;">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous" @click="handle_page(current_page-1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link active" @click="handle_page(current_page)">{{ current_page }}</a></li>
            <li class="page-item"><a class="page-link" @click="handle_page(current_page+1)">{{ current_page+1 }}</a></li>
            <li class="page-item"><a class="page-link" @click="handle_page(current_page+2)">{{ current_page+2 }}</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next" @click="handle_page(current_page+1)">
                <span aria-hidden="true" >&raquo;</span>
              </a>
            </li>
</ul>
           </div>
</div>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h3 style="color: #012970;"> To switch this Manager You need to Switch All his Companies to another User</h3>
        <h5>Select manager to give Companies</h5>
        <select class="form-select" v-model="selectedSecondManager"  v-if="selectedManager">
        <option :value="user.id" v-for="user in users.filter(user=>(user.role=='manager' && user.id!=selectedManager.id) )"  >{{ user.first_name+' '+user.last_name }}</option>
      </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" :disabled="!selectedSecondManager" @click="switchToUser" data-bs-dismiss="modal" >Switch Now</button>
      </div>
    </div>
  </div>
</div>

</template>
<style>
</style>