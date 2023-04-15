import {defineStore} from 'pinia'
import axios from  '../lib/axios'
import { useLoaderStore } from "./loader"
export const useIndustyStore = defineStore("industry",{
    state:() => ({
        industries:[],
    }),
    getters: {
        getIndustries: (state) => { return state.industries}
    },
    actions: {
        async fetchIndustries(){
          useLoaderStore().showLoader({name:"wait_industrie",visibility:false});
            try {
                await axios.get('/industries').then(response =>{
                  this.industries = response.data.data[0];
                  useLoaderStore().hideLoader("wait_industrie");
                });
                
              } catch (error) {
                console.error(error);
              }
        },
    }
})