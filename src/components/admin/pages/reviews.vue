<script setup>
import { ref, onBeforeMount,computed } from "vue";
import { useReviewStore } from "../../../stores/review";
import Loader from "../../composants/loader.vue";
import {useRouter} from 'vue-router'
import Alert from "../../composants/alert.vue";
import Swal from 'sweetalert2';
const router = useRouter();
const reviewStore = useReviewStore();
const typeSelected = ref('');
const reviews = computed(()=>{
  if(typeSelected.value!=''){
    return reviewStore.getAllReviews.filter(review=>review.status==typeSelected.value);
  }else{
    return reviewStore.getAllReviews;
  }
});
onBeforeMount(() => {
  if(reviewStore.getAllReviews.length==0){
    reviewStore.fetchAllReviews();
  }
});
const current_page = ref(1);
const handle_page = (page)=>{
  if(page < 1 || page > Math.ceil(reviews.value.length/7)) return;
  current_page.value = page;
}
const items = computed(()=>{
  return reviews.value.slice((current_page.value-1)*7,current_page.value*7);
});

const selectedReview = (review)=>{

const slug = review.id+'-'+review.reviewer.first_name.replace(/\s+/g, '-')+'-'+review.company_name.replace(/\s+/g, '-')+'-'+review.date.replace(/\//g, '-');
router.push({name:'review',params:{name:slug}});
}


const activateReview = (id)=>{
  Swal.fire({
  title: 'Are you sure?',
  text: "You want to restore this Review!",
  icon: 'success',
  showCancelButton: true,
  confirmButtonColor: 'green',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.isConfirmed) {
    reviewStore.activateReview(id);
  }
})
}
const deleteReview = (id)=>{
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
    reviewStore.fullDeleteReview(id);
  }
})
}
    

</script>

<template>
<div class="card mt-2" style="min-height: 80vh;">
<div class="card-body  px-md-5">
<div class=" table-responsive mt-2">
    <Alert></Alert>
    <Loader :loaderName="'wait_review'"></Loader>
    <h5 class="text-primary">Search</h5>
        <div class="d-flex" role="search">
       
        <select class="form-select " aria-label="Default select example" v-model="typeSelected" style="width:40%">
          <option selected value="">--- All ---</option>
          <option value="1">Active reviews</option>
          <option value="0">archived reviews</option>
        </select>
      </div>
      <br>
    <h3 v-if="items.length==0" class="text-center">No reviews Available</h3>
    <table v-else class="table align-middle mb-0 bg-white" style="border: 1px solid blue;" >
  <thead class="bg-light">
    <tr>
      <th>reviewer</th>
      <th>company</th>
      <th>time</th>
      <th>review</th>
      <th>content</th>
      <th>commets</th>
      <th>Link</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="review in items">
      <td>
        <div class="d-flex align-items-center">
          <img :src="review.reviewer.photo!=null?review.reviewer.photo:'https://www.citypng.com/public/uploads/small/11639786938ezifytzfr8tbs8nzjsjdc1z0aqtrhyhq1zkujoyerqksff9tsl1f7vg9k1ujbojemibzdoayolcjrzbhp4euwhqjtyfa00tk9okr.png'" style="width: 60px;height:60px;border-radius: 50%;" alt="">
        </div>
      </td>
      <td>
        {{ review.company_name }}
      </td>
      <td>{{ review.date }} : {{ review.time }}</td>
      <td style="min-width: 100px;">
            <i class="bi bi-star-fill " :style=" {color: review.stars>0 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: review.stars>1 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: review.stars>2 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: review.stars>3 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: review.stars>4 ? '#fbc634' : ''}" style="font-size:small;"></i>
      </td>
      <td>{{ review.content.slice(0, 200) + '...' }}</td>
      <td>{{ review.comments.length }}</td>
      <td>
        <button type="button" v-if="review.status" class="btn  btn-outline-primary btn-sm btn-rounded" @click="selectedReview(review)">
          Show
        </button>
        <button type="button" v-else class="btn  btn-outline-success btn-sm btn-rounded" @click="activateReview(review.id)">
          Activate
        </button>
      </td>
      <td>
        <button type="button"  class="btn  btn-outline-danger btn-sm btn-rounded" @click="deleteReview(review.id)">
          Delete
        </button>
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

</template>
<style>
</style>