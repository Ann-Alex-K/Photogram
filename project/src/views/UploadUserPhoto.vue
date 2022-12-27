<template>
  <div class="edit">
    <label>Your e-mail</label>
    <div class="register">
      <input required v-model="newEmail" type="editor" placeholder="email" />
    </div>

    <label>Your avatar</label>

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
    <button v-on:click="editUser()">Submit</button>
    <br />
    <p v-show="step === 2">Please, add Image</p>
    <p v-show="step === 3">Please, add e-mail</p>
    <p v-show="step === 4">Please, add Image and e-mail</p>
   <!-- <p v-show="step === 5">You are update your profile</p>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "UploadUserPhoto",
  props: {
    userId: Number,
  },
  data() {
    return {
      user: null,
      imageData: null,
      newEmail: "",
      step: 1,
    };
  },
  computed: {
    ...mapGetters(["USERS"]),
  },
  watch: {
    $route: "getUser",
  },
  created() {
    this.GET_USERS_FROM_API();
  },
  methods: {
    ...mapActions(["GET_USERS_FROM_API"]),
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
    editUser() {
      if (this.imageData && this.newEmail) {
        this.user = this.USERS.find((user) => user.id === this.userId);
        this.submitFile();
        // this.step = 5;
        this.GET_USERS_FROM_API();
        this.$router.push({ name: "profile", params: { userId: this.userId } });
      } else if (this.imageData) {
        this.step = 3;
      } else if (this.newEmail) {
        this.step = 2;
      } else {
        this.step = 4;
      }
    },
    async submitFile() {
      axios.put(`http://localhost:3000/users/${this.userId}`, {
        ...this.user,
        userImage: this.imageData,
        email: this.newEmail,
      });
    },
  },
};
</script>

<style  scoped>
.image-input {
  display: block;
  width: 200px;
  height: 200px;
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
