<script setup>
import Footer from "./footer.vue";
import { useReviewStore } from "../../stores/review";
import { ref, onBeforeMount, computed } from "vue";
import Loader from "../composants/loader.vue";
import {useRouter} from 'vue-router'
const router = useRouter();
const reviewStore = useReviewStore();
const reviews = ref([]);
const wait = ref(false);
onBeforeMount(async() => {
  if(reviewStore.getReviews.length==0){
    await reviewStore.fetchReviews();
  }
  reviews.value.push(...reviewStore.getReviews);
  wait.value = true;
});
const search = ref('');
const rateSelected = ref('');
const current_page = ref(1);
const handle_page = (page)=>{
  if(page < 1 || page > Math.ceil(reviews.value.length/4)) return;
  current_page.value = page;
}
const handle_search = ()=>{
  if(rateSelected.value!=''){
    reviews.value = reviewStore.reviews.filter(review=>(review.content.toLowerCase().includes(search.value.toLowerCase()) || review.company_name.toLowerCase().includes(search.value.toLowerCase())) && review.stars==rateSelected.value);
  }else{
    reviews.value = reviewStore.reviews.filter(review=>(review.content.toLowerCase().includes(search.value.toLowerCase()) || review.company_name.toLowerCase().includes(search.value.toLowerCase())));
  }
  current_page.value = 1;
}
const items = computed(()=>{
  return reviews.value.slice((current_page.value-1)*4,current_page.value*4);
});

const selectedReview = (review)=>{
  //  replace all spaces with - and replace / with -

  const slug = review.id+'-'+review.reviewer.first_name.replace(/\s+/g, '-')+'-'+review.company_name.replace(/\s+/g, '-')+'-'+review.date.replace(/\//g, '-');
  router.push({name:'review',params:{name:slug}});
}
</script>
<template>
  <Loader :loaderName="'main'"></Loader>
  <Loader :loaderName="'wait_review'"></Loader>
<main id="main">
<section class="breadcrumbs mt-0" style="height: 60px;" >
  <div class="container">
    <h2>Reviews</h2>
  </div>
</section>

<section id="blog" class="blog">
  
  <div class="container" data-aos="fade-up">

    <div class="row">

      <div class="col-lg-8 entries">
        <h5 class="text-primary">Search</h5>
        <div class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search by company or review content" aria-label="Search" v-model="search">
        <select class="form-select " aria-label="Default select example" v-model="rateSelected">
          <option selected value="">No Filter</option>
          <option  value="5">-- 5 Stares --
          </option>
          <option  value="4">-- 4 Stares --
          </option>
          <option  value="3">-- 3 Stares --
          </option>
          <option value="2">-- 2 Stares --
          </option>
          <option  value="1">-- 1 Stare --
          </option>
          <option  value="0">-- 0 Stares --
          </option>
        </select>
        <button class=" ms-2 btn btn-outline-primary" @click="handle_search"><i class="bi bi-search"></i></button>
        </div><br>

        <article class="entry mb-3" v-for="review in items" @click="selectedReview(review)" style="cursor: pointer;">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img :src="review.reviewer.photo!=null?review.reviewer.photo:'https://www.citypng.com/public/uploads/small/11639786938ezifytzfr8tbs8nzjsjdc1z0aqtrhyhq1zkujoyerqksff9tsl1f7vg9k1ujbojemibzdoayolcjrzbhp4euwhqjtyfa00tk9okr.png'" style="width: 80px;border-radius: 50%;height: 80px;" alt=""><br>
                <img :src="review.company_logo" style="width: 40px;height:40px;border-radius: 50%;border: 1px black solid;margin-left: 48px;margin-top: -56px;" alt="">
              </div>
             
              <div style="padding-left: 7px;">
                <h5 class="ms-4 "><a  style="text-decoration: none;color: #4154f1;">{{ review.reviewer.first_name+" "+review.reviewer.last_name}} -> {{ review.company_name }}</a> </h5>
             
               
                <p>
                  {{ review.content.slice(0, 200) + '...' }}
                </p>

                
              </div>
            </div>
          </div>

          <div class="entry-meta mt-3">
            <ul>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href=""><time>{{ review.date+" "+review.time }}</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="">{{ review.comments.length }} Comments</a></li>
            </ul>
            <div class="text-end"> I rate this company :
                <i class="bi bi-star-fill " :style=" {color: review.stars>0 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill " :style=" {color: review.stars>1 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill " :style=" {color: review.stars>2 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill " :style=" {color: review.stars>3 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill " :style=" {color: review.stars>4 ? '#fbc634' : ''}" ></i>
            </div>
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
         

          <h3 class="sidebar-title">ADS</h3>
              <div class="sidebar-item categories" style="padding: 0;">
                
            <img width="100%"  src="../../assets/img/ads.png" >
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