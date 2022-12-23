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
    <span v-show="step === 2">You are not registered</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "hello@io",
      role: "",
      password: "123",
      users: [],
      token: "",
      step: 1,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions(["GET_TOKEN", "GET_ROLE"]),
    async fetchUsers() {
      const response = await fetch("http://localhost:3000/users/");
      this.users = await response.json();
    },
    login() {
      for (let user of this.users) {
        if (user.email == this.email && user.password == this.password) {
          this.role = user.role;
          this.token = `jwt-token.${user.role}.${user.userId}.${user.username}`;
          this.saveToken();
          this.saveRole();
          this.GET_TOKEN();
          this.GET_ROLE();
          this.$router.push({ name: "posts" });
        } else {
          this.step = 2;
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