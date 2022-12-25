<template>
  <div>
    <header>
      <div class="container">
        <div class="profile">
          <div class="profile-image">
            <img class="profileImg" :src="user.userImage" />
          </div>

          <div class="profile-user-settings">
            <h1 class="profile-user-name">{{ user.username }}</h1>
            <template v-if="isLoggedIn == this.$route.params.userId">
              <router-link
                :to="{ name: 'uploadUserImg', params: { userId: userId } }"
              >
                <button class="btn profile-edit-btn">Edit Profile</button>
              </router-link>
            </template>
          </div>

          <div class="profile-stats">
            <ul>
              <li>
                <span class="profile-stat-count">{{ posts.length }}</span>
                posts
              </li>
              <template v-if="isLoggedIn == this.$route.params.userId">
                <router-link :to="{ name: 'followers' }">
                  <li>
                    <span class="profile-stat-count">{{
                      this.$store.state.users.length
                    }}</span>
                    followers
                  </li>
                </router-link>
              </template>
              <template v-else>
                <li><span class="profile-stat-count">142</span> followers</li>
              </template>

              <li><span class="profile-stat-count">84</span> following</li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <main class="container">
      <div v-for="post in posts" :key="post.postId">
        <template
          v-if="post.username == isLoggedInName || $store.state.role == 'admin'"
        >
          <span class="deletePost" @click="delPost(i, post.id)"> ╳</span>
        </template>
        <div class="img-contain">
          <img class="postImg" :src="post.postImage" />
          <Like :postLike="post" />
        </div>
        <div class="newComment">
          <router-link :to="{ name: 'comments', params: { id: post.id } }">
            <button>Comment</button>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Like from "../components/Like.vue";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  components: { Like },
  name: "UserProfile",
  props: {
    userId: Number,
  },
  data() {
    return {
      user: this.getUser() || null,
      posts: [],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token.split(".")[2];
    },
    isLoggedInName() {
      return this.$store.state.token.split(".")[3];
    },
  },
  created() {
    this.getUser();
    this.getUserPosts();
    this.GET_USERS_FROM_API();
  },
  watch: {
    $route() {
      this.getUser(this.user);
      this.getUserPosts(this.posts);
    //  this.GET_USERS_FROM_API(this.$store.state.users);
    },
  },
  methods: {
    ...mapActions(["GET_USERS_FROM_API"]),
    async getUser() {
      const response = await axios.get(
        "http://localhost:3000/users/" + this.userId
      );
      this.user = response.data;
    },
    async getUserPosts() {
      const response = await axios.get(
        `http://localhost:3000/posts?userId=${this.userId}`
      );
      this.posts = response.data;
    },
    splicePost(index) {
      const delReversPost = [...this.posts].reverse();
      delReversPost.splice(index, 1);
      this.posts = delReversPost.reverse();
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
*,
*::before,
*::after {
  box-sizing: border-box;
}

.postImg {
  max-width: 100%;
}

.container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.container > * {
  flex: 1 1 400px;
  margin: 10px;
}

.profileImg {
  width: 300px;
  max-width: 100%;
  height: 300px;
  border-radius: 150px;
}
.profile-image {
  overflow: hidden;
  width: 300px;
}

.btn {
  display: inline-block;
  font: inherit;
  background: none;
  border: none;
  color: inherit;
  padding: 0;
  cursor: pointer;
}

.btn:focus {
  outline: 0.5rem auto #4d90fe;
}

.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

.profile {
  padding: 5rem 0;
}

.profile::after {
  content: "";
}

.profile-user-settings,
.profile-stats {
  float: left;
  width: calc(66.666% - 2rem);
}

.profile-user-settings {
  margin-top: 1.1rem;
}

.profile-user-name {
  display: inline-block;
  font-size: 3.2rem;
  font-weight: 300;
}

.profile-edit-btn {
  font-size: 1.4rem;
  line-height: 1.8;
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.3rem;
  margin-left: 2rem;
}

.profile-settings-btn {
  font-size: 2rem;
  margin-left: 1rem;
}

.profile-stats {
  margin-top: 2.3rem;
}

.profile-stats li {
  display: inline-block;
  font-size: 1.6rem;
  line-height: 1.5;
  margin-right: 4rem;
  cursor: pointer;
}

.profile-real-name,
.profile-stat-count,
.profile-edit-btn {
  font-weight: 600;
}

@media screen and (max-width: 40rem) {
  .profile {
    display: flex;
    flex-wrap: wrap;
    padding: 4rem 0;
  }

  .profile-image,
  .profile-user-settings,
  .profile-bio,
  .profile-stats {
    float: none;
    width: auto;
  }

  .profile-user-settings {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  .profile-user-name {
    font-size: 2.2rem;
  }

  .profile-edit-btn {
    order: 1;
    padding: 0;
    text-align: center;
    margin-top: 1rem;
  }

  .profile-edit-btn {
    margin-left: 0;
  }

  .profile-edit-btn,
  .profile-bio,
  .profile-stats {
    flex-basis: 100%;
  }

  .profile-stats {
    order: 1;
    margin-top: 1.5rem;
  }

  .profile-stats ul {
    display: flex;
    text-align: center;
    padding: 1.2rem 0;
    border-top: 0.1rem solid #dadada;
    border-bottom: 0.1rem solid #dadada;
  }

  .profile-stats li {
    font-size: 1.4rem;
    flex: 1;
    margin: 0;
  }

  .profile-stat-count {
    display: block;
  }
}

@supports (display: grid) {
  .profile {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: repeat(3, auto);
    grid-column-gap: 3rem;
    align-items: center;
  }

  .profile-image {
    grid-row: 1 / -1;
  }

  .profile-image,
  .profile-user-settings,
  .profile-stats,
  .profile-bio,
  .gallery-item,
  .gallery {
    width: auto;
    margin: 0;
  }

  @media (max-width: 40rem) {
    .profile {
      grid-template-columns: auto 1fr;
      grid-row-gap: 1.5rem;
    }

    .profile-image {
      grid-row: 1 / 2;
    }

    .profile-user-settings {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 1rem;
    }

    .profile-edit-btn,
    .profile-stats {
      grid-column: 1 / -1;
    }

    .profile-user-settings,
    .profile-edit-btn,
    .profile-settings-btn,
    .profile-stats {
      margin: 0;
    }
  }
}
</style>