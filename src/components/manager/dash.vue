<script setup>
import { ref,onBeforeMount,computed } from "vue";
import Footer from "../Home/footer.vue";
import Loader from "../composants/loader.vue";
import { useAuthStore } from "../../stores/auth";
import Dashboard  from "./pages/dashboard.vue";
import New_company from "./pages/company/new_company.vue";
import All_companies from "./pages/company/all_companies.vue";
import My_companies from "./pages/company/my_companies.vue";
import My_related_reviews from "./pages/review/my_related_reviews.vue";
import All_reviews from "./pages/review/all_reviews.vue";
const currentComponent = ref(Dashboard);
const wrapper = ref("");
const wait = computed(()=>{
  if(useAuthStore().getRole=='manager') return true;
  else return false;
}
);

const toggle = () => {
    if(wrapper.value == "toggled"){
        wrapper.value = "";
    }else{
        wrapper.value = "toggled";
    }
};
onBeforeMount(async ()=>{
  if(useAuthStore().getUser==null|| wait.value==false){
    await useAuthStore().checkAuth('manager');
  }
});
</script>
<template>
<Loader :loaderName="'main'"></Loader>
<div id="page-content-wrapper" class="box" v-if="wait">
<nav class="navbar navbar-expand-lg navbar-light bg-transparent p-3  justify-content-between" id="">
            <i class="bi bi-list mycolor fs-3" @click="toggle" style="cursor: pointer;"></i>
            <div class="d-flex align-items-center ms-auto">
                <div class="pt-3 me-3">
                  <p class="fs-6 text-white">Today : {{ `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}` }}</p>
                </div>
                <i class="uil uil-calendar-alt fs-2 mt-1 box rounded p-2 mycolor"></i>
            </div>
</nav>
</div>
<div class="d-flex bg-light " :class="wrapper" id="wrapper">
 <div class="myBackground2 " id="sidebar-wrapper">
            <div class="sidebar-heading text-center d-flex flex-column py-4 fs-5 border-bottom mt-5">
                <button  name="logout" class="btn btn-lg btn-block btn-light my-3 mycolor button1 fs-6 w-100">Welcome</button>
</div>
                <a  @click="currentComponent = Dashboard" class="list-group-item list " style="cursor: pointer;margin-left: 10px;"><i class="bi bi-speedometer2 fs-4 me-3"></i>Dashboard</a>
                <li class="nav-item dropdown" style="list-style: none;margin-left: 10px;">
                        <a class="list-group-item list" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="bi bi-building fs-4 me-2 "></i> Companies
                        </a>
                        <ul class="dropdown-menu" style="cursor: pointer;">
                            <li><a class="dropdown-item" @click="currentComponent = New_company">New Company</a></li>
                            <li><a class="dropdown-item" @click="currentComponent = All_companies">All Companies</a></li>
                            <li><a class="dropdown-item" @click="currentComponent = My_companies">My Companies</a></li>
                        </ul>
                </li>
                <li class="nav-item dropdown" style="list-style: none;margin-left: 10px;">
                        <a class="list-group-item list" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="bi bi-chat-left-text fs-4 me-2 "></i> Reviews
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item"  @click="currentComponent = All_reviews">All Reviews</a></li>
                            <li><a class="dropdown-item" @click="currentComponent = My_related_reviews">My Related Reviews</a></li>
                        </ul>
                </li>
                
 </div>
 <div class="container">
    <component :is="currentComponent"></component>
    <Footer></Footer>

 </div>
</div>
</template>
<style scoped>
.list{
    color: #4154f1;
    font-size: 1.2rem;
    font-weight: 400;
}
.box{
    background-color: #3449ee;
}

.mycolor{
  color:#e4a98c;
}
.myBackground2{
  background-color:#fefefe;
}

.button1{
    background-color:#2b37b9;
}
  #sidebar-wrapper {
    min-height: 100vh;
    min-width: 15rem;
    margin-left: -15rem;
    transition-duration: 1s;
  }
  
  #sidebar-wrapper .sidebar-heading {
    padding: 0.5rem;
    font-size: 1.2rem;
  }
  
  #sidebar-wrapper .list-group {
    min-width: 15rem;
    transition-duration: 1s;
  }
  
  #page-content-wrapper {
    width:100%
   

  }
  
  #wrapper.toggled #sidebar-wrapper {
    margin-left: 0;
  }
  

  .list-group-item {
    border: none;
    padding: 20px 30px;
  }
  
  #menu-toggle{
    cursor: pointer;
  }
 
  @media (min-width: 768px) {
    #sidebar-wrapper {
      margin-left: 0; 
    }

    #wrapper.toggled #sidebar-wrapper {
      margin-left: -15rem;
    }
  }



</style>