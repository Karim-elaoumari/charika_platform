
<script setup>

import {ref,onBeforeMount} from "vue";
import Alert from "../composants/alert.vue";
import Loader from "../composants/loader.vue";
import Footer from "./footer.vue";
</script>
<template>
   <Loader :loaderName="'main'"></Loader>
    <!-- <div v-if="authStore.getuser" class="text-danger">  {{ authStore.getuser.email }}</div>
    <div v-else class="text-danger"> anuthetified</div> -->
    <section id="hero" class="hero d-flex align-items-center">
<div class="container">
  <Alert></Alert>
  <div class="row">
    <div class="col-lg-6 d-flex flex-column justify-content-center">
      <h1 data-aos="fade-up">Unlock the power of customer feedback to find the best companies</h1>
      <h2 data-aos="fade-up" data-aos-delay="400">Expert analysis and unbiased reviews to help you choose the right company</h2>
      <div data-aos="fade-up" data-aos-delay="600">
       
        <form class="d-flex" role="search">
         
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-primary" type="submit">Search</button>
        </form>
      </div>
    </div>
    <div class="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
      <img src="../../assets/img/company.jpg" class="img-fluid" alt="">
    </div>
  </div>
</div>

</section>

<main id="main">

<section id="about" class="about">
  

  <div class="container" data-aos="fade-up">
    <div class="row gx-0">

      <div class="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
        <div class="content">
          <h3>Why Charika not Others:</h3>
         
          <p>
          you can find expert analysis and unbiased reviews to help you make informed decisions about the best companies for your needs. Our platform empowers consumers by providing reliable reviews and comprehensive comparisons of top-rated companies in various industries.

Whether you're searching for the perfect match for your business or personal needs, our user-friendly review platform makes it easy to discover and compare companies side-by-side. Our trusted reviews and analysis provide the inside scoop on top companies, unlocking the power of customer feedback and helping you make confident decisions.

Stay ahead of the competition with our in-depth reviews and ratings, and experience the difference with our comprehensive company comparisons. Make better business decisions with our expert analysis and unbiased reviews, and find the best companies to meet your needs. Join our community today and start discovering the best companies for you!
            </p>
          <div class="text-center text-lg-start">
            <a href="#" class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
              <span>Explore Now</span>
              <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
        <img src="../../assets/img/worker_power.jpg" class="img-fluid" alt="">
      </div>

    </div>
  </div>

</section>




<section id="counts" class="counts">
  <div class="container" data-aos="fade-up">
    <header class="section-header">
      <p>What You Can Do ?</p>
    </header>
    <div class="row gy-4">

      <div class="col-lg-3 col-md-6">
        <div class="count-box">
          <i class="bi bi-search"></i>
          <div>
            <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" class="purecounter"></span>
            <p>Explore Companies</p>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="count-box">
          <i class="bi bi-file-earmark-text" style="color: #ee6c20;"></i>
          <div>
            <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" class="purecounter"></span>
            <p>View Reviews</p>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="count-box">
          <i class="bi bi-file-earmark-plus" style="color: #15be56;"></i>
          <div>
            <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" class="purecounter"></span>
            <p>Make Reviews</p>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="count-box">
          <i class="bi bi-chat-right-dots" style="color: #bb0852;"></i>
          <div>
            <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" class="purecounter"></span>
            <p>Make Comments</p>
          </div>
        </div>
      </div>

    </div>

  </div>
</section><!-- End Counts Section -->

