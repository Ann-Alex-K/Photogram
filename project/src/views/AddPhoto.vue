<template>
  <div class="edit">
    <label>A few words about...</label>
    <div class="register">
      <input required v-model="caption" type="text" placeholder="Caption" />
    </div>

    <label>Your post</label>

    <div
      class="image-input"
      :style="{ 'background-image': `url(${imageData})` }"
      @click="chooseImage"
    >
      <span v-if="!imageData" class="placeholder"> Choose an Image </span>
      <input
        class="file-input"
        ref="fileInput"
        type="file"
        @input="onSelectFile"
      />
    </div>
    <button v-on:click="pushPost()">Submit</button>
    <br />
    <p v-show="step === 2">Please, add Image</p>
    <p v-show="step === 3">Please, add caption</p>
    <p v-show="step === 4">Please, add Image and caption</p>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddPhoto",
  props: {
    userId: Number,
  },
  data() {
    return {
      user: null,
      imageData: null,
      caption: "",
      step: 1,
      post: {}
    };
  },

  created() {
    this.GET_POSTS_FROM_API();
    this.GET_USERS_FROM_API();
  },
  computed: {
    ...mapGetters(["USERS"]),
  },
  methods: {
      ...mapActions(["GET_POSTS_FROM_API", "GET_USERS_FROM_API", "ADD_NEW_POST"]),
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    pushPost() {
      if (this.imageData && this.caption) {
        this.user = this.USERS.find((user) => user.id === this.userId);
        this.submitFile();
        this.GET_POSTS_FROM_API();
        this.$router.push({ name: "posts" });
      } else if (this.imageData) {
        this.step = 3;
      } else if (this.caption) {
        this.step = 2;
      } else {
        this.step = 4;
      }
    },
    
    async submitFile(post) {
      post = {
        username: this.user.username,
        userImage: this.user.userImage,
        userId: this.user.userId,
        role: this.user.role,
        postImage: this.imageData,
        caption: this.caption,
        likes: 0,
        hasBeenLiked: false,
      };
      this.ADD_NEW_POST(post);
    },
  },
};
</script>

<style  scoped>
.image-input {
  display: block;
  max-width: 500px;
  height: 400px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  margin: auto;
  margin-bottom: 25px;
  margin-top: 20px;
}

.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
}

.placeholder:hover {
  background: #e0e0e0;
}

.file-input {
  display: none;
}

.edit {
  margin-top: 70px;
}
label {
  font-size: 1.5rem;
}
</style>
