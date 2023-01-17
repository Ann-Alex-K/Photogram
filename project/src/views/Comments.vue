<template>
  <div class="main-box-post">
    <div class="header">
      <HeaderUser :post="post" />
      <p class="caption">
        <span>{{ post.username }}</span> {{ post.caption }}
      </p>
    </div>

    <div class="img-box">
      <img class="postImg" :src="post.postImage" />
      <Like
        v-if="post.likes || post.likes == 0"
        :postLike="this.post"
        :count="0"
      />
      <template v-if="this.$store.state.token">
        <form>
          <div>
            <li>
              <form>
                <p><b>Write a comment:</b></p>
                <p>
                  <input
                    required
                    id="comment-input"
                    type="text"
                    v-model="newComment"
                    placeholder="Comment..."
                  />
                </p>
                <button type="button" @click="addCom">Add comment</button>
              </form>
            </li>
          </div>
        </form>
      </template>
    </div>

    <div>
      <ul>
        <li v-for="(comment, i) in comments" :key="i">
          <Comment
            :comment="comment"
            :user="user"
            :id="comment.id"
            @deleteCom="spliceCom(i)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Like from "../components/Like.vue";
import Comment from "../components/Comment.vue";
import HeaderUser from "../components/HeaderUser.vue";

export default {
  components: { Like, Comment, HeaderUser },
  name: "Comments",
  props: {
    id: Number,
  },
  data() {
    return {
      post: {},
      newComment: "",
      user: {},
      comments: [],
    };
  },

  created() {
    this.fetchPost();
    this.fetchUser();
    this.fetchComments();
  },
  methods: {
    async fetchPost() {
      const response = await fetch(`http://localhost:3000/posts/` + this.id);
      this.post = await response.json();
    },
    async fetchUser() {
      const response = await fetch(
        "http://localhost:3000/users/" + this.$store.state.token.split(".")[2]
      );
      this.user = await response.json();
    },
    async fetchComments() {
      const response = await fetch(
        `http://localhost:3000/comments?postId=${this.id}`
      );
      this.comments = await response.json();
    },
    async addCom() {
      let username = this.user.username;
      let comment = {
        postId: this.id,
        author: username,
        text: this.newComment,
      };
      if (this.newComment.length > 0) {
        const response = await fetch("http://localhost:3000/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        });
        this.fetchComments();
        let result = await response.json();
        this.newComment = "";
      } else {
        document.getElementById('comment-input').placeholder='Add some text';
      }
    },
    spliceCom(index) {
      this.comments.splice(index, 1);
    },
  },
};
</script>



<style scored>
.postImg {
  max-width: 600px;
  height: 400px;
  flex-grow: 2;
}
.main-box-post {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
  padding-top: 40px;
  justify-content: center;
  box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5),
    1px 1px 5px rgba(255, 255, 255, 1);
}
.main-box-post > * {
  margin: 10px;
}
.img-box {
  width: 40%;
}
.header {
  flex-basis: 300px;
  margin-top: 40px;
}
ul {
  padding: 0px;
}
li {
  margin-bottom: -30px;
}
</style> 