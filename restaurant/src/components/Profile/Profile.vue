<template>
  <div class="container">
    <Navbar />
    <form @submit.prevent="UpdateProfile">
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <h1>Update your Profile</h1>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            name="name"
            id="name"
            class="form-control"
            placeholder="Enter your Name"
            v-model="name"
            :disabled="!editable"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            placeholder="Enter your Email"
            v-model="email"
            :disabled="!editable"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="password"
            name="pass"
            id="pass"
            class="form-control"
            placeholder="Enter your password"
            v-model="pass"
            :disabled="!editable"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button type="submit" class="btn btn-primary" :disabled="!editable || $v.$invalid">
            Update Profile
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Navbar from '@/components/Header/Navbar.vue'; // Vérifiez le chemin
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

export default {
  name: "ProfileForm",
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      email: "",
      pass: "",
      editable: true,  // Permet de gérer si les champs sont modifiables
    };
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      pass: { required, minLength: minLength(6) },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.name = parsedUser.name;
      this.email = parsedUser.email;
      this.pass = parsedUser.pass;
    }else{
         this.redirectTo({ val: 'signUp' });
    }
  },
  methods: {
    UpdateProfile() {
      if (this.$v.$invalid) {
        return; // Ne pas soumettre si le formulaire est invalide
      }
      // Ajouter la logique pour mettre à jour le profil de l'utilisateur
    }
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
};
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>
