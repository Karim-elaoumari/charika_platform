<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
    <section class="page_404  ">
	<div class="container text-center">
		<div class="row">	
		<div class=" ">
		<div class=" col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">404</h1>
		
		
		</div>
			  
		<div class="contant_box_404">
		<h3 class="h2">
		Look like you're lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
         <router-link :to="{ path: $route.query.redirect || '/' }" class="link_404">Return</router-link> 
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
</template>

<style scoped>

.page_404{ padding-top:50px; background:#fff; font-family: 'Arvo', serif;margin:auto;
}
.page_404  img{ width:100%;}
.four_zero_four_bg{
 
 background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 400px;
    background-position: center;
 }
 
 
 .four_zero_four_bg h1{
 font-size:80px;
 }
 
  .four_zero_four_bg h3{
			 font-size:80px;
			 }
			 
			 .link_404{			 
	color: #fff!important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;}
	.contant_box_404{ margin-top:-50px;}
</style>

