<template>
  <div>
    <div v-show="step === 1">
      <h1 class="register">Sign up</h1>
      <form @submit.prevent="register">
        <label for="name">Name</label>
        <div class="register">
          <input
            id="username"
            type="text"
            v-model="username"
            required
            autofocus
          />
        </div>
        <label for="email">E-Mail Address</label>
        <div class="register">
          <input id="email" type="email" v-model="email" required />
        </div>
        <label for="password">Password</label>
        <div class="register">
          <input id="password" type="password" v-model="password" required />
        </div>
        <label for="password-confirm">Confirm Password</label>
        <div class="register">
          <input
            id="password-confirm"
            type="password"
            v-model="password_confirmation"
            required
          />
        </div>
        <div class="register">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>

    <div v-show="step === 2">
      <h1>You are registered!</h1>
      <div>
        <p>Your login details</p>
        <p>email: {{ this.email }}</p>
        <p>password: {{ this.password }}</p>
      </div>
      <img
        src="https://i.pinimg.com/originals/e7/91/ca/e791cae0a4268dbb79045289be8388b1.gif"
      />
    </div>

    <div v-show="step === 3">
      <h1>You are already registered</h1>
      <p>Your login details</p>
      <p>email: {{ this.checkUser.email }}</p>
      <p>password: {{ this.checkUser.password }}</p>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      step: 1,
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      checkUser: {},
    };
  },
  computed: {
    ...mapGetters(["USERS"]),
  },
  mounted() {
    this.GET_USERS_FROM_API();
  },
  methods: {
    ...mapActions(["GET_USERS_FROM_API", "ADD_NEW_USER"]),
    register() {
      const checkUser = this.USERS.find((user) => user.email == this.email);
      if (!checkUser) {
        this.step = 2;
        this.ADD_NEW_USER({ 
          id: this.USERS.length,
          username: this.username,
          userId: this.USERS.length,
          password: this.password,
          email: this.email,
          role: "user",
          userImage: "https://abrakadabra.fun/uploads/posts/2021-12/thumbs/1640528667_5-abrakadabra-fun-p-serii-chelovek-na-avu-6.jpg",
        });
      } else {
        this.checkUser = checkUser;
        this.step = 3;
      }
    },
  },
};
</script>


<style>
form {
  padding: 20px;
}
div.register {
  padding: 20px;
}
h1.register {
  margin-top: 50px;
}
</style>

