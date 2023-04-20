
<script setup>

import {ref,onBeforeMount,computed} from "vue";
import Alert from "../composants/alert.vue";
import Loader from "../composants/loader.vue";
import Footer from "./footer.vue";
import { useCompanyStore } from "../../stores/company";
import { Country, City}  from 'country-state-city';
import {useRouter} from 'vue-router'
const router = useRouter();
const companyStore = useCompanyStore();
const companies = ref([]);
onBeforeMount(async() =>{
  if(companyStore.getCompanies.length==0){
    await companyStore.fetchCompanies();
  }
  companies.value.push(...companyStore.getCompanies);
});
const top4CompaniesReveiwed = computed(()=>{
  return companies.value.sort((a,b)=>b.reviews_count-a.reviews_count).slice(0,6);
});
const selectedCompany = (company)=>{
  
  company.name = company.name.replace(/\s+/g, '-');
  router.push({name:'company',params:{name:company.name}});
}
</script>
<template>
   <Loader :loaderName="'main'"></Loader>
   <Loader :loaderName="'wait_company'"></Loader>
    <!-- <div v-if="authStore.getuser" class="text-danger">  {{ authStore.getuser.email }}</div>
    <div v-else class="text-danger"> anuthetified</div> -->
    <section id="hero" class="hero d-flex align-items-center">
<div class="container">
  <Alert></Alert>
  <div class="row">
    <div class="col-lg-6 d-flex flex-column justify-content-center">
      <h1 data-aos="fade-up">Unlock the power of customer feedback to find the best companies</h1>
      <h2 data-aos="fade-up" data-aos-delay="400">Expert analysis and unbiased reviews to help you choose the right company</h2>
      <div data-aos="fade-up" data-aos-delay="600">
       
        <form class="d-flex" role="search">
         
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-primary" type="submit">Search</button>
        </form>
      </div>
    </div>
    <div class="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
      <img src="../../assets/img/company.jpg" class="img-fluid" alt="">
    </div>
  </div>
</div>

</section>

<main id="main">

<section id="about" class="about">
  

  <div class="container" data-aos="fade-up">
    <div class="row gx-0">

      <div class="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
        <div class="content">
          <h3>Why Charika not Others:</h3>
         
          <p>
          you can find expert analysis and unbiased reviews to help you make informed decisions about the best companies for your needs. Our platform empowers consumers by providing reliable reviews and comprehensive comparisons of top-rated companies in various industries.

Whether you're searching for the perfect match for your business or personal needs, our user-friendly review platform makes it easy to discover and compare companies side-by-side. Our trusted reviews and analysis provide the inside scoop on top companies, unlocking the power of customer feedback and helping you make confident decisions.

Stay ahead of the competition with our in-depth reviews and ratings, and experience the difference with our comprehensive company comparisons. Make better business decisions with our expert analysis and unbiased reviews, and find the best companies to meet your needs. Join our community today and start discovering the best companies for you!
            </p>
          <div class="text-center text-lg-start">
            <a href="#" class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
              <span>Explore Now</span>
              <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
        <img src="../../assets/img/worker_power.jpg" class="img-fluid" alt="">
      </div>

    </div>
  </div>

</section>




<section id="counts" class="counts">
  <div class="container" data-aos="fade-up">
    <header class="section-header">
      <p>What You Can Do ?</p>
    </header>
    <div class="row gy-4">

      <div class="col-lg-3 col-md-6">
        <div class="count-box">
          <i class="bi bi-search"></i>
          <div>
            <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" class="purecounter"></span>
            <p>Explore Companies</p>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="count-box">
          <i class="bi bi-file-earmark-text" style="color: #ee6c20;"></i>
          <div>
            <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" class="purecounter"></span>
            <p>View Reviews</p>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="count-box">
          <i class="bi bi-file-earmark-plus" style="color: #15be56;"></i>
          <div>
            <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" class="purecounter"></span>
            <p>Make Reviews</p>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="count-box">
          <i class="bi bi-chat-right-dots" style="color: #bb0852;"></i>
          <div>
            <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" class="purecounter"></span>
            <p>Make Comments</p>
          </div>
        </div>
      </div>

    </div>

  </div>
</section>




<section id="recent-blog-posts" class="recent-blog-posts">

  <div class="container" data-aos="fade-up">

    <header class="section-header">
      <p>Top Companies</p>
    </header>

    <div class="row">

      <div class="col-lg-6 entries blog" v-for="company in top4CompaniesReveiwed" @click="selectedCompany(company)">
        <article class="entry mt-3"  style="cursor: pointer;" >
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
      </div>
      
     

      

    </div>

  </div>

</section>

</main>
<Footer></Footer>


</template>
<style>
</style>