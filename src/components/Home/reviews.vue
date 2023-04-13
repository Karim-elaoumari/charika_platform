<script setup>
import { onBeforeMount } from 'vue';
import { useAuthStore } from '../../stores/auth';
import Loader from "../composants/loader.vue";
onBeforeMount(async ()=>{
  if(useAuthStore().getUser==false){
    await useAuthStore().checkAuth();
  }
});
</script>
<template>
  <Loader :loaderName="'main'"></Loader>
<main id="main">
<section class="breadcrumbs">
  <div class="container">
    <h2>Reviews</h2>
  </div>
</section>

<section id="blog" class="blog">
  
  <div class="container" data-aos="fade-up">

    <div class="row">

      <div class="col-lg-8 entries">
        <h5 class="text-primary">Search</h5>
        <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-primary" type="submit">Search</button>
        </form><br>

        <article class="entry">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img src="../../assets/img/blog/comments-5.jpg" style="max-width: 100px;border-radius: 50%;" alt="">
                <img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png" style="width: 40px;height:40px;border-radius: 50%;border: 1px black solid;margin-left: 56px;margin-top: -45px;" alt="">
              </div>
             
              <div style="padding-left: 7px;">
                <h5><a href="">Karim -> Amazon</a> </h5>
                <time datetime="2020-01-01">01 Jan, 2020</time>
                <p>
                  Distinctio nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia nihil ut accusantium tempore. Nesciunt expedita id dolor exercitationem aspernatur aut quam ut. Voluptatem est accusamus iste at.
                 
                </p>
              </div>
            </div>
          </div>

          <div class="entry-meta">
            <ul>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="blog-single.html">12 Comments</a></li>
            </ul>
          </div>

          

        </article>
        <article class="entry">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img src="../../assets/img/blog/comments-5.jpg" style="max-width: 100px;border-radius: 50%;" alt="">
                <img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png" style="width: 40px;height:40px;border-radius: 50%;border: 1px black solid;margin-left: 56px;margin-top: -45px;" alt="">
              </div>
             
              <div style="padding-left: 7px;">
                <h5><a href="">Karim -> Amazon</a> </h5>
                <time datetime="2020-01-01">01 Jan, 2020</time>
                <p>
                  Distinctio nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia nihil ut accusantium tempore. Nesciunt expedita id dolor exercitationem aspernatur aut quam ut. Voluptatem est accusamus iste at.
                 
                </p>
              </div>
            </div>
          </div>

          <div class="entry-meta">
            <ul>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">John Doe</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="blog-single.html">12 Comments</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">John Doe</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="blog-single.html">12 Comments</a></li>
            </ul>
          </div>

          

        </article>
        <article class="entry">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img src="../../assets/img/blog/comments-5.jpg" style="max-width: 100px;border-radius: 50%;" alt="">
                <img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png" style="width: 40px;height:40px;border-radius: 50%;border: 1px black solid;margin-left: 56px;margin-top: -45px;" alt="">
              </div>
             
              <div style="padding-left: 7px;">
                <h5><a href="">Karim -> Amazon</a> </h5>
                <time datetime="2020-01-01">01 Jan, 2020</time>
                <p>
                  Distinctio nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia nihil ut accusantium tempore. Nesciunt expedita id dolor exercitationem aspernatur aut quam ut. Voluptatem est accusamus iste at.
                 
                </p>
              </div>
            </div>
          </div>

          <div class="entry-meta">
            <ul>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">John Doe</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="blog-single.html">12 Comments</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">John Doe</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="blog-single.html">12 Comments</a></li>
            </ul>
          </div>

          

        </article>
        <article class="entry">
            <div id="comment-3" class="comment">
            <div class="d-flex">
              <div class="comment-img"><img src="../../assets/img/blog/comments-5.jpg" style="max-width: 100px;border-radius: 50%;" alt="">
                <img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png" style="width: 40px;height:40px;border-radius: 50%;border: 1px black solid;margin-left: 56px;margin-top: -45px;" alt="">
              </div>
             
              <div style="padding-left: 7px;">
                <h5><a href="">Karim -> Amazon</a> </h5>
                <time datetime="2020-01-01">01 Jan, 2020</time>
                <p>
                  Distinctio nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia nihil ut accusantium tempore. Nesciunt expedita id dolor exercitationem aspernatur aut quam ut. Voluptatem est accusamus iste at.
                 
                </p>
              </div>
            </div>
          </div>

          <div class="entry-meta">
            <ul>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">John Doe</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="blog-single.html">12 Comments</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-single.html">John Doe</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="blog-single.html">12 Comments</a></li>
            </ul>
          </div>

          

        </article>

        <div class="blog-pagination">
          <ul class="justify-content-center">
            <li><a href="#">1</a></li>
            <li class="active"><a href="#">2</a></li>
            <li><a href="#">3</a></li>
          </ul>
        </div>

      </div>

      <div class="col-lg-4">

        <div class="sidebar">

         

          <h3 class="sidebar-title">Filter by Rates:</h3>
          <div class="sidebar-item categories">
            <ul>
              <li>
                    <div class="ratings">
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill "  style="color:#fbc634"></i>
                    </div>
              </li>
              <li>
                    <div class="ratings">
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill "  ></i>
                    </div>
              </li>
              <li>
                    <div class="ratings">
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " ></i>
                        <i class="bi bi-star-fill "  ></i>
                    </div>
              </li>
              <li>
                    <div class="ratings">
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " ></i>
                        <i class="bi bi-star-fill " ></i>
                        <i class="bi bi-star-fill "  ></i>
                    </div>
              </li>
              <li>
                    <div class="ratings">
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " ></i>
                        <i class="bi bi-star-fill " ></i>
                        <i class="bi bi-star-fill " ></i>
                        <i class="bi bi-star-fill "  ></i>
                    </div>
              </li>
            </ul>
          </div>

          <h3 class="sidebar-title">Some Companies</h3>
          <div class="sidebar-item recent-posts">
            <div class="post-item clearfix">
              <img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png" alt="">
              <h4 class="row "><a href="blog-single.html" class="col-6">Amazon</a>
                <div class="col-6">
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " ></i>
                        <i class="bi bi-star-fill "  ></i>
              </div>
              </h4>
              <div>Industry : IT consulting</div>
              
            </div>
            <hr>

            <div class="post-item clearfix">
              <img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png" alt="">
              <h4 class="row "><a href="blog-single.html" class="col-6">Amazon</a>
                <div class="ratings col-6">
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " ></i>
                        <i class="bi bi-star-fill "  ></i>
              </div>
              </h4>
              <div>Industry : IT consulting</div>
              
            </div>

            

          </div>

        </div>

      </div>

    </div>

  </div>
