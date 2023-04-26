<script setup>
import Footer from "./footer.vue";
import { useCompanyStore } from "../../stores/company";
import { ref, onBeforeMount, computed } from "vue";
import Loader from "../composants/loader.vue";
//  ---------------------------------------

// ----------------------------------------
import {useRouter} from 'vue-router'


const companyStore = useCompanyStore();
const router = useRouter();

const  wait = ref(false);
const  slug = router.currentRoute.value.params.name;
const name1 = slug.split('-vs-')[0];
const name2 = slug.split('-vs-')[1];
const companies = computed(()=>companyStore.getTwoCompanies);
onBeforeMount(async () =>{
  if(companyStore.getTwoCompanies.length==0 || (companyStore.getTwoCompanies[0].name!=name1.replace(/-/g, ' ') && companyStore.getTwoCompanies[1].name!=name1.replace(/-/g, ' ')) || (companyStore.getTwoCompanies[0].name!=name2.replace(/-/g, ' ') && companyStore.getTwoCompanies[1].name!=name2.replace(/-/g, ' '))){
    console.log(name1);
    await companyStore.fetchTwoCompanies(name1,name2);
  }
  wait.value = true;
});

</script>
<template>
  <Loader :loaderName="'main'"></Loader>
  <Loader :loaderName="'wait_company'"></Loader>
<main id="main" v-if="wait">
<section class="breadcrumbs mt-0" style="height: 60px;">
  <div class="container">
    <h2>Company vs Company</h2>
  </div>
</section>
<section  class="blog">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 entries">
        <div class="">
        
        <div class="shadow  p-4 d-flex justify-content-between">
          
            <div class="col-5" dir="rtl">
             
              <div class="card-header py-3">
                <img :src="companies[0].logo" style="width: 60px;height: 60px;border-radius:10%;" alt="" class="mb-2 ">
                  <h6 class="m-0 font-weight-bold text-primary">{{ companies[0].name }}</h6>
                </div>
                <div class="card-body">
                  <h4 class="small font-weight-bold"><span class="ms-4">Rating  </span> 
                <i class="bi bi-star-fill fs-6" :style=" {color: companies[0].stars>0 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill fs-6" :style=" {color: companies[0].stars>1 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill fs-6" :style=" {color: companies[0].stars>2 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill fs-6" :style=" {color: companies[0].stars>3 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill fs-6" :style=" {color: companies[0].stars>4 ? '#fbc634' : ''}" ></i>
                  </h4>
                  <div class="progress mb-4" style="width: 15%" v-if="companies[0].stars<companies[1].stars">
                    <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div class="progress mb-4" style="width: 30%" v-else>
                    <div class="progress-bar bg-success" role="progressbar" style="width: 100%"></div>
                  </div>
                  
                  <h4 class="small font-weight-bold">Reviews <span class="float-right">{{ companies[0].reviews_count }}</span></h4>
                  <div class="progress mb-4" style="width: 15%" v-if="companies[0].reviews_count<companies[1].reviews_count">
                    <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div class="progress mb-4" style="width: 30%" v-else>
                    <div class="progress-bar bg-success" role="progressbar" style="width: 100%"></div>
                  </div>
                  <h4 class="small font-weight-bold">Employees <span class="float-right">{{ companies[0].employees }}</span></h4>
                  <div class="progress mb-4" style="width: 15%" v-if="companies[0].employees<companies[1].employees">
                    <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div class="progress mb-4" style="width: 30%" v-else>
                    <div class="progress-bar bg-success" role="progressbar" style="width: 100%"></div>
                  </div>
                  <h4 class="small font-weight-bold">Revenue <span class="float-right">{{ companies[0].revenue }}</span></h4>
                  <div class="progress mb-4" style="width: 15%" v-if="companies[0].revenue<companies[1].revenue">
                    <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div class="progress mb-4" style="width: 30%" v-else>
                    <div class="progress-bar bg-success" role="progressbar" style="width: 100%"></div>
                  </div>
                 
                </div>
            </div>
            <h3 style="z-index: 100px;color: #012970" class="text-center pt-5 col-1"> VS</h3>
            <div class="col-5" >
              <div class="card-header py-3">
                <img :src="companies[1].logo" style="width: 60px;height: 60px;border-radius:10%;" alt="" class="mb-2 ">
                  <h6 class="m-0 font-weight-bold text-primary">{{ companies[1].name }}</h6>
                </div>
                <div class="card-body">
                  <h4 class="small font-weight-bold"><span class="ms-4">Rating  </span> 
                <i class="bi bi-star-fill fs-6" :style=" {color: companies[1].stars>0 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill fs-6" :style=" {color: companies[1].stars>1 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill fs-6" :style=" {color: companies[1].stars>2 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill fs-6" :style=" {color: companies[1].stars>3 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill fs-6" :style=" {color: companies[1].stars>4 ? '#fbc634' : ''}" ></i>
                  </h4>
                  <div class="progress mb-4" style="width: 15%" v-if="companies[1].stars<companies[0].stars">
                    <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div class="progress mb-4" style="width: 30%" v-else>
                    <div class="progress-bar bg-success" role="progressbar" style="width: 100%"></div>
                  </div>
                  <h4 class="small font-weight-bold">Reviews <span class="float-right">{{ companies[1].reviews_count }}</span></h4>
                  <div class="progress mb-4" style="width: 15%" v-if="companies[0].reviews_count>companies[1].reviews_count">
                    <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div class="progress mb-4" style="width: 30%" v-else>
                    <div class="progress-bar bg-success" role="progressbar" style="width: 100%"></div>
                  </div>
                  <h4 class="small font-weight-bold">Employees <span class="float-right">{{ companies[1].employees }}</span></h4>
                  <div class="progress mb-4" style="width: 15%" v-if="companies[0].employees>companies[1].employees">
                    <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div class="progress mb-4" style="width: 30%" v-else>
                    <div class="progress-bar bg-success" role="progressbar" style="width: 100%"></div>
                  </div>
                  <h4 class="small font-weight-bold">Revenue <span class="float-right">{{ companies[1].revenue }}</span></h4>
                  <div class="progress mb-4" style="width: 15%" v-if="companies[0].revenue>companies[1].revenue">
                    <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div class="progress mb-4" style="width: 30%" v-else>
                    <div class="progress-bar bg-success" role="progressbar" style="width: 100%"></div>
                  </div>
                 
                </div>  
            </div>
                
          </div>
        </div>
       
      </div>

      <div class="col-lg-4">

        <div class="sidebar">
         
          <h3 class="sidebar-title">ADS</h3>

            <img  style="width: 100%;"  src="../../assets/img/ads.png">
        </div>

      </div>

    </div>

  </div>
</section>

</main>

<Footer></Footer>


</template>
<style scoped>
</style>