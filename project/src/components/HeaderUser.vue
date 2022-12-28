<template>

    <router-link :to="{ name: 'profile', params: { userId: post.userId } }">
      <img class="userImage" :src="post.userImage" />
      <span class="username"> {{ post.username }}</span>
    </router-link>

</template>

<script>
export default {
  name: "HeaderUser",
  props: {
    post: Object,
  },
};
</script>

<style>
.userImage {
  width: 60px;
  height: 60px;
  border-radius: 30px;
}

.username {
  top: -20px;
  position: relative;
  padding-left: 5px;
  font-size: 1rem;
  font-weight: bold;
  padding-top: 30px;
}
</style>