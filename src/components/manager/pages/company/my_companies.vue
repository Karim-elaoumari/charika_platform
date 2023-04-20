<script setup>
import { Country, City}  from 'country-state-city';
import { ref, onBeforeMount, computed } from "vue";
import { useIndustyStore} from "../../../../stores/industry";
import { useAuthStore } from "../../../../stores/auth";
import { useAlertStore } from '../../../../stores/alert';
import { useCompanyStore } from "../../../../stores/company";
import Swal from 'sweetalert2';
import Alert from "../../../composants/alert.vue"
import Loader from "../../../composants/loader.vue";
const alertStore = useAlertStore();
const IndustryStore = useIndustyStore();
const companyStore = useCompanyStore();
onBeforeMount(async ()=>{
    if(!companyStore.getMyCompanies.length){
        await companyStore.fetchMyCompanies();
    }
    if(!IndustryStore.industries.length){
        await IndustryStore.fetchIndustries();
    }
});
const current_page = ref(1);
const handle_page = (page)=>{
  if(page < 1 || page > Math.ceil(companyStore.getMyCompanies.length/7)) return;
  current_page.value = page;
}
const items = computed(()=>{
  return companyStore.getMyCompanies.slice((current_page.value-1)*7,current_page.value*7);
});
const form_company  = ref({
    'id' : '',
    'name':'',
    'logo_url':'',
    'website': '',
    'country' : '',
    'city' : '',
    'address' : '',
    'industry' : '',
    'foundation_year' : '',
    'employees' : '',
    'revenue' : '',
    'description' : '',
    'mission' : '',
});
const assignCompany= (company)=>{
    form_company.value.id = company.id
    form_company.value.name = company.name;
    form_company.value.logo_url = company.logo;
    form_company.value.website = company.website;
    form_company.value.country = company.country_code;
    form_company.value.city = company.city;
    form_company.value.address = company.address;
    form_company.value.industry = company.industry.id;
    form_company.value.foundation_year = company.founded;
    form_company.value.employees = company.employees;
    form_company.value.revenue = company.revenue;
    form_company.value.description = company.description;
    form_company.value.mission = company.mission;
}
const handle_company = ()=>{
    if(form_company.value.name == '' || form_company.value.logo_url == ''  || form_company.value.country == '' || form_company.value.city == ''|| form_company.value.address == '' || form_company.value.industry == '' ||  form_company.value.employees == ''  || form_company.value.description == '' || form_company.value.mission == ''){
        alertStore.setAlert('alert-danger','Please fill all the fields');
        return;
    }
    else if(!form_company.value.logo_url.match(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/)){
        alertStore.setAlert('alert-danger','Please enter a valid logo url');
        return;
    }
    else if(!form_company.value.website.match(/^(http(s?):)([/|.|\w|\s|-])*\.(?:com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/)){
        alertStore.setAlert('alert-danger','Please enter a valid website url');
        return;
    }
    else if(form_company.value.foundation_year < 1900 || form_company.value.foundation_year > 2021){
        alertStore.setAlert('alert-danger','Please enter a valid foundation year');
        return;
    }
    else if(form_company.value.employees < 1){
        alertStore.setAlert('alert-danger','Please enter a valid number of employees');
        return;
    }
    else if(form_company.value.revenue <1){
        alertStore.setAlert('alert-danger','Please enter a valid revenue');
        return;
    }
    else if(form_company.value.description.length < 100){
        alertStore.setAlert('alert-danger','Description must be at least 50 characters');
        return;
    }
    else if(form_company.value.mission.length < 50){
        alertStore.setAlert('alert-danger','Mission must be at least 20 characters');
        return;
    }
    else{
        if(form_company.revenue==''){
            form_company.revenue=100;
        }
        console.log(form_company.value.id);
        useCompanyStore().updateCompany(form_company.value.id,form_company.value.name,form_company.value.logo_url,form_company.value.website,form_company.value.country,form_company.value.city,form_company.value.address,form_company.value.industry,form_company.value.foundation_year,form_company.value.employees,form_company.value.revenue,form_company.value.description,form_company.value.mission);
    }
}


const handle_delete = (id)=>{
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
    useCompanyStore().deleteCompany(id);
  }
})
    
}
</script>

