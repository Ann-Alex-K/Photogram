<template>
  <div>
    <div class="likes">
      <div @click="like()">
        <span v-if="!postLike.hasBeenLiked">🤍 {{ +count }} likes </span>
        <span v-else> 💙 {{ +count }} likes </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Like",
  props: {
    postLike: {
  type: Object,
}
  },
  created() {
    this.countLike();
  },
  methods: {
    countLike() {
      return (this.count = +this.postLike.likes);
    },
    like() {
      this.postLike.hasBeenLiked = !this.postLike.hasBeenLiked;

      if (this.postLike.hasBeenLiked === true) {
        this.count++;
        axios.put(`http://localhost:3000/posts/${this.postLike.id}`, {
          ...this.postLike,
          likes: this.count,
          hasBeenLiked: true,
        });
      } else if (this.postLike.hasBeenLiked === false) {
        this.count--;
        axios.put(`http://localhost:3000/posts/${this.postLike.id}`, {
          ...this.postLike,
          likes: this.count,
          hasBeenLiked: false,
        });
      }
    },
  },
};
</script>