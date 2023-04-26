<script setup>
import Footer from "./footer.vue";
import { useCompanyStore } from "../../stores/company";
import { ref, onBeforeMount,computed} from "vue";
import { useAlertStore } from "../../stores/alert";
import Loader from "../composants/loader.vue";
import Alert from "../composants/alert.vue";

import {useRouter} from 'vue-router'
const alertStore = useAlertStore();
const router = useRouter();
const companyStore = useCompanyStore();
const wait = ref(false);
onBeforeMount(async() => {
  if(companyStore.getCompanies.length==0){
    await companyStore.fetchCompanies();
  }
  wait.value = true;
});
const search1 = ref('');
const search2 = ref('');

const items_search1 = computed(()=>{
  if(search1.value!='') return companyStore.getCompanies.filter(company=>company.name.toLowerCase().includes(search1.value.toLowerCase()))
  else return [];
});

const items_search2 = computed(()=>{
  if(search2.value!='') return companyStore.getCompanies.filter(company=>company.name.toLowerCase().includes(search2.value.toLowerCase()))
  else return [];
});
const compareCompanies = (company_1,company_2)=>{
  if(company_1=='' || company_2==''){
   alertStore.setAlert("alert-danger","Please choose The two companies");
  }
  else if(company_1==company_2){  
    alertStore.setAlert("alert-danger","Please choose two different companies");
  }
  else{
    const slug1 = company_1.replace(/\s+/g, '-');
    const slug2 = company_2.replace(/\s+/g, '-');
    router.push({name:'comp_vs_comp_chart',params:{name:slug1+'-vs-'+slug2}});
  }
}

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
    <div class="row ">
      <div class="col-lg-8 entries card">
        <div class=" text-center mt-4">
          <h1 class="" style="color: #012970;">Compare companies to find your perfect fit</h1>
          <div class="mt-2">Choose two companies to compare using data only found on Charika.</div>
          <div class=" mb-md-lg d-flex  align-items-center justify-content-around  text-center mt-5">
            <Alert></Alert>
              <div aria-autocomplete="list" aria-expanded="false" data-test="" role="combobox" class="css-1htgz7a">
                
                  <input autocomplete="off"  class="form-control " type="search" placeholder="Company name" aria-label="enter a company name" style="border-color: #012970;border-width: 2px;height: 50px;" v-model="search1">
                  <ul  style="position:absolute;z-index:100px;background-color:azure" class="mt-2">
                    <li class="d-flex" v-for="company in items_search1" style="margin-left:-20px;" @click="search1=company.name"> <img :src="company.logo" alt="" style="border-radius: 10%;width:35px;height: 35px;" ><p class="ms-2 mt-1">{{ company.name }}</p>  </li>
                  </ul>
              
               </div>
            <span class="fs-2" style="color: #012970;">VS</span>
              <div aria-autocomplete="list" aria-expanded="false" data-test="" >
                  <input autocomplete="off"  class="form-control " type="search" placeholder="Company name" aria-label="enter a company name" style="border-color: #012970;border-width: 2px;height: 50px;" v-model="search2">
                  <ul  style="position:absolute;z-index:100px;background-color:azure" class="mt-2">
                    <li class="d-flex" v-for="company in items_search2" style="margin-left:-20px;" @click="search2=company.name"> <img :src="company.logo" alt="" style="border-radius: 10%;width:35px;height: 35px;" ><p class="ms-2 mt-1">{{ company.name }}</p>  </li>
                  </ul>
              </div>
          </div>
          <button class=" ms-2 btn btn-outline-primary text-center px-5 py-2 text-white mt-5" style="background-color:#4154f1;" @click="compareCompanies(search1,search2)">Compare Now</button>
        </div>
       </div>  

      <div class="col-lg-4">
        <div class="sidebar">
          <h3 class="sidebar-title">ADS</h3>
              <div class="sidebar-item categories" style="padding: 0;">
            <img style="width: 100% !important;"  src="../../assets/img/ads.png" >
              </div>
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