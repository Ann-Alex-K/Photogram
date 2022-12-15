<template>
  <div>
    <div class="friend" v-for="user in filterFriendsList" :key="user.id">
      <router-link :to="{ name: 'profile', params: { userId: user.userId } }">
        <div class="main">
          <div class="photo">
            <img class="friendImage" :src="user.userImage" />
          </div>
          <div>
            <h3 class="name">{{ user.username }}</h3>
            <p class="email">{{ user.email }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Followers",
  data() {
    return {
      users: [],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token.split(".")[2];
    },
    filterFriendsList() {
      return this.$store.state.users.filter((el) => {
        return el.userId !== +this.isLoggedIn;
      });
    },
  },
  created() {
    this.GET_USERS_FROM_API();
  },
  methods: {
    ...mapActions(["GET_USERS_FROM_API"]),
  },
};
</script>

<style>
.friend {
  margin-bottom: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  border-bottom: 0.5px solid #ddd;
}
.friend .main {
  display: flex;
  width: 100%;
}
.photo {
  width: 80px;
  height: 80px;
  margin: 30px;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
.friendImage {
  width: 80px;
  height: 80px;
}
.name {
  float: left;
  padding-top: 25px;
}
</style>