<template>
<div class="card mt-2" style="min-height: 80vh;">
<div class="card-body  px-md-5">
<div class=" table-responsive mt-2">
    <Loader :loaderName="'wait_company'"></Loader>
    <Loader :loaderName="'wait_industrie'"></Loader>
    <Alert></Alert>
    <h3 v-if="items.length==0" class="text-center">No companies Available</h3>
    <table  v-else class="table align-middle mb-0 bg-white" style="border: 1px solid blue;">
  <thead class="bg-light">
    <tr>
      <th>company</th>
      <th>Location</th>
      <th>Employees</th>
      <th>Reviews</th>
      <th>Stars</th>
      <th>Revenu USD</th>
      <th>Action</th>
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
            <i class="bi bi-star-fill " :style=" {color: company.stars>0 ? '#fbc634' : ''}" style="font-size:small;" ></i>
            <i class="bi bi-star-fill " :style=" {color: company.stars>1 ? '#fbc634' : ''}" style="font-size:small;" ></i>
            <i class="bi bi-star-fill " :style=" {color: company.stars>2 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: company.stars>3 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: company.stars>4 ? '#fbc634' : ''}" style="font-size:small;"></i>
      </td>
      <td>{{ company.revenue }}</td>
      <td>
        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn  btn-outline-primary btn-sm btn-rounded" @click="assignCompany(company)">
          Edit
        </button>
        <button type="button"  class="btn  btn-outline-danger btn-sm btn-rounded ms-2" @click="handle_delete(company.id)">
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
<div class="modal fade" v-if="form_company" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Company information</h1>
        <Alert></Alert>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body blog entries">
        <Loader :loaderName="'update_company'"></Loader>
        <form @submit.prevent="handle_company">
            <div class="row mb-2">
                <div class="col">
                <div class="form-outline">
                    <input type="text"  class="form-control"  v-model="form_company.name"/>
                    <label class="form-label" for="form6Example1">Name</label>
                </div>
                </div>
                <div class="col">
                <div class="form-outline">
                    <input type="text"  class="form-control"  v-model="form_company.logo_url"/>
                    <label class="form-label" for="form6Example2">Logo Url</label>
                </div>
                </div>
            </div>
  
  
            <div class="form-outline mb-2">
                <input type="text" id="form6Example3" class="form-control" v-model="form_company.website"/>
                <label class="form-label" for="form6Example3">Website</label>
            </div>
            <div class="row mb-2">
                <div class="col">
                    <div class="form-outline mb-2">
                        <select class="form-control"   v-model="form_company.country">
                            <option value="">--Select--</option>
                            <option  v-for="country in Country.getAllCountries()" :value="country.isoCode" :selected="country.isoCode==form_company.country">{{ country.name }}</option>
                        </select>
                        <label for="job">Country</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline mb-2">
                        <select class="form-control"  v-model="form_company.city">
                            <option value="">--Select--</option>
                            <option  :value="city.name" v-for="city in City.getCitiesOfCountry(form_company.country)" :selected="city.name==form_company.city">{{ city.name }}</option>
                        </select>
                        <label for="job">City</label>
                </div>

        
            </div>
        </div>



        <div class="form-outline mb-2">
                    <input type="text"  class="form-control" v-model="form_company.address" />
                    <label class="form-label" for="form6Example5">Address</label>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-outline mb-2">
                    <select  class="form-select" v-model="form_company.industry">
                                    <option value="">--Select--</option>
                                    <option v-for="industry in IndustryStore.getIndustries" :value="industry.id" >{{ industry.name }}</option>
                    </select>
                    <label>Industry</label>
                </div>
            </div>
            <div class="col">
            <div class="form-outline">
                <div class="form-outline mb-2">
                    <input type="number" min="1900" max="2099" step="1" placeholder="YYYY"  class="form-control" v-model="form_company.foundation_year"/>
                    <label class="form-label" >Foundation Year</label>
                </div>
            </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-outline mb-2">
                    <input type="number"  class="form-control" v-model="form_company.employees"/>
                    <label class="form-label" for="form6Example3">Employees</label>
                </div>
            </div>
            <div class="col">
            <div class="form-outline">
                <div class="form-outline mb-2">
                    <input type="number"  class="form-control"  step="0.1" v-model="form_company.revenue"/>
                    <label class="form-label" for="form6Example3">Revenue (USD)</label>
                </div>
            </div>
            </div>
        </div>
        <div class="form-outline mb-2">
            <textarea class="form-control" id="form6Example7" rows="4" v-model="form_company.description"></textarea>
            <label class="form-label" for="form6Example7">Description</label>
        </div>
        <div class="form-outline mb-2">
            <textarea class="form-control" id="form6Example7" rows="4" v-model="form_company.mission"></textarea>
            <label class="form-label" for="form6Example7">Mission</label>
        </div>
        
        <button type="submit" class="btn btn-primary btn-block mb-4">update</button>
        </form>
       
      </div>
    </div>
  </div>
</div>
</template>
<style>
</style>