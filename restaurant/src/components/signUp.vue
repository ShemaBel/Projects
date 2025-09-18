<template>
  <form @submit.prevent="signUp">
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <h1>Sign Up</h1>
        <input
          type="text"
          class="form-control"
          placeholder="Enter your Name"
          v-model.trim="name"
        />
        <span class="error-feedback" v-if="v$.name.$error">
          {{ v$.name.$errors[0].$message }}
        </span>
      </div>
    </div>
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          type="email"
          class="form-control"
          placeholder="Enter your Email"
          v-model.trim="email"
        />
        <span class="error-feedback" v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </span>
      </div>
    </div>
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          type="password"
          class="form-control"
          placeholder="Enter your Password"
          v-model.trim="pass"
        />
        <span class="error-feedback" v-if="v$.pass.$error">
          {{ v$.pass.$errors[0].$message }}
        </span>
      </div>
    </div>
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button type="submit" class="btn btn-primary">Sign Up</button>
        &nbsp;&nbsp;&nbsp;
        <button
          type="button"
          class="btn btn-link"
          @click="redirectTo({ val: 'login' })"
        >
          Login
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  name: "SignUpForm",
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      name: "",
      email: "",
      pass: "",
    };
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      pass: { required, minLength: minLength(10) },
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async signUp() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("Form validated successfully");
        try {
          const result = await axios.post("http://localhost:3000/users", {
            name: this.name,
            email: this.email,
            pass: this.pass,
          });

          if (result.status === 201) {
            console.log("User added successfully");
            localStorage.setItem("user-info", JSON.stringify(result.data));
            this.redirectTo({ val: "home" });
          } else {
            console.log("Error adding user");
          }
        } catch (error) {
          console.error("Error during sign up:", error);
        }
      } else {
        console.log("Validation errors");
      }
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.85em;
}
</style>
