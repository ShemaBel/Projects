<template>
  <div>
    <Navbar />
    <div class="text-center">
      <router-link :to="{ name: 'home' }">
        <button class="btn btn-info">Visit Home Page</button>
      </router-link>
    </div>
    <br />
    <img
      src="../assets/PageNotFound.png"
      class="rounded mx-auto d-block h400"
      alt="Page Not Found"
    />
  </div>
</template>

<script>
import Navbar from "@/components/Header/Navbar.vue";
export default {
  components: { Navbar },
  name: "ErrorPage",
};
</script>

<style scoped>
.h400 {
  height: 400px;
}
</style>
