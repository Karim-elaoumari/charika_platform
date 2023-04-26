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
        allReviews : [],
        router : useRouter()
    }),
    getters:{
        getReviews: (state) => { return state.reviews},
        getReview : (state) => { return state.selectedReveiw},
        getMyRelatedReviews : (state) => { return state.myRelatedReviews},
        getAllReviews : (state) => { return state.allReviews}
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
                if(error.response.status==401){
                    useAlertStore().setAlert("alert-info",'You need to login first or create account');
                }
                else{
                    useAlertStore().setAlert("alert-danger",error.response.data.message);
                }
                   
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
        async fetchAllReviews(){
            useLoaderStore().showLoader({name:"wait_review",visibility:false});
             try{
                await axios.get('/get_all_reviews',{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
                  this.allReviews = response.data.data;
                  useLoaderStore().hideLoader("wait_review");
                });
              } catch (error){
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
                  this.reviews =[];
                  useCompanyStore().clearCompanies();
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
      async fullDeleteReview(id){
        useLoaderStore().showLoader({name:"wait_review",visibility:true});
        try{
            await axios.delete('reviews/'+id,{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
                useAlertStore().setAlert("alert-success","Review  definitely deleted  successfully");
                this.fetchAllReviews();
                this.reviews =[];
                useLoaderStore().hideLoader("wait_review");
            });
        }catch(error){
            useLoaderStore().hideLoader("wait_review");
            if(error.response.status!=500){
                useAlertStore().setAlert("alert-danger",error.response.data.message);
            }
            else{
                useAlertStore().setAlert("alert-danger","Something went wrong");
            }
        }
    },
    async activateReview(id){
        useLoaderStore().showLoader({name:"wait_review",visibility:false});
        try{
            await axios.post('restore_review/'+id,null,{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
                useAlertStore().setAlert("alert-success","Review restored successfully");
                this.fetchAllReviews();
                this.reviews =[];
                useLoaderStore().hideLoader("wait_review");
            });
        }catch(error){
            useLoaderStore().hideLoader("wait_review");
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
            await axios.post('/comments', info,{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response =>{ 
              
                this.selectedReveiw = null;
                this.reviews = [];
                this.fetchReviewById(info.review_id);
                useLoaderStore().hideLoader("add_comment");
                

            });
        } catch (error){
            useLoaderStore().hideLoader("add_comment");
          if(error.response.status!=500){
            if(error.response.status==401){
                useAlertStore().setAlert("alert-info",'You need to login first or create account');
            }
            else{
                useAlertStore().setAlert("alert-danger",error.response.data.message);
            }
          }
          else{
              useAlertStore().setAlert("alert-danger","Something went wrong");
          }
        }
    },
    async deleteComment(id,review_id){
        useLoaderStore().showLoader({name:"delete_comment",visibility:true});
        try{
            await axios.post('delete_comment/'+id,null,{headers:{ 'Authorization': `Bearer ${Cookies.get('token')}`}}).then(response => {
                this.selectedReveiw = null;
                this.reviews = [];
                this.fetchReviewById(review_id);
                useLoaderStore().hideLoader("delete_comment");
            });
        }catch(error){
            useLoaderStore().hideLoader("delete_comment");
        }
    },


    }
})