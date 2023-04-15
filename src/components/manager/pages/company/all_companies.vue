<script setup>
import { Country, City}  from 'country-state-city';
import { ref, onBeforeMount, computed } from "vue";
import { useCompanyStore } from "../../../../stores/company";
import Loader from "../../../composants/loader.vue";
const companyStore = useCompanyStore();
onBeforeMount(() => {
  if(!companyStore.companies.length!=0){
    companyStore.fetchCompanies();
  }
});
</script>

<template>
<div class="card mt-2">
<div class="card-body  px-md-5">
<div class=" table-responsive mt-2">
    <Loader :loaderName="'wait_company'"></Loader>
    <table class="table align-middle mb-0 bg-white" style="border: 1px solid blue;">
  <thead class="bg-light">
    <tr>
      <th>company</th>
      <th>Location</th>
      <th>Employees</th>
      <th>Reviews</th>
      <th>Revenu USD</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="company in companyStore.companies">
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
      <td>{{ company.employees }}</td>
      <td>{{ company.revenue }}</td>
      <td>
        <button type="button" class="btn btn-link btn-sm btn-rounded">
          Edit
        </button>
      </td>
    </tr>
   
  </tbody>
</table>
           </div>
</div>
</div>
</template>
<style>
</style>