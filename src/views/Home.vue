<template>
  <div class="container py-4">
    <h1 class="mb-4">PWA features</h1>
    <div class="row">
      <div
        v-for="item in $router.options.routes"
        :key="item.__hmrId"
        class="col-6 col-md-4 my-2"
      >
        <router-link :to="item.path" class="card shadow h-100">
          <div class="card-body">{{ item.name }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
