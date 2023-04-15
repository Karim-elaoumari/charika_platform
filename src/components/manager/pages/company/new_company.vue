<script setup>
import { Country, City}  from 'country-state-city';
import { onBeforeMount,ref,computed } from "vue";
import { useIndustyStore} from "../../../../stores/industry";
import { useAlertStore } from '../../../../stores/alert';
import { useCompanyStore } from '../../../../stores/company';
import Alert from "../../../composants/alert.vue";
import Loader from "../../../composants/loader.vue";

const IndustryStore = useIndustyStore();
const alertStore = useAlertStore();


const form_company  = ref({
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
    else if(form_company.value.revenue < 1){
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
        console.log(form_company.city);
        useCompanyStore().addCompany(form_company.value.name,form_company.value.logo_url,form_company.value.website,form_company.value.country,form_company.value.city,form_company.value.address,form_company.value.industry,form_company.value.foundation_year,form_company.value.employees,form_company.value.revenue,form_company.value.description,form_company.value.mission);
    }
}
onBeforeMount(async()=>{
    if(IndustryStore.getIndustries.length == 0){
        await IndustryStore.fetchIndustries();
    }
});
</script>

<template>
    
<div class="card mt-2">
<div class="card-body  px-md-5">
    
  <h3 class="text-center">New Company</h3>
  <form @submit.prevent="handle_company">
    <Alert></Alert>
        <Loader :loaderName="'new_company'"></Loader>
        <Loader :loaderName="'wait_industrie'"></Loader>
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
                <option  v-for="country in Country.getAllCountries()" :value="country.isoCode">{{ country.name }}</option>
            </select>
            <label for="job">Country</label> 
        </div>
    </div>
    <div class="col">
        <div class="form-outline mb-2">
            <select class="form-control"  v-model="form_company.city">
                <option value="">--Select--</option>
                <option  :value="city.name" v-for="city in City.getCitiesOfCountry(form_company.country)">{{ city.name }}</option>
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
  
  <button type="submit" class="btn btn-primary btn-block mb-4">Create New Company</button>
</form>
</div>
</div>
</template>
<style>
</style>