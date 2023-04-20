import {defineStore} from 'pinia'
import axios from  '../lib/axios'
import Cookies from 'js-cookie'
export const useAlertStore = defineStore("alert", {
    state:() => ({
        message : null,
        type : "success",
        visibility : "hide",
    }),
    getters: {
        getMessage : (state) => state.message,
        getVisibility: (state) => state.visibility,
        getType: (state) => state.type,
    },
    actions: {
        // removeAlert(){
        //     this.visibility = "hide";
        // },
        setAlert(type,message){
            this.type = type;
            this.message = message;
            this.visibility = "show";
        },
    }
})