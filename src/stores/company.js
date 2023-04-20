import {defineStore} from 'pinia'
import axios from  '../lib/axios'
import Cookies from 'js-cookie'
import { useLoaderStore } from "./loader"
import { useAlertStore } from './alert'
import {useRouter} from 'vue-router'
export const useCompanyStore = defineStore("company", {
    state:() => ({
        companies:[],
        selectedCompany : null,
        myCompanies : [],
        router : useRouter()
    }),
    getters:{
        getCompanies: (state) => { return state.companies},
        getCompany : (state) => { return state.selectedCompany},
        getMyCompanies : (state) => { return state.myCompanies}
    },
    actions:{
        async addCompany(name,logo,website,country_code,city,address,industry,foundation_year,employees,revenue,description,mission){
            useLoaderStore().showLoader({name:"new_company",visibility:true});
            try{
                await axios.post('/companies', {name,logo,website,country_code,city,address,industry,foundation_year,employees,revenue,description,mission},{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response =>{ 
                    useAlertStore().setAlert("alert-success","Company created successfully");
                    this.companies = response.data.data;
                    console.log(this.companies);
                    useLoaderStore().hideLoader("new_company");
                });
            } catch (error){
                useLoaderStore().hideLoader("new_company");
              if(error.response.status!=500){
                    useAlertStore().setAlert("alert-danger",error.response.data.message);
              }
              else{
                  useAlertStore().setAlert("alert-danger","Something went wrong");
              }
            }
        },
        async updateCompany(id,name,logo,website,country_code,city,address,industry,foundation_year,employees,revenue,description,mission){
            useLoaderStore().showLoader({name:"update_company",visibility:true});
            try{
                await axios.put('/companies/'+id, {name,logo,website,country_code,city,address,industry,foundation_year,employees,revenue,description,mission},{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response =>{ 
                    useAlertStore().setAlert("alert-success","Company updated successfully");
                    this.companies = response.data.data;
                    useLoaderStore().hideLoader("update_company");
                });
            }catch(error){
                useLoaderStore().hideLoader("update_company");
              if(error.response.status!=500){
                    useAlertStore().setAlert("alert-danger",error.response.data.message);
              }
              else{
                  useAlertStore().setAlert("alert-danger","Something went wrong");
              }
            }
        },
        async fetchCompanies(){
            useLoaderStore().showLoader({name:"wait_company",visibility:false});
             try{
                await axios.get('/companies').then(response => {
                  this.companies = response.data.data;
                  useLoaderStore().hideLoader("wait_company");
                });
              } catch (error){
                console.error(error);
              }
        },
        async fetchCompanyByName(name){
            useLoaderStore().showLoader({name:"wait_company",visibility:false});
             try{
                await axios.get('/companies/'+name).then(response => {
                  this.selectedCompany = response.data.data;
                  useLoaderStore().hideLoader("wait_company");
                });
              } catch (error){
                if(error.response.status==404){
                    console.log("not found");
                    this.router.push({name:"not-found"});
                }
              }
        },
        async fetchMyCompanies(){
            useLoaderStore().showLoader({name:"wait_company",visibility:false});
             try{
                await axios.get('/companies_manager',{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
                  this.myCompanies = response.data.data;
                  useLoaderStore().hideLoader("wait_company");
                });
              } catch (error){
                console.error(error);
              }
        },
        async deleteCompany(id){
            useLoaderStore().showLoader({name:"delete_company",visibility:true});
            try{
                await axios.post('delete_company/'+id,null,{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
                    useAlertStore().setAlert("alert-success","Company deleted successfully");
                    this.fetchMyCompanies();
                    this.companies =null;
                    useLoaderStore().hideLoader("delete_company");
                });
            }catch(error){
                useLoaderStore().hideLoader("delete_company");
                if(error.response.status!=500){
                    useAlertStore().setAlert("alert-danger",error.response.data.message);
                }
                else{
                    useAlertStore().setAlert("alert-danger","Something went wrong");
                }
            }
        },
        clearCompanies(){
            this.companies = [];
        },
    }
})