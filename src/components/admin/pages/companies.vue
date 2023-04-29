<script setup>
import { Country}  from 'country-state-city';
import { ref, onBeforeMount,computed } from "vue";
import { useCompanyStore } from "../../../stores/company";
import Loader from "../../composants/loader.vue";
import Alert from "../../composants/alert.vue";
import {useRouter} from 'vue-router'
import Swal from 'sweetalert2';
const router = useRouter();
const typeSelected = ref('');
const companies = computed(()=>{
  if(typeSelected.value!=''){
    return companyStore.getAllCompanies.filter(company=>company.deleted==typeSelected.value);
  }else{
    return companyStore.getAllCompanies
  }
});

const companyStore = useCompanyStore();
onBeforeMount(async() => {
  if(!companyStore.getAllCompanies.length!=0){
   await companyStore.fetchAllCompanies();
  }
});
const current_page = ref(1);
const handle_page = (page)=>{
  if(page < 1 || page > Math.ceil(companies.value.length/7)) return;
  current_page.value = page;
}
const items = computed(()=>{
  return companies.value.slice((current_page.value-1)*7,current_page.value*7);
});

const selectedCompanyLink = (company)=>{
 const slug = company.name.replace(/\s+/g, '-');
  router.push({name:'company',params:{name:slug}});
}
const activateCompany = (id)=>{
  Swal.fire({
  title: 'Are you sure?',
  text: "You want to restore this company!",
  icon: 'success',
  showCancelButton: true,
  confirmButtonColor: 'green',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.isConfirmed) {
    companyStore.activateCompany(id);
  }
}) 
}
const deleteCompany = (id)=>{
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
    companyStore.fullDeleteCompany(id);
  }
})
}
</script>

<template>
<div class="card mt-2" style="min-height: 80vh;">
<div class="card-body  px-md-5">
<div class=" table-responsive mt-2">
    <Alert></Alert>
    <Loader :loaderName="'wait_company'"></Loader>
    <Loader :loaderName="'activate_company'"></Loader>
    <h5 class="text-primary">Search</h5>
        <div class="d-flex" role="search">
       
        <select class="form-select " aria-label="Default select example" v-model="typeSelected" style="width:40%">
          <option selected value="">--- All ---</option>
          <option value="0">Active companies</option>
          <option value="1">archived companies</option>
        </select>
      </div>
      <br>
    <h3 v-if="items.length==0" class="text-center">No companies Available</h3>
    

    <table v-else class="table align-middle mb-0 bg-white" style="border: 1px solid blue;" >
  <thead class="bg-light">
    <tr>
      <th>company</th>
      <th>Manager</th>
      <th>Location</th>
      <th>Employees</th>
      <th>Reviews</th>
      <th>Stars</th>
      
      <th>Revenu USD</th>
      <th>Link</th>
      <th>action</th>
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
        {{ company.manager.first_name }} {{ company.manager.last_name }}
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
        <button type="button" v-if="!company.deleted"  class="btn  btn-outline-primary btn-sm btn-rounded" @click="selectedCompanyLink(company)">
          Show
        </button>
        <button type="button" v-else class="btn  btn-outline-success btn-sm btn-rounded" @click="activateCompany(company.id)">
          Activate
        </button>
      </td>
      <td>
        <button type="button" class="btn  btn-outline-danger btn-sm btn-rounded" @click="deleteCompany(company.id)">
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