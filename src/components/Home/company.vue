<script setup>
import Footer from "./footer.vue";
import { ref, onBeforeMount, computed } from "vue";
import { Country}  from 'country-state-city';
import Alert from "../composants/alert.vue";
import { useAlertStore } from "../../stores/alert";
import { useRouter } from "vue-router";
import { useCompanyStore } from "../../stores/company";
import { useReviewStore } from "../../stores/review";
import Loader from "../composants/loader.vue";
const companyStore = useCompanyStore();
const alertStore = useAlertStore();
const router = useRouter();

const wait = ref(false);
const hadleStar = (star) => {
  if(selectedStar.value == star)
    selectedStar.value = star-1;
  else
    selectedStar.value = star;
}
const  {name}  = router.currentRoute.value.params;
const company = computed(()=>companyStore.getCompany);
onBeforeMount(async () =>{
  if(companyStore.getCompany==null || companyStore.getCompany.name!=name.replace(/-/g, ' ')){
    await companyStore.fetchCompanyByName(name);
  }
  wait.value = true;
});
// review script 
const selectedStar = ref(0);

const reviewForm = ref({
  company_id: '',
  content: "",
  stars: '',
});
const handleReview = async () =>{
  if (reviewForm.value.content == ""){
    alertStore.setAlert('alert-danger','Please enter your review');
    return;
  }
  else if(reviewForm.value.content.length < 40){
    alertStore.setAlert('alert-danger','Please enter at least 40 characters');
    return;
  }
  reviewForm.value.stars = selectedStar.value;
  reviewForm.value.company_id = company.value.id;
  await useReviewStore().addReview(reviewForm.value,name);
  reviewForm.value.content = "";
  selectedStar.value = 0;
};

const selectedReview = (review)=>{
  //  replace all spaces with - and replace / with -

  const slug = review.id+'-'+review.reviewer.first_name.replace(/\s+/g, '-')+'-'+company.value.name.replace(/\s+/g, '-')+'-'+review.date.replace(/\//g, '-');
  router.push({name:'review',params:{name:slug}});
}
</script>
<template>
  <Loader :loaderName="'wait_company'"></Loader>
 <main id="main"  v-if="wait">
<section class="breadcrumbs">
  <div class="container">
    <h2>Company</h2>

  </div>
</section>
<section id="blog" class="blog">
  <div class="container" data-aos="fade-up">

    <div class="row">

      <div class="col-lg-8 entries">

        <article class="entry entry-single">

          <div class="entry-img d-flex">
            <img :src="company.logo" alt="" class="img-fluid col-4" style="height: fit-content;">
            <div class="col-6 p-3">
              <h2 class="entry-title">
                <a href="" style="text-decoration: none;">{{company.name}}</a>
              </h2>
              <p class="text-muted fs-4">Industry : {{ company.industry.name }}</p>
            </div>

          </div>

          

          <div class="entry-meta">
            <ul class=" d-flex ">
              <li class="ms-3"><i class="bi bi-person fs-5 "></i> <a href="">Employees: {{ company.employees }}</a></li>
              <li class=""><i class="bi bi-chat-dots fs-5"></i> <a href="">Reviews: {{ company.reviews_count }}</a></li>
              <li class=""><i class="bi bi-emoji-smile fs-5"></i> <a href="">Rate:  <i class="bi bi-star-fill " :style=" {color: company.stars>0 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill " :style=" {color: company.stars>1 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill " :style=" {color: company.stars>2 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill " :style=" {color: company.stars>3 ? '#fbc634' : ''}" ></i>
                <i class="bi bi-star-fill " :style=" {color: company.stars>4 ? '#fbc634' : ''}" ></i></a></li>
              <li class=""><i class="bi bi-houses fs-5 "></i> <a href="">Location: {{ Country.getCountryByCode(company.country_code).name+" "+company.city }}</a></li>
              <li class=""><i class="bi bi-geo-alt fs-5"></i><a href="">Address: {{ company.address }}</a></li>
              <li class=""><i class="bi bi-currency-dollar fs-5"></i> <a href="">Revenue: {{ company.revenue }}</a></li>
              <li class=""><i class="bi bi-globe fs-5"></i> <a :href="company.website">Website: {{ company.website }}</a></li>
            </ul>
          </div>
            <hr>
   
          <div class="entry-content">
            <p>
              {{ company.description }}
            </p>
            <blockquote>
              <p>
               Mission: {{ company.mission }}
              </p>
            </blockquote>
          </div>
                   <!-- review model -->
                                              <hr>
                              <div class="modal-body">
                                      <Alert/>
                                            <form @submit.prevent="handleReview">
                                              <Loader :loaderName="'add_review'"></Loader>
                                      <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Submit Your Review</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="reviewForm.content"></textarea>
                                      </div>

                                      <div>
                                      <label class="me-5">Rate this company:</label>
                                      <label for="star5"><i class="bi bi-star-fill fs-4"  @click="hadleStar(1)" :style=" {color: selectedStar>0 ? '#fbc634' : ''}"></i></label>
                                      <label for="star4"><i class="bi bi-star-fill fs-4"  @click="hadleStar(2)" :style=" {color: selectedStar>1 ? '#fbc634' : ''}"></i></label>
                                      <label for="star3"><i class="bi bi-star-fill fs-4"  @click="hadleStar(3)" :style=" {color: selectedStar>2 ? '#fbc634' : ''}"></i></label>
                                      <label for="star2"><i class="bi bi-star-fill fs-4"  @click="hadleStar(4)" :style=" {color: selectedStar>3 ? '#fbc634' : ''}"></i></label>
                                      <label for="star1"><i class="bi bi-star-fill fs-4"  @click="hadleStar(5)" :style=" {color: selectedStar>4 ? '#fbc634' : ''}"></i></label>
                                    </div>
                                    <div class="modal-footer">
                                      

                                      <div class="d-flex justify-content-center">
                                            <button type="submit" class="btn btn-primary" style="background-color:  #4154f1;" >Add Review</button>
                                      </div>
                                    </div>
                                    </form>
                                      
                                    </div>
             <!-- review model -->
        </article>
        <div class="" >
          <h4 class="">{{ company.reviews.length }} Reviews</h4>
        </div>
        <article class="entry mt-3" v-for="review in company.reviews" @click="selectedReview(review)" style="cursor: pointer;">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img :src="review.reviewer.photo!=null?review.reviewer.photo:'https://www.citypng.com/public/uploads/small/11639786938ezifytzfr8tbs8nzjsjdc1z0aqtrhyhq1zkujoyerqksff9tsl1f7vg9k1ujbojemibzdoayolcjrzbhp4euwhqjtyfa00tk9okr.png'" style="width: 60px;height:60px;border-radius: 50%;" alt=""><br>
              </div>
              <div style="padding-left: 7px;">
                 <h5 class="ms-4"><a  style="text-decoration: none;color: #4154f1;">{{ review.reviewer.first_name+" "+review.reviewer.last_name}} -> {{ company.name }}</a> </h5>
                <div   class="card p-4 mt-4 " style="min-width: 100%;">
                  <p>
                  {{ review.content }}
                </p>

                </div>
               
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