</section>

</main>

<footer id="footer" class="footer">

<div class="footer-newsletter">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-12 text-center">
        <h4>Our Newsletter</h4>
        <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
      </div>
      <div class="col-lg-6">
        <form action="" method="post">
          <input type="email" name="email"><input type="submit" value="Subscribe">
        </form>
      </div>
    </div>
  </div>
</div>

<div class="footer-top">
  <div class="container">
    <div class="row gy-4">
      <div class="col-lg-5 col-md-12 footer-info">
        <a href="index.html" class="logo d-flex align-items-center">
          <img src="../../assets/img/logo.png" alt="">
          <span>FlexStart</span>
        </a>
        <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
        <div class="social-links mt-3">
          <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
          <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>

      <div class="col-lg-2 col-6 footer-links">
        <h4>Useful Links</h4>
        <ul>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Home</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#">About us</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Services</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Privacy policy</a></li>
        </ul>
      </div>

      <div class="col-lg-2 col-6 footer-links">
        <h4>Our Services</h4>
        <ul>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Web Design</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Web Development</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Product Management</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Marketing</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Graphic Design</a></li>
        </ul>
      </div>

      <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
        <h4>Contact Us</h4>
        <p>
          A108 Adam Street <br>
          New York, NY 535022<br>
          United States <br><br>
          <strong>Phone:</strong> +1 5589 55488 55<br>
          <strong>Email:</strong> info@example.com<br>
        </p>

      </div>

    </div>
  </div>
</div>

<div class="container">
  <div class="copyright">
    &copy; Copyright <strong><span>FlexStart</span></strong>. All Rights Reserved
  </div>
  <div class="credits">
    
    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
  </div>
</div>
</footer>
<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
</template>
<style scoped>
</style>