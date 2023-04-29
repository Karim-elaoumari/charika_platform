<script setup>
import { Country}  from 'country-state-city';
import { ref, onBeforeMount,computed } from "vue";
import { useCompanyStore } from "../../../../stores/company";
import Loader from "../../../composants/loader.vue";
import {useRouter} from 'vue-router'
const router = useRouter();
const selectedCompany = ref(null);
const companyStore = useCompanyStore();
onBeforeMount(() => {
  if(companyStore.getCompanies.length==0){
    companyStore.fetchCompanies();
  }
});
const current_page = ref(1);
const handle_page = (page)=>{
  if(page < 1 || page > Math.ceil(companyStore.getCompanies.length/7)) return;
  current_page.value = page;
}
const items = computed(()=>{
  return companyStore.getCompanies.slice((current_page.value-1)*7,current_page.value*7);
});

const selectedCompanyLink = (company)=>{
  
 const slug = company.name.replace(/\s+/g, '-');
  router.push({name:'company',params:{name:slug}});
}
</script>

<template>
<div class="card mt-2" style="min-height: 80vh;">
<div class="card-body  px-md-5">
<div class=" table-responsive mt-2">
    <Loader :loaderName="'wait_company'"></Loader>
    <h3 v-if="items.length==0" class="text-center">No companies Available</h3>
    <table v-else class="table align-middle mb-0 bg-white" style="border: 1px solid blue;" >
  <thead class="bg-light">
    <tr>
      <th>company</th>
      <th>Location</th>
      <th>Employees</th>
      <th>Reviews</th>
      <th>Stars</th>
      <th>Revenu USD</th>
      <th>Link</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="company in items">
      
      <td>
        <div class="d-flex align-items-center">
          <img
              :src="company.logo"
              alt=""
              style="width: 45px; height: 45px;border-radius: 10%;"
              
              />
          <div class="ms-3">
            <p class="fw-bold mb-1">{{ company.name }}</p>
            <p class="text-muted mb-0">{{ company.industry.name }}</p>
          </div>
        </div>
      </td>
      <td>
        <p class="fw-normal mb-1">{{ Country.getCountryByCode(company.country_code).name }}</p>
        <p class="text-muted mb-0">{{ company.city }}</p>
      </td>
      <td>{{ company.employees }}</td>
      <td>{{ company.reviews_count }}</td>
      <td style="min-width: 100px;">
            <i class="bi bi-star-fill " :style=" {color: company.stars>0 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: company.stars>1 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: company.stars>2 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: company.stars>3 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: company.stars>4 ? '#fbc634' : ''}" style="font-size:small;"></i>
      </td>
      <td>{{ company.revenue }}</td>
        <td>
        <button type="button"  class="btn  btn-outline-primary btn-sm btn-rounded" @click="selectedCompanyLink(company)">
          Show
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