<template>
  <div>
    <div class="searchUser-wrapper">
      <label>Search user </label>
      <input required v-model="searchResult" placeholder="Write username" />
      <p v-if="noResults">No results</p>
    </div>
    <div class="main-box">
      <div class="posts" v-for="(post, i) in searchUser" :key="post.id">
        <div class="header">
          <HeaderUser :post="post" />

          <template
            v-if="
              post.username == isLoggedInName || $store.state.role == 'admin'
            "
          >
            <span class="deletePost" @click="delPost(i, post.id)"> ╳</span>
          </template>
        </div>

        <div class="img-contain">
          <img class="postImage" :src="post.postImage" />
          <Like :postLike="post" />
        </div>

        <div class="content">
          <p class="caption">
            <span>{{ post.username }}</span> {{ post.caption }}
          </p>
        </div>

        <div class="newComment">
          <router-link :to="{ name: 'comments', params: { id: post.id } }">
            <ChangeComIcon />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Like from "../components/Like.vue";
import ChangeComIcon from "../components/ChangeComIcon.vue";
import HeaderUser from "../components/HeaderUser.vue";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  components: { Like, ChangeComIcon, HeaderUser },
  name: "Posts",
  data() {
    return {
      searchResult: "",
    };
  },
  computed: {
    searchUser() {
      return this.$store.state.posts.filter((el) => {
        return el.username.toLowerCase().includes(this.searchResult);
      });
    },
    noResults() {
      if (this.searchResult.length !== 0) return this.searchUser.length === 0;
    },
    isLoggedInName() {
      return this.$store.state.token.split(".")[3];
    },
  },
  created() {
    this.GET_POSTS_FROM_API();
  },
  methods: {
    ...mapActions(["GET_POSTS_FROM_API"]),
    splicePost(index) {
      this.$store.state.posts.splice(index, 1);
    },
    async delPost(index, id) {
      if (confirm("Do you really want to delete this post?")) {
        await axios.delete(`http://localhost:3000/posts/${id}`);
        this.splicePost(index);
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
.main-box {
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
}
.main-box > * {
  flex: 1 1 400px;
  margin: 10px;
}
.searchUser-wrapper {
  width: 100%;
  position: relative;
  margin-top: 30px;
}

.postImage {
  max-width: 100%;
  width: 400px;
  height: 300px;
}
.posts {
  padding: 10px 0;
  box-shadow: 0 14px 28px rgba(150, 150, 150, 0.25),
    0 10px 10px rgba(150, 150, 150, 0.25);
}

.likes {
  margin: 5px 0;
  margin-bottom: 5px !important;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.caption {
  font-size: 1rem;
}
span {
  font-weight: bold;
}

.header {
  border-bottom: 1px solid #fff;
  margin: 20px 20px;
}
img {
  border-radius: 49px;
}
.img-contain {
  width: 100%;
}

.content {
  margin: 15px 10px;
  max-width: 100%;
  height: 15px;
}

li {
  list-style: none;
}
input {
  font-family: "Playfair Display", serif;
  width: 280px;
  margin: 1px;
  padding: 8px 10px;
  outline: 0;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
}

input[type="text"]:focus {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

button {
  width: 140px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  border: none;
  padding: 10px 25px;
  background-color: #2c3e50;
  cursor: pointer;
  margin-bottom: 10px;
}
button:hover {
  background-color: #25a3ec;
}
.commentButton {
  margin: 20px;
}
.newComment {
  max-width: 100%;
}
.deletePost {
  color: rgb(146, 146, 146);
  font-size: 1rem;
  cursor: pointer;
  padding-right: 10px;
  float: right;
}
.deletePost:hover {
  color: rgb(0, 0, 0);
}
</style>