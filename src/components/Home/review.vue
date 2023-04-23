<script setup>
import Footer from "./footer.vue";
import { ref, onBeforeMount, computed } from "vue";
import Alert from "../composants/alert.vue";
import { useAlertStore } from "../../stores/alert";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
import { useReviewStore } from "../../stores/review";
import Loader from "../composants/loader.vue";
import Swal from 'sweetalert2';
const reviewStore = useReviewStore();
const alertStore = useAlertStore();
const router = useRouter();

const wait = ref(false);
// get the id of the review from the name in the url 
const slug = router.currentRoute.value.params.name;
const review_id = slug.split("-")[0];

const review = computed(()=>reviewStore.getReview);
onBeforeMount(async () =>{
  if(reviewStore.getReview==null || reviewStore.getReview.id!=review_id){
    await reviewStore.fetchReviewById(review_id);
  }
  wait.value = true;
});
// comment script 


const CommentForm = ref({
  review_id: '',
  content: '',
});
const handleComment = async () =>{
  if (CommentForm.value.content == ""){
    alertStore.setAlert('alert-danger','Please enter at least Some words');
    return;
  }
  CommentForm.value.review_id = review.value.id;
  await useReviewStore().addComment(CommentForm.value);
  CommentForm.value.content = "";
};

const delete_review = ref(false)
const handle_delete_review = (id)=>{
  Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then(async(result) => {
  if (result.isConfirmed) {
    delete_review.value = true
    await reviewStore.deleteReview(review_id);
    delete_review.value = false
    router.push({name:'reviews'});
  }
})   
}
const delete_comment = ref(false);
const handle_delete_comment =(id)=>{
  Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then(async(result) => {
  if (result.isConfirmed) {
    delete_comment.value = id;
   await reviewStore.deleteComment(id,review_id);
   delete_comment.value = false;
  }
})
}
</script>
<template>
  <Loader :loaderName="'wait_review'"></Loader>
 <main id="main" v-if="wait">

<section class="breadcrumbs mt-0" style="height: 60px;">
  <div class="container">
    <h2>Review</h2>

  </div>
</section>

<section id="blog" class="blog">
  <div class="container" data-aos="fade-up">

    <div class="row">

      <div class="col-lg-8 entries">

       

          <div class="entry-img">
            <article class="entry">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img :src="review.reviewer.photo!=null?review.reviewer.photo:'https://www.citypng.com/public/uploads/small/11639786938ezifytzfr8tbs8nzjsjdc1z0aqtrhyhq1zkujoyerqksff9tsl1f7vg9k1ujbojemibzdoayolcjrzbhp4euwhqjtyfa00tk9okr.png'" style="width: 100px;border-radius: 50%;height: 100px;" alt=""><br>
                <img :src="review.company_logo" style="width: 40px;height:40px;border-radius: 50%;border: 1px black solid;margin-left: 56px;margin-top: -45px;" alt="">
              </div>
             
              <div style="padding-left: 7px;">
                <h5 class="ms-4 "><a href="" style="text-decoration: none;">{{ review.reviewer.first_name+" "+review.reviewer.last_name}} -> {{ review.company_name }}</a> </h5>
                <time datetime="2020-01-01">01 Jan, 2020</time>
                <p>
                  {{ review.content }}
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
          <div v-if="useAuthStore().getUser">
            
            <div style="cursor: pointer;" v-if="review.reviewer.id==useAuthStore().getUser.id">
              <div class="spinner-border text-primary spinner " v-if="delete_review" style="font-size: small;"></div>
              <i class="bi bi-trash3 text-danger ms-3" @click="handle_delete_review" v-else></i>
            </div>
          </div>
         


                   
  </article>
        </div>
        <div class="blog-comments">

          <h4 class="comments-count"> {{ review.comments.length }} Comments</h4>
          <div class="comment" v-for=" comment in review.comments"  tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover">
           
            <div class="d-flex">
              <div class="comment-img"><img :src="comment.user.photo!=null?comment.user.photo:'https://www.citypng.com/public/uploads/small/11639786938ezifytzfr8tbs8nzjsjdc1z0aqtrhyhq1zkujoyerqksff9tsl1f7vg9k1ujbojemibzdoayolcjrzbhp4euwhqjtyfa00tk9okr.png'" alt="" style="border-radius: 30%;width:45px;height: 45px;" ></div>
              <div>
                <h5><a >{{ comment.user.first_name + comment.user.last_name }}</a></h5>
                <time datetime="2020-01-01">{{ comment.date  }} : {{ comment.time  }}</time>
                <p>
                  {{ comment.content }}
                </p>
                <div v-if="useAuthStore().getUser">
               
                <div style="cursor: pointer;" v-if="comment.user.id==useAuthStore().getUser.id">
                   <div class="spinner-border text-primary spinner " v-if="delete_comment==comment.id" style="font-size: small;"></div>
                    <i class="bi bi-trash3 text-danger ms-3" @click="handle_delete_comment(comment.id)"  v-else></i>
                 </div>
                </div>
               
              </div>
            </div>
          </div>


          

        

          <div class="reply-form card">
            <h4>Leave a Comment</h4>
           
                <form @submit.prevent="handleComment">
                  <Alert/>
                    <Loader :loaderName="'add_comment'"></Loader>
              <div class="row">
                <div class="col form-group">
                  <textarea name="comment" class="form-control" placeholder="Your Comment" v-model="CommentForm.content"></textarea>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Post Comment</button>

            </form>

          </div>

        </div>

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