import {defineStore} from 'pinia'
import axios from  '../lib/axios'
import Cookies from 'js-cookie'
import { useLoaderStore } from "./loader"
import { useAlertStore } from './alert'
import {useRouter} from 'vue-router'
import { useCompanyStore } from './company'
export const useReviewStore = defineStore("review",{
    state:() => ({
        reviews:[],
        selectedReveiw : null,
        myRelatedReviews : [],
        router : useRouter()
    }),
    getters:{
        getReviews: (state) => { return state.reviews},
        getReview : (state) => { return state.selectedReveiw},
        getMyRelatedReviews : (state) => { return state.myRelatedReviews}
    },
    actions:{
        async addReview(info,name){
            useLoaderStore().showLoader({name:"add_review",visibility:true});
            try{
                await axios.post('/reviews', info,{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response =>{ 
                    useAlertStore().setAlert("alert-success","Review submited successfully");
                    this.reviews = response.data.data;
                    useCompanyStore().clearCompanies();
                    useCompanyStore().fetchCompanyByName(name);
                    useLoaderStore().hideLoader("add_review");
                    

                });
            } catch (error){
                useLoaderStore().hideLoader("add_review");
              if(error.response.status!=500){
                    useAlertStore().setAlert("alert-danger",error.response.data.message);
              }
              else{
                  useAlertStore().setAlert("alert-danger","Something went wrong");
              }
            }
        },
        async updateReview(id,name,logo,website,country_code,city,address,industry,foundation_year,employees,revenue,description,mission){
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
        async fetchReviews(){
            useLoaderStore().showLoader({name:"wait_review",visibility:false});
             try{
                await axios.get('/reviews').then(response =>{
                  this.reviews = response.data.data;
                  useLoaderStore().hideLoader("wait_review");
                });
              }catch (error){
                console.error(error);
              }
        },
        async fetchReviewById(id){
            useLoaderStore().showLoader({name:"wait_review",visibility:false});
             try{
                await axios.get('/reviews/'+id).then(response => {
                  this.selectedReveiw = response.data.data;
                  useLoaderStore().hideLoader("wait_review");
                });
              } catch (error){
                if(error.response.status==404){
                    this.router.push({name:"not-found"});
                }
              }
        },
        async fetchMyRelatedReviews(){
            useLoaderStore().showLoader({name:"wait_review",visibility:false});
             try{
                await axios.get('/reviews_manager',{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
                  this.myRelatedReviews = response.data.data;
                  useLoaderStore().hideLoader("wait_review");
                });
              } catch (error){
                console.error(error);
              }
        },
        async deleteReview(id){
          useLoaderStore().showLoader({name:"delete_review",visibility:true});
          try{
              await axios.post('delete_review/'+id,null,{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
                  useAlertStore().setAlert("alert-success","Review deleted successfully");
                  this.fetchMyRelatedReviews();
                  this.reviews =null;
                  useLoaderStore().hideLoader("delete_review");
              });
          }catch(error){
              useLoaderStore().hideLoader("delete_review");
              if(error.response.status!=500){
                  useAlertStore().setAlert("alert-danger",error.response.data.message);
              }
              else{
                  useAlertStore().setAlert("alert-danger","Something went wrong");
              }
          }
      },

      // comment section -----------------
      async addComment(info){
        useLoaderStore().showLoader({name:"add_comment",visibility:true});
        try{
            await axios.post('/reviews', info,{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response =>{ 
                useAlertStore().setAlert("alert-success","Review submited successfully");
                this.reviews = response.data.data;
                useCompanyStore().clearCompanies();
                useCompanyStore().fetchReviewById(info.review_id);
                useLoaderStore().hideLoader("add_comment");
                

            });
        } catch (error){
            useLoaderStore().hideLoader("add_comment");
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