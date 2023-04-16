<script setup>
import { onBeforeMount } from 'vue';
import { useAuthStore } from '../../stores/auth';
import Loader from "../composants/loader.vue";
import Footer from "./footer.vue";
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
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href=""><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="">12 Comments</a></li>
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
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="">John Doe</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href=""><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="">12 Comments</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="">John Doe</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href=""><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="">12 Comments</a></li>
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
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="">John Doe</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href=""><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="">12 Comments</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="">John Doe</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href=""><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="">12 Comments</a></li>
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
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="">John Doe</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href=""><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="">12 Comments</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="">John Doe</a></li>
              <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href=""><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
              <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="">12 Comments</a></li>
            </ul>
          </div>

          

        </article>

        <ul class="pagination  justify-content-center">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
        </ul>
      </div>

      <div class="col-lg-4">

        <div class="sidebar">
          <h3 class="sidebar-title">Filter by Rates:</h3>
          <div class="sidebar-item categories">
            <ul>
              <li>
                    <div class="">
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill "  style="color:#fbc634"></i>
                    </div>
              </li>
              <li>
                    <div class="">
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill "  ></i>
                    </div>
              </li>
              <li>
                    <div class="">
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " ></i>
                        <i class="bi bi-star-fill "  ></i>
                    </div>
              </li>
              <li>
                    <div class="">
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " style="color:#fbc634"></i>
                        <i class="bi bi-star-fill " ></i>
                        <i class="bi bi-star-fill " ></i>
                        <i class="bi bi-star-fill "  ></i>
                    </div>
              </li>
              <li>
                    <div class="">
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
              <h4 class="row "><a href="" class="col-6">Amazon</a>
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
              <h4 class="row "><a href="" class="col-6">Amazon</a>
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

<Footer></Footer>
</template>
<style scoped>
</style>