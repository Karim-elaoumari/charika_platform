import {defineStore} from 'pinia'
import axios from  '../lib/axios'
import Cookies from 'js-cookie'
import { useLoaderStore } from "./loader"
import { useAlertStore } from './alert'
import {useRouter} from 'vue-router'
export const useAuthStore = defineStore("auth", {
    state:() => ({
      user: null,
      role: null,
      users: [],
      router : useRouter()
    }),
    getters: {
      getUser: (state) => state.user,
      getRole: (state) => state.role,
      getUsers: (state) => state.users
    },
    actions: {
        async login(email, password){
          useLoaderStore().showLoader({name:"login",visibility:true});
            await axios.post('/login', {email, password})
            .then(response => {
               Cookies.set('token', response.data.authorisation.token);
                this.user = response.data.user;
                this.role = response.data.user.role;
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
                  this.role = null;
                  Cookies.remove('token');
                  useAlertStore().setAlert("alert-warning","Loged out successfully");
                  this.router.push({name:'home'});
                });
              } catch (error){
                console.error(error);
                return false;
              }
        },
       // verification permission  -----------------------------------------------------------------------
      async checkAuth(action){
        useLoaderStore().showLoader({name:"main",visibility:false,type:'all'});
        console.log(action)
          try{
            await axios.get('/auth_test',{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
                this.user = response.data.user;
                this.role = response.data.user.role;
              if(action=='manager' && this.user.role!='manager' ){
                this.router.push({name:'home'});
              }else if(action=='admin' && this.user.role!='admin'){
                this.router.push({name:'home'});
              }
              useLoaderStore().hideLoader('main');
            
            });
          } catch (error){
            if(error.code=="ERR_NETWORK"){
              this.router.push({name:'server-error'});
            }
            else if(error.response.status==401){
              this.user = null;
              if(action=='No_redirect'){
                useLoaderStore().hideLoader('main');
              }else{
              this.router.push({name:'login'});
              useLoaderStore().hideLoader('main');
              }
           }else{
            this.router.push({name:'server-error'});
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
  async updateUser(info){
      useLoaderStore().showLoader({name:"updateInfoUser",visibility:true});
      try {
          await axios.post('/update_user_info',info,{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
            this.user = response.data.user;
            this.role = response.data.user.role;
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
  },
  async fetchUsers(){
    useLoaderStore().showLoader({name:"wait_users",visibility:false});
     try{
        await axios.get('/users',{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
          this.users = response.data.data;
          useLoaderStore().hideLoader("wait_users");
        });
      } catch (error){
        console.error(error);
      }
},
  async switchUserToManager(manager_id){
    useLoaderStore().showLoader({name:"switch_role",visibility:false});
    try{
    
        await axios.put('switch_user_to_manager',{manager_id},{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
            useAlertStore().setAlert("alert-success","User Role changed to Manager successfully");
            this.users =[];
            this.fetchUsers();
            useLoaderStore().hideLoader("switch_role");
        });
    }catch(error){
        useLoaderStore().hideLoader("switch_role");
        if(error.response.status!=500){
            useAlertStore().setAlert("alert-danger",error.response.data.message);
        }
        else{
            useAlertStore().setAlert("alert-danger","Something went wrong");
        }
    }
   },
   async switchManagerToUser(manager_id,second_manager_id){
    useLoaderStore().showLoader({name:"switch_role",visibility:false});
    try{
      if(!second_manager_id){
        console.log("here");
        await axios.put('switch_manager_to_user_without_companies/',{manager_id},{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
          useAlertStore().setAlert("alert-success","Manager Role changed to User successfully");
          this.users =[];
          this.fetchUsers();
          useLoaderStore().hideLoader("switch_role");
      });
      }else{
        await axios.put('switch_manager_to_user/',{manager_id,second_manager_id},{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
            useAlertStore().setAlert("alert-success","Manager Role changed to User successfully");
            this.users =[];
            this.fetchUsers();
            useLoaderStore().hideLoader("switch_role");
        });
      }
    }catch(error){
        useLoaderStore().hideLoader("switch_role");
        if(error.response.status!=500){
            useAlertStore().setAlert("alert-danger",error.response.data.message);
        }
        else{
            useAlertStore().setAlert("alert-danger","Something went wrong");
        }
    }
},
    }
})