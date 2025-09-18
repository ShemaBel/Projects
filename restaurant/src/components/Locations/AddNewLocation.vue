<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Add New Restaurant
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Restaurant</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addRestaurant">
            <div class="row g-3 align-items-center">
              <div class="col-auto d-block mx-auto">
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="Restaurant Name"
                  v-model.trim="name"
                />
              </div>
            </div>
            <br />
            <div class="row g-3 align-items-center">
              <div class="col-auto d-block mx-auto">
                <input
                  type="text"
                  id="phone"
                  class="form-control"
                  placeholder="Phone Number"
                  v-model.trim="phone"
                />
              </div>
            </div>
            <br />
            <div class="row g-3 align-items-center">
              <div class="col-auto d-block mx-auto">
                <input
                  type="text"
                  id="adress"
                  class="form-control"
                  placeholder="Restaurant Address"
                  v-model.trim="adress"
                />
              </div>
            </div>
            <br />
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="addRestaurant">
            Add Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNewLocation",
  data() {
    return {
      name: "",
      adress: "",
      phone: "",
    };
  },
  methods: {
    addRestaurant() {
      // Vérifier si tous les champs sont remplis
      if (!this.name || !this.adress || !this.phone) {
        alert("All fields are required!");
        return;
      }

      // Afficher les données du nouveau restaurant dans la console
      console.log("New Restaurant:", {
        name: this.name,
        adress: this.adress,
        phone: this.phone,
      });

      // Afficher un message de confirmation
      alert("Restaurant added successfully!");

      // Réinitialiser les champs du formulaire après soumission
      this.name = "";
      this.adress = "";
      this.phone = "";
    },
  },
};
</script>

<style scoped>
.modal-body {
  padding: 20px;
}
.btn-primary {
  margin-top: 10px;
}
</style>
