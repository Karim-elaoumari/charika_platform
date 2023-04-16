import {defineStore} from 'pinia'
import axios from  '../lib/axios'
import Cookies from 'js-cookie'
import { useLoaderStore } from "./loader"
import { useAlertStore } from './alert'
import {useRouter} from 'vue-router'
export const useAuthStore = defineStore("auth", {
    state:() => ({
      user: null,
      router : useRouter()
    }),
    getters: {
      getUser: (state) => state.user,
    },
    actions: {
        async login(email, password){
          useLoaderStore().showLoader({name:"login",visibility:true});
            await axios.post('/login', {email, password})
            .then(response => {
               Cookies.set('token', response.data.authorisation.token);
                this.user = response.data.user;
                useLoaderStore().hideLoader('login');
                this.router.push({name:'home'});
            }).catch(error => {
                useLoaderStore().hideLoader('login');
                if(error.response.status==401){
                     useAlertStore().setAlert("alert-danger","Email or password is incorrect");
                }
                else if(error.response.status==403){
                  useAlertStore().setAlert("alert-info",error.response.data.message+ `<a href='/verify-email' class="text-light"> Past Your Code Here</a>`);
                }
                else{
                    useAlertStore().setAlert("alert-danger","Something went wrong");
                }
            },);
        },
        async register(first_name,last_name,email, password, confirm_password,speciality,job_id){
          useLoaderStore().showLoader({name:"register",visibility:true});
            await axios.post('/register', {first_name,last_name,email, password, confirm_password,speciality,job_id})
            .then(response => { 
              useLoaderStore().hideLoader('register');
              useAlertStore().setAlert("alert-info",response.data.message);
                this.router.push({name:'login'});
            }).catch(error => {
                useLoaderStore().hideLoader('register');
                if(error.response.status!=500){
                      useAlertStore().setAlert("alert-danger",error.response.data.message);
                }
                else{
                    useAlertStore().setAlert("alert-danger","Something went wrong");
                }
            });
        },
        async logout(){
            try {
                await axios.post('/logout',null,{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
                  this.user = null;
                  Cookies.remove('token');
                  useAlertStore().setAlert("alert-warning","Loged out successfully");
                  this.router.push({name:'home'});
                });
              } catch (error){
                console.error(error);
                return false;
              }
        },
      async checkAuth(action='null'){

        useLoaderStore().showLoader({name:"main",visibility:false,type:'all'});
          try{
            await axios.get('/auth_test',{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
              useLoaderStore().hideLoader('main');
              this.user = response.data.user;
            
            });
          } catch (error){
            if(error.response.status==401){
              this.user = null;
             
              if(action=='No_redirect'){
                useLoaderStore().hideLoader('main');
              }else{
              this.router.push({name:'login'});
              useLoaderStore().hideLoader('main');
              }
          }
        }
        
      },

      async verifyEmail(email, code){
        useLoaderStore().showLoader({name:"verify-Email",visibility:true});
         await axios.post('/verify-email', {email, code})
         .then(response => {
          useLoaderStore().hideLoader('verify-Email');
          useAlertStore().setAlert("alert-success",response.data.message);
          setTimeout(() =>{
            this.router.push({name:'login'});
          }, 400)
         }).catch(error =>{
             useLoaderStore().hideLoader('verify-Email');
             if(error.response.status==422){
                  useAlertStore().setAlert("alert-danger","Email or Code is incorrect");
             }
             else if(error.response.status==401){
              useAlertStore().setAlert("alert-danger",error.response.data.message);
             }
             else if(error.response.status==403){
               useAlertStore().setAlert("alert-danger",error.response.data.message);
             }
             else{
                 useAlertStore().setAlert("alert-danger","Something went wrong");
             }
         },);
     },
     async forgotPass(email){
      useLoaderStore().showLoader({name:"forgot",visibility:true});
       await axios.post('/forgot', {email})
       .then(response =>{
        useLoaderStore().hideLoader('forgot');
        useAlertStore().setAlert("alert-info",response.data.message+ `<a href='/reset' class="text-light"> Past Your Code Here</a>`);
       }).catch(error => {
           useLoaderStore().hideLoader('forgot');
           if(error.response.status==422){
                useAlertStore().setAlert("alert-danger",error.response.data.message);
           }
           else if(error.response.status==401){
            useAlertStore().setAlert("alert-danger",error.response.data.message);
           }
           else if(error.response.status==403){
             useAlertStore().setAlert("alert-danger",error.response.data.message);
           }
           else{
               useAlertStore().setAlert("alert-danger","Something went wrong");
           }
       },);
   },
   async resetPass(email,code,password,confirm_password){
    useLoaderStore().showLoader({name:"reset",visibility:true});
     await axios.put('/reset', {email,code,password,confirm_password})
     .then(response =>{
      useLoaderStore().hideLoader('reset');
      useAlertStore().setAlert("alert-success",response.data.message);
      setTimeout(this.router.push({name:'login'}), 15000);
     }).catch(error => {
         useLoaderStore().hideLoader('reset');
         if(error.response.status==422){
              useAlertStore().setAlert("alert-danger",error.response.data.message);
         }
         else if(error.response.status==401){
          useAlertStore().setAlert("alert-danger",error.response.data.message);
         }
         else if(error.response.status==403){
           useAlertStore().setAlert("alert-danger",error.response.data.message);
         }
         else{
             useAlertStore().setAlert("alert-danger","Something went wrong");
         }
     },);
    },
    // user info ------------------------------------------------------------------------------------------------
    async fetchUser(){
      useLoaderStore().showLoader({name:"main",visibility:false,type:'all'});
      try {
          await axios.get('/user',{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
            this.user = response.data.data;
           
            useLoaderStore().hideLoader('main');
          });
        } catch (error) {
          if(error.response.status==401){
            this.user = null;
           
            useLoaderStore().hideLoader('main');
          }
        }
},  
  async updateUser(info){
      useLoaderStore().showLoader({name:"updateInfoUser",visibility:true});
      try {
          await axios.post('/update_user_info',info,{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
            this.user = response.data.user;
            useLoaderStore().hideLoader('updateInfoUser');
            useAlertStore().setAlert("alert-success",response.data.message);
          }
          );
      }
      catch(error){
          useLoaderStore().hideLoader('updateInfoUser');
          if(error.response.status==422){
              useAlertStore().setAlert("alert-danger",error.response.data.message);
          }
          else if(error.response.status==401){
              useAlertStore().setAlert("alert-danger",error.response.data.message);
          }
          else if(error.response.status==403){
              useAlertStore().setAlert("alert-danger",error.response.data.message);
          }
          else{
              useAlertStore().setAlert("alert-danger","Something went wrong");
          }
          alert(error.response.data.message);
      }
  },
  async updatePassword(last_password,new_password,confirm_password){
      useLoaderStore().showLoader({name:"updatePassword",visibility:true});
      try {
          await axios.put('/update_password',{last_password,new_password,confirm_password},{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
            useLoaderStore().hideLoader('updatePassword');
            useAlertStore().setAlert("alert-success",response.data.message);
          }
        );
      }
      catch(error){
          useLoaderStore().hideLoader('updatePassword');
          if(error.response.status==422){
              useAlertStore().setAlert("alert-danger",error.response.data.message);
          }
          else if(error.response.status==401){
              useAlertStore().setAlert("alert-danger",error.response.data.message);
          }
          else if(error.response.status==403){
              useAlertStore().setAlert("alert-danger",error.response.data.message);
          }
          else{
              useAlertStore().setAlert("alert-danger","Something went wrong");
          }
      }
  },
  async updateEmail(email,password){
      useLoaderStore().showLoader({name:"updateEmail",visibility:true});
      try {
          await axios.put('/update_email',{email,password},{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
            useLoaderStore().hideLoader('updateEmail');
            useAlertStore().setAlert("alert-info",response.data.message);
          }
          );
      }
      catch(error){
          useLoaderStore().hideLoader('updateEmail');
          if(error.response.status==422){
              useAlertStore().setAlert("alert-danger",error.response.data.message);
          }
          else if(error.response.status==401){
              useAlertStore().setAlert("alert-danger",error.response.data.message);
          }
          else if(error.response.status==403){
              useAlertStore().setAlert("alert-danger",error.response.data.message);
          }
          else{
              useAlertStore().setAlert("alert-danger","Something went wrong");
          }
      }
  }
    }
})