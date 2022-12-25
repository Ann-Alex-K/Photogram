<template>
  <div id="app">
    <nav>
      <router-link to="/"><span class="photogram">Photogram</span></router-link>
      <router-link to="/">Posts</router-link> |

      <template v-if="!this.$store.state.token">
        <router-link to="/login">Sign in</router-link> |
        <router-link to="/register">Sign up</router-link>
      </template>

      <template v-if="!this.$store.state.token">
        <div class="white-block"></div>
      </template>

      <template v-if="this.$store.state.token">
        <router-link :to="{ name: 'profile', params: { userId: isLoggedIn } }"
          >Profile</router-link
        >
        |
        <span class="logout" @click="logout">Logout</span>
        <router-link :to="{ name: 'AddPhoto', params: { userId: isLoggedIn } }">
          <div class="input__wrapper">
            <label for="input__file" class="input__file-button">
              <span class="input__file-button-text">Add photo</span>
            </label>
          </div>
        </router-link>
      </template>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token.split(".")[2];
    },
  },

  methods: {
    ...mapActions(["LOGOUT"]),
    logout() {
      this.LOGOUT();
      //  this.$router.push({ name: "posts" });
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 25px;
  margin-bottom: 25px;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 1;
  box-shadow: 2px 4px 5px rgba(154, 147, 140, 0.5),
    1px 1px 5px rgba(255, 255, 255, 1);
  margin: -10px;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.2rem;
}

nav a.router-link-exact-active {
  color: #25a3ec;
}
router-link:hover {
  cursor: pointer;
}
nav > span {
  font-size: 1.3rem;
  cursor: pointer;
}
.logut {
  font-size: 1.2rem;
}

.photogram {
  color: #2c3e50;
  float: left;
}

.input__wrapper {
  float: right;
}

.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  width: 10px;
}

.input__file-button-text {
  padding: 10px;
}

.input__file-button {
  max-width: 115px;
  height: 30px;
  background: #2c3e50;
  color: #fff;
  font-size: 1.125rem;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;
  border-radius: 5px;
}

.input__file-button:hover {
  background-color: #25a3ec;
}
.white-block {
  width: 114px;
  height: 15px;
  background-color: #ffffff;
  margin: 0 auto;
  float: right;
}
</style>
