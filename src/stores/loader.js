import {defineStore} from 'pinia'
import axios from  '../lib/axios'
export const useLoaderStore = defineStore("loader", {
    state:() => ({
        Loaders : [],
    }),
    getters: {
        getLoader(){
            return (name) => this.Loaders.find((loader) => loader.name === name);
        } 
    },
    actions: {
        showLoader(loader){
          this.Loaders.push(loader);
        },
        hideLoader(name){
            const loader = this.Loaders.find((loader) => loader.name == name);
            this.Loaders.splice(this.Loaders.indexOf(loader), 1);
        },
        checkIsLoading(name){
            const loader = this.Loaders.find((loader) => loader.name == name);
            if(loader){
                return true;
            }
            return false;
        }
    }
})