<!-- ======= Features Section ======= -->
<section id="features" class="features">

  <div class="container" data-aos="fade-up">

    <header class="section-header">
      <p>Top Industries</p>
    </header>

    <div class="row align-self-center gy-4">
          <div class="col-md-3" data-aos="zoom-out" data-aos-delay="200">
            <div class="feature-box d-flex align-items-center">
              <i class="bi bi-check"></i>
              <h3>Eos aspernatur rem</h3>
            </div>
          </div>

          <div class="col-md-3" data-aos="zoom-out" data-aos-delay="300">
            <div class="feature-box d-flex align-items-center">
              <i class="bi bi-check"></i>
              <h3>Facilis neque ipsa</h3>
            </div>
          </div>

          <div class="col-md-3" data-aos="zoom-out" data-aos-delay="400">
            <div class="feature-box d-flex align-items-center">
              <i class="bi bi-check"></i>
              <h3>Volup amet voluptas</h3>
            </div>
          </div>

          <div class="col-md-3" data-aos="zoom-out" data-aos-delay="500">
            <div class="feature-box d-flex align-items-center">
              <i class="bi bi-check"></i>
              <h3>Rerum omnis sint</h3>
            </div>
          </div>

          <div class="col-md-3" data-aos="zoom-out" data-aos-delay="600">
            <div class="feature-box d-flex align-items-center">
              <i class="bi bi-check"></i>
              <h3>Alias possimus</h3>
            </div>
          </div>

          <div class="col-md-3" data-aos="zoom-out" data-aos-delay="700">
            <div class="feature-box d-flex align-items-center">
              <i class="bi bi-check"></i>
              <h3>Repellendus mollitia</h3>
            </div>
          </div>
          <div class="col-md-3" data-aos="zoom-out" data-aos-delay="700">
            <div class="feature-box d-flex align-items-center">
              <i class="bi bi-check"></i>
              <h3>Repellendus mollitia</h3>
            </div>
          </div>
    </div> 
  </div>

</section>




<section id="recent-blog-posts" class="recent-blog-posts">

  <div class="container" data-aos="fade-up">

    <header class="section-header">
      <p>Some Companies</p>
    </header>

    <div class="row">

      <div class="col-lg-6 entries blog">
        <article class="entry">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png" style="max-width: 100px;height: 90px;" alt=""></div>
              <div style="padding-left: 7px;">
                <h5><a href="">Amazon</a> </h5>
                <p>
                  <b class="text-bold">Description:</b> nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia nihil ut accusantium tempore. Nesciunt expedita id dolor exercitationem aspernatur aut quam ut. Voluptatem est accusamus iste at.
                 
                </p>
              </div>
            </div>
          </div>
          <div class="entry-meta">
            <ul>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">Employees:123</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Industry: It consulting</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="blog-single.html">Reviews:1231</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">Rate: 2.5/5</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Location: Parie</time></a></li>
            </ul>
          </div>
        </article>
      </div>
      <div class="col-lg-6 entries blog">
        <article class="entry">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png" style="max-width: 100px;height: 90px;" alt=""></div>
              <div style="padding-left: 7px;">
                <h5><a href="">Amazon</a> </h5>
                <p>
                  <b class="text-bold">Description:</b> nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia nihil ut accusantium tempore. Nesciunt expedita id dolor exercitationem aspernatur aut quam ut. Voluptatem est accusamus iste at.
                 
                </p>
              </div>
            </div>
          </div>
          <div class="entry-meta">
            <ul>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">Employees:123</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Industry: It consulting</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="blog-single.html">Reviews:1231</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">Rate: 2.5/5</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Location: Parie</time></a></li>
            </ul>
          </div>
        </article>
      </div>
      <div class="col-lg-6 entries blog">
        <article class="entry">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png" style="max-width: 100px;height: 90px;" alt=""></div>
              <div style="padding-left: 7px;">
                <h5><a href="">Amazon</a> </h5>
                <p>
                  <b class="text-bold">Description:</b> nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia nihil ut accusantium tempore. Nesciunt expedita id dolor exercitationem aspernatur aut quam ut. Voluptatem est accusamus iste at.
                 
                </p>
              </div>
            </div>
          </div>
          <div class="entry-meta">
            <ul>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">Employees:123</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Industry: It consulting</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="blog-single.html">Reviews:1231</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">Rate: 2.5/5</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Location: Parie</time></a></li>
            </ul>
          </div>
        </article>
      </div>
      <div class="col-lg-6 entries blog">
        <article class="entry">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png" style="max-width: 100px;height: 90px;" alt=""></div>
              <div style="padding-left: 7px;">
                <h5><a href="">Amazon</a> </h5>
                <p>
                  <b class="text-bold">Description:</b> nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia nihil ut accusantium tempore. Nesciunt expedita id dolor exercitationem aspernatur aut quam ut. Voluptatem est accusamus iste at.
                 
                </p>
              </div>
            </div>
          </div>
          <div class="entry-meta">
            <ul>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">Employees:123</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Industry: It consulting</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="blog-single.html">Reviews:1231</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">Rate: 2.5/5</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Location: Parie</time></a></li>
            </ul>
          </div>
        </article>
      </div>

      

    </div>

  </div>

</section>

</main>
<Footer></Footer>


</template>
<style>
</style>