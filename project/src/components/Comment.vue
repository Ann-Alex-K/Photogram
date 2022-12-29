<template>
  <div>
    <div class="comment-list-wrapper">
      <p v-if="!edit">
        <span>{{ comment.author }}</span> {{ comment.text }}
        <template
          v-if="user.username == comment.author || $store.state.role == 'admin'"
        >
          <div>
            <span class="change-com-button" @click="editCom()">change</span>
            <span class="change-com-button" @click="delCom(id)"> delete</span>
          </div>
        </template>
      </p>

      <p v-else>
        <span>{{ comment.author }}</span> <input v-model="comment.text" />
        <template
          v-if="user.username == comment.author || $store.state.role == 'admin'"
        >
          <div>
            <span class="change-com-button" @click="editCom(), saveCom(id)"
              >save</span
            >
          </div>
        </template>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      newComment: "",
      edit: false,
    };
  },
  props: {
    comment: Object,
    user: Object,
    id: Number,
  },
  methods: {
    editCom() {
      this.edit = !this.edit;
    },
    async saveCom(id) {
      let username = this.user.username;
      let text = this.comment.text;
      let postId = this.comment.postId;
      let comment = {
        id: this.id,
        postId: postId,
        author: username,
        text: text,
      };
      const response = await fetch(`http://localhost:3000/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      let result = await response.json();
      console.log(result);
    },
    delCom(id) {
      this.updateCom(id);
      this.$emit("deleteCom");
    },
    async updateCom(id) {
      const response = await fetch(`http://localhost:3000/comments/${id}`, {
        method: "DELETE",
      });
      let result = await response.json();
      console.log(result);
    },
  },
};
</script>


<style>
.comment-list-wrapper {
  margin-top: 40px;
  flex-basis: 300px;
}
.change-com-button {
  color: rgb(194, 192, 192);
  font-size: 0.8rem;
  cursor: pointer;
  padding-left: 10px;
}
.change-com-button:hover {
  color: rgb(31, 22, 83);
}
</style> 