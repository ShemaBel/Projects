<template>
  <ul id="nav">
    <!-- Utilisation de slots pour personnaliser le contenu du router-link -->
    <router-link :to="{ name: 'home', params: { pageTitle: 'Home Page' } }" exact>
      <li>
        <a>Home</a>
      </li>
    </router-link>

    <li>
      <a href="#" @click="LogMeOut()">Logout</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    LogMeOut() {
      // Effacer les informations de session de l'utilisateur
      localStorage.clear();
      // Rediriger vers la page de login
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss" scoped>
$fontColor: darkcyan;
$navColor: #525a5a;

ul {
  display: flex;
  justify-content: center;
  list-style: none;
  margin-bottom: 50px;

  li {
    margin: 0 10px;
    text-decoration: none;
    font-weight: bold;
    color: $fontColor;
    padding: 10px;
    transition: color 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }

  li.router-link-exact-active,
  li:hover {
    color: $navColor;
    box-shadow: 2px 2px 4px 0px $navColor;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: $fontColor;
    padding: 10px;
    transition: color 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }

  a:hover {
    color: $navColor;
    box-shadow: 2px 2px 4px 0px $navColor;
  }
}
</style>
