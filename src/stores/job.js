import {defineStore} from 'pinia'
import axios from  '../lib/axios'
export const useJobStore = defineStore("jobs", {
    state:() => ({
        jobs: [],
    }),
    getters: {
        getJobs: (state) => {
            return state.jobs;
        }
    },
    actions: {
        async fetchJobs(){
            try {
                await axios.get('/jobs').then(response => {
                  this.jobs = response.data.data[0];
                });
              } catch (error) {
                console.error(error);
              }
        },
    }
})