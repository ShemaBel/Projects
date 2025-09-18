<template>
  <div class="container">
    <Navbar />
    <ProfileForm />
  </div>
</template>

<script>
import Navbar from '@/components/Header/Navbar.vue';  // Vérifiez le chemin d'importation
import ProfileForm from '@/components/Profile/Profile.vue';  // Vérifiez également ce chemin

export default {
  name: "Profile",  // Nom du composant
  components: {
    Navbar,
    ProfileForm  // Ajoutez ProfileForm comme un composant dans cette vue
  }
};
</script>

<style scoped>
/* Ajoutez vos styles ici si nécessaire */
</style>
