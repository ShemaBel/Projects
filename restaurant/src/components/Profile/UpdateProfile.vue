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
          />
          <span class="error-feedback" v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</span>
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
          />
          <span class="error-feedback" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
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
          />
          <span class="error-feedback" v-if="v$.pass.$error">{{ v$.pass.$errors[0].$message }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button type="submit" class="btn btn-primary" :disabled="v$.$invalid">
            Update Profile
          </button>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto error-feedback">
          {{ UpdateErr }}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Navbar from '@/components/Header/Navbar.vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: "UpdateProfile",
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      email: "",
      pass: "",
      userId: "", // Permet de gérer si les champs sont modifiables
      UpdateErr: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(10) },
      email: { required, email },
      pass: { required, minLength: minLength(10) },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.name = parsedUser.name;
      this.email = parsedUser.email;
      this.pass = parsedUser.pass;
      this.userId = parsedUser.userId;
    } else {
 this.redirectTo({ val: 'signUp' });    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async UpdateProfile() {
      this.$v.$validate(); // Validation des champs

      if (!this.v$.$invalid) {
        console.log("validated"); // Ne pas soumettre si le formulaire est invalide
        try {
          const result = await axios.put(`http://127.0.0.1:5500/src/DB/db.json/${this.userId}`, {
            name: this.name,
            email: this.email,
            pass: this.pass,
          });

          if (result.status === 200) {
            console.log("Profile updated successfully");
            localStorage.setItem("user_info", JSON.stringify(result.data));
            this.redirectTo({ val: 'Profile' }); // Redirection après mise à jour
          } else {
            console.warn("Profile not updated successfully");
            this.UpdateErr = "Something went wrong, try again!";
          }
        } catch (error) {
          console.error("Error during profile update:", error);
          this.UpdateErr = "Something went wrong, please refresh the page!";
        }
      } else {
        this.UpdateErr = "Please correct the errors in the form!";
      }
    },
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
}
</style>
