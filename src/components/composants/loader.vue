<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useLoaderStore } from "../../../src/stores/loader";
const {loaderName} = defineProps(['loaderName']);
const loaderStore = useLoaderStore();
const {getLoader} = storeToRefs(loaderStore)
</script>
<template>
  <div v-if="getLoader(loaderName)" class="overlay" :style="{ backgroundColor: getLoader(loaderName).visibility ? 'rgba(255, 255, 255, 0.5)' : 'white' }" :class="getLoader(loaderName).type == 'all' ? 'fixed' : 'absolute'">
    <div class="spinner-border text-primary spinner" role="status">
    </div>
  </div>
</template>


<style>

.overlay {
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
  z-index: 9999; 
  display: flex;
  align-items: center;
  justify-content: center;
}
.fixed{
  position: fixed;
}
.absolute{
  position: absolute;
}

.spinner {
  z-index: 10000; /* ensure the spinner appears on top of the overlay */
}
.spinner-border {
  width: 3rem;
  height: 3rem;
  margin: auto;
  color: #fff; /* sets the color of the spinner */
}

.spinner-border::after {
  border-color: #fff; /* sets the color of the border */
}
</style>