<script setup>


</script>
<template>
<section id="dashboard">
  <h3 class="fw-bold mycolor"><i
      class="uil uil-chart-bar fs-4 me-2 "></i>Dashboard</h3>
      <div class="cover_image " style="background-image: url('https://img.freepik.com/premium-photo/businessman-hold-light-bulb-inspiration-showing-stock-growing-statistics-graph-chart_34200-756.jpg?w=1380');background-size:cover; border-radius:10px"  >
      <div class="container mb-4">
          <div class="row">
              <div class="col-md-12 p-5 pb-5 text-white">
                  <h5 class="fw-bolder">Welcome !</h5>
                  <p class="fs-4 fw-bold"> Karim El aoumari</p>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta ab tempore quo.<br>
                     
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque tenetur quod cumque?
                  </p>
                  <h6 class="fw-bolder">Search an Article here </h6>
              </div>
          </div>
      </div>
  </div>
  <div class="row g-3 d-flex justify-content-around">
      <div class="col-lg-4 col-md-5 col-11 " >
          <div class="p-3 shadow-sm d-flex bg-white justify-content-around align-items-center rounded border">
              <div>                      
                  <h3 class="fs-2 mycolor">
                   10
                  </h3>
                  <p class="fs-5 text-black">Categories</p>
              </div>    
              <i class="uil uil-edit-alt fs-3 mycolor box rounded py-2  px-3"></i>          
          </div>
      </div>
      <div class="col-lg-4 col-md-5 col-11">
          <div class="p-3 shadow-sm d-flex bg-white justify-content-around align-items-center rounded border">
              <div>
                  <h3 class="fs-2 mycolor">
                     10
                  </h3>
                  <p class="fs-5 text-black">Admins</p>
              </div>
              <i class="uil uil-book-reader fs-3 mycolor box rounded py-2  px-3 "></i>
          </div>
      </div>
      <div class="col-lg-4 col-md-5 col-11">
          <div class="p-3  shadow-sm d-flex bg-white justify-content-around align-items-center rounded  border"> 
              <div>
                  <h3 class="fs-2 mycolor">15</h3>
                  <p class="fs-5 text-black">Articles</p>
              </div>
              <i class="uil uil-bookmark fs-3 mycolor rounded py-2  px-3 box"></i>
          </div>
      </div>
  </div>
    <section class="mt-5 ms-3 justify-content-between gap-3">
    <p class="fs-5 ms-2 mycolor">New Reviews:</p>
    <div class=" table-responsive mt-2">
    <table class="table align-middle mb-0 bg-white" style="border: 1px solid blue;">
  <thead class="bg-light">
    <tr>
      <th>Name</th>
      <th>Title</th>
      <th>Status</th>
      <th>Position</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div class="d-flex align-items-center">
          <img
              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
              alt=""
              style="width: 45px; height: 45px"
              class="rounded-circle"
              />
          <div class="ms-3">
            <p class="fw-bold mb-1">John Doe</p>
            <p class="text-muted mb-0">john.doe@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p class="fw-normal mb-1">Software engineer</p>
        <p class="text-muted mb-0">IT department</p>
      </td>
      <td>
        <span class="badge badge-success rounded-pill d-inline">Active</span>
      </td>
      <td>Senior</td>
      <td>
        <button type="button" class="btn btn-link btn-sm btn-rounded">
          Edit
        </button>
      </td>
    </tr>
    <tr>
      <td>
        <div class="d-flex align-items-center">
          <img
              src="https://mdbootstrap.com/img/new/avatars/6.jpg"
              class="rounded-circle"
              alt=""
              style="width: 45px; height: 45px"
              />
          <div class="ms-3">
            <p class="fw-bold mb-1">Alex Ray</p>
            <p class="text-muted mb-0">alex.ray@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p class="fw-normal mb-1">Consultant</p>
        <p class="text-muted mb-0">Finance</p>
      </td>
      <td>
        <span class="badge badge-primary rounded-pill d-inline"
              >Onboarding</span
          >
      </td>
      <td>Junior</td>
      <td>
        <button
                type="button"
                class="btn btn-link btn-rounded btn-sm fw-bold"
                data-mdb-ripple-color="dark"
                >
          Edit
        </button>
      </td>
    </tr>
    <tr>
      <td>
        <div class="d-flex align-items-center">
          <img
              src="https://mdbootstrap.com/img/new/avatars/7.jpg"
              class="rounded-circle"
              alt=""
              style="width: 45px; height: 45px"
              />
          <div class="ms-3">
            <p class="fw-bold mb-1">Kate Hunington</p>
            <p class="text-muted mb-0">kate.hunington@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p class="fw-normal mb-1">Designer</p>
        <p class="text-muted mb-0">UI/UX</p>
      </td>
      <td>
        <span class="badge badge-warning rounded-pill d-inline">Awaiting</span>
      </td>
      <td>Senior</td>
      <td>
        <button
                type="button"
                class="btn btn-link btn-rounded btn-sm fw-bold"
                data-mdb-ripple-color="dark"
                >
          Edit
        </button>
      </td>
    </tr>
  </tbody>
</table>
           </div>
    </section>
</section>
</template>
<style scoped>
</style>