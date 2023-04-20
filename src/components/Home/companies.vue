<script setup>
import Footer from "./footer.vue";
import { useCompanyStore } from "../../stores/company";
import { useIndustyStore } from "../../stores/industry";
import { Country, City}  from 'country-state-city';
import { ref, onBeforeMount, computed } from "vue";
import Loader from "../composants/loader.vue";
import {useRouter} from 'vue-router'
const router = useRouter();
const industryStore = useIndustyStore();
const companyStore = useCompanyStore();
const companies = ref([]);
const wait = ref(false);
onBeforeMount(async() => {
  if(industryStore.getIndustries.length==0){
    await industryStore.fetchIndustries();
  }
  if(companyStore.getCompanies.length==0){
    await companyStore.fetchCompanies();
  }
  companies.value.push(...companyStore.getCompanies);
  wait.value = true;
});
const search = ref('');
const industrySelected = ref('');
const current_page = ref(1);
const handle_page = (page)=>{
  if(page < 1 || page > Math.ceil(companies.value.length/4)) return;
  current_page.value = page;
}
const handle_search = ()=>{
  if(industrySelected.value!=''){
    companies.value = companyStore.companies.filter(company=>company.name.toLowerCase().includes(search.value.toLowerCase()) && company.industry.id==industrySelected.value);
  }else{
    companies.value = companyStore.companies.filter(company=>company.name.toLowerCase().includes(search.value.toLowerCase()));
  }
  current_page.value = 1;
}
const items = computed(()=>{
  return companies.value.slice((current_page.value-1)*4,current_page.value*4);
});

const selectedCompany = (company)=>{
  
  company.name = company.name.replace(/\s+/g, '-');
  router.push({name:'company',params:{name:company.name}});
}
</script>
<template>
  <Loader :loaderName="'main'"></Loader>
  <Loader :loaderName="'wait_company'"></Loader>
  <Loader :loaderName="'wait_industrie'"></Loader>
<main id="main" v-if="wait">
<section class="breadcrumbs">
  <div class="container">
    <h2>Companies</h2>
  </div>
</section>
<section  class="blog">
  <div class="container">

    <div class="row">
      <div class="col-lg-8 entries">
        <h5 class="text-primary">Search</h5>
        <div class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search by company name ..." aria-label="Search" v-model="search">
        <select class="form-select " aria-label="Default select example" v-model="industrySelected">
          <option selected value="">All Industries</option>
          <option v-for="industry in industryStore.getIndustries" :value="industry.id">{{ industry.name }}</option>
        </select>
        <button class=" ms-2 btn btn-outline-primary" @click="handle_search"><i class="bi bi-search"></i></button>
        </div><br>
        
        <article class="entry mt-3" v-for="company in items" style="cursor: pointer;" @click="selectedCompany(company)">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img :src="company.logo" style="max-width: 100px;height: 90px;" alt=""></div>
              <div style="padding-left: 7px;">
                <h4 style="color: #4154f1;">{{ company.name }} </h4>
                <p class="text-muted mb-0">{{ company.industry.name }}</p>
                <p>
                  {{company.description.slice(0, 200) + '...'}}
                </p>
              </div>
            </div>
          </div>
          <div class="entry-meta">
            <ul>
              <li class=""><i class="bi bi-person"></i> <a href="">Employees: {{ company.employees }}</a></li>
              <li class=""><i class="bi bi-chat-dots"></i> <a href="">Reviews: {{ company.reviews_count }}</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-emoji-smile"></i> <a href="">Rate:  <i class="bi bi-star-fill " :style=" {color: company.stars>0 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: company.stars>1 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: company.stars>2 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: company.stars>3 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: company.stars>4 ? '#fbc634' : ''}" style="font-size:small;"></i></a></li>
              <li class=""><i class="bi bi-houses"></i> <a href="">Location: {{ Country.getCountryByCode(company.country_code).name+" "+company.city }}</a></li>
            </ul>
          </div>
        </article>
       

        
        

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

      <div class="col-lg-4">

        <div class="sidebar">

        

          

          <h3 class="sidebar-title">Recent Reviews</h3>
          <div class="sidebar-item recent-posts">
            <div class="post-item clearfix">
              <img src="../../assets/img/blog/blog-recent-1.jpg" alt="">
              <h4><a href="">Nihil blanditiis at in nihil autem</a></h4>
              <time datetime="2020-01-01">Jan 1, 2020</time>
            </div>

            <div class="post-item clearfix">
              <img src="../../assets/img/blog/blog-recent-2.jpg" alt="">
              <h4><a href="">Quidem autem et impedit</a></h4>
              <time datetime="2020-01-01">Jan 1, 2020</time>
            </div>

            <div class="post-item clearfix">
              <img src="../../assets/img/blog/blog-recent-3.jpg" alt="">
              <h4><a href="">Id quia et et ut maxime similique occaecati ut</a></h4>
              <time datetime="2020-01-01">Jan 1, 2020</time>
            </div>

            <div class="post-item clearfix">
              <img src="../../assets/img/blog/blog-recent-4.jpg" alt="">
              <h4><a href="blog-single.html">Laborum corporis quo dara net para</a></h4>
              <time datetime="2020-01-01">Jan 1, 2020</time>
            </div>

            <div class="post-item clearfix">
              <img src="../../assets/img/blog/blog-recent-5.jpg" alt="">
              <h4><a href="">Et dolores corrupti quae illo quod dolor</a></h4>
              <time datetime="2020-01-01">Jan 1, 2020</time>
            </div>

          </div>

          <h3 class="sidebar-title">Tags</h3>
          <div class="sidebar-item tags">
            <ul>
              <li><a href="#">App</a></li>
              <li><a href="#">IT</a></li>
              <li><a href="#">Business</a></li>
              <li><a href="#">Mac</a></li>
              <li><a href="#">Design</a></li>
              <li><a href="#">Office</a></li>
              <li><a href="#">Creative</a></li>
              <li><a href="#">Studio</a></li>
              <li><a href="#">Smart</a></li>
              <li><a href="#">Tips</a></li>
              <li><a href="#">Marketing</a></li>
            </ul>
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