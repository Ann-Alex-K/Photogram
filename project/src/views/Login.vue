<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>

      <label>Email</label>
      <div class="register">
        <input required v-model="email" type="email" placeholder="email" />
      </div>
      <label>Password</label>
      <div class="register">
        <input
          required
          v-model="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <div class="register">
        <button type="submit">Login</button>
      </div>
    </form>
    <span v-show="step === 2">Invalid password</span>
    <span v-show="step === 3">You are not registered</span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      role: "",
      password: "",
      token: "",
      step: 1,
    };
  },
  computed: {
    ...mapGetters(["USERS"]),
  },
  created() {
    this.GET_USERS_FROM_API();
  },
  methods: {
    ...mapActions(["GET_TOKEN", "GET_ROLE", "GET_USERS_FROM_API"]),
    login() {
      for (let user of this.USERS) {
        if (user.email == this.email && user.password == this.password) {
          this.role = user.role;
          this.token = `jwt-token.${user.role}.${user.userId}.${user.username}`;
          this.saveToken();
          this.saveRole();
          this.GET_TOKEN();
          this.GET_ROLE();
          this.$router.push({ name: "posts" });
        } else if (user.email == this.email) {
          this.step = 2;
        } else {
          this.step = 3;
        }
      }
    },
    saveToken() {
      localStorage.setItem("token", this.token);
    },
    saveRole() {
      localStorage.setItem("role", this.role);
    },
  },
};
</script>