<script setup>
import { Country}  from 'country-state-city';
import { ref, onBeforeMount } from "vue";
import { useCompanyStore } from "../../../../stores/company";
import Loader from "../../../composants/loader.vue";
const selectedCompany = ref(null);
const companyStore = useCompanyStore();
onBeforeMount(() => {
  if(!companyStore.companies.length!=0){
    companyStore.fetchCompanies();
  }
});
</script>

<template>
<div class="card mt-2" style="min-height: 80vh;">
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
      <th>Stars</th>
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
        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn  btn-outline-primary btn-sm btn-rounded" @click="selectedCompany=company">
          Show
        </button>
      </td>
    </tr>
   
  </tbody>
</table>
           </div>
</div>
</div>

<div class="modal fade" v-if="selectedCompany" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Company information</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body blog entries">
        <article class="entry">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img :src="selectedCompany.logo" style="max-width: 100px;height: 90px;" alt=""></div>
              <div style="padding-left: 7px;">
                <h4 style="color: #4154f1;">{{ selectedCompany.name }} </h4>
                <p class="text-muted mb-0">{{ selectedCompany.industry.name }}</p>

                <p>
                  <b class="text-bold">Description:</b> {{ selectedCompany.description }}
                </p>
                <p>
                  <b class="text-bold">Mission:</b> {{ selectedCompany.mission }}
                </p>
              </div>
            </div>
          </div>
          <div class="entry-meta">
            <ul>
              <li class=""><i class="bi bi-wikipedia"></i> <a :href="selectedCompany.website">Website: {{ selectedCompany.website }}</a></li>
              <li class=""><i class="bi bi-calendar-date"></i> <a href="">Founded: {{ selectedCompany.founded }}</a></li>
              <li class=""><i class="bi bi-person"></i> <a href="">Employees: {{ selectedCompany.employees }}</a></li>
              <li class=""><i class="bi bi-chat-dots"></i> <a href="">Reviews: {{ selectedCompany.reviews_count }}</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-emoji-smile"></i> <a href="">Rate:  <i class="bi bi-star-fill " :style=" {color: selectedCompany.stars>0 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: selectedCompany.stars>1 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: selectedCompany.stars>2 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: selectedCompany.stars>3 ? '#fbc634' : ''}" style="font-size:small;"></i>
            <i class="bi bi-star-fill " :style=" {color: selectedCompany.stars>4 ? '#fbc634' : ''}" style="font-size:small;"></i></a></li>
              <li class=""><i class="bi bi-houses"></i> <a href="">Location: {{ Country.getCountryByCode(selectedCompany.country_code).name+" "+selectedCompany.city }}</a></li>
              <li class=""><i class="bi bi-currency-dollar"></i> <a href="">Revenue: {{ selectedCompany.revenue }}</a></li>

            </ul>
          </div>
        </article>
       
      </div>
    </div>
  </div>
</div>
</template>
<style>
</style>