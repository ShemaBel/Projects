<template>
  <div class="container">
    <Navbar />
    <p class="text-end">
      Welcome {{ userName }}
      <router-link :to="{ name: 'Profile' }">
        <button class="btn btn-info" type="button">Profile</button>
      </router-link>
    </p>
    <AddNewLocation />
  </div>
</template>

<script>
import Navbar from "@/components/Header/Navbar.vue";
import AddNewLocation from "@/components/Locations/AddNewLocation.vue";
import { mapActions } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      userName: "", // Initialisation du nom de l'utilisateur
    };
  },
  components: {
    Navbar,
    AddNewLocation,
  },
  mounted() {
    const user = localStorage.getItem("user-info");
    if (!user) {
      // Redirection vers la page d'inscription si aucun utilisateur n'est connecté
      this.redirectTo({ val: "signUp" });
    } else {
      // Extraction du nom de l'utilisateur à partir des données stockées
      this.userName = JSON.parse(user).name;
    }
  },
  methods: {
    // Mapping des actions Vuex pour gérer les redirections
    ...mapActions(["redirectTo"]),
  },
};
</script>
