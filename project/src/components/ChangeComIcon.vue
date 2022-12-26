<template>
  <div>
    <div class="change-icons">
      <div class="change-icon">
        <img class="commentIcon" src="@/assets/comment-white-ovalpng.png" />
      </div>
      <div class="change-icon">
        <img class="commentIcon" src="@/assets/comment-black-oval.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeComIcon",
};
</script>

<style scoped>
.commentIcon {
  width: 24px;
  height: 24px;
  display: flex;
  cursor: pointer;
  float: right;
  margin-right: 35px;
  padding-bottom: 13px;
  padding-top: 5px;
}
.change-icons {
  margin-left: 10px;
  padding-top: 4px;
}
.change-icons .change-icon img {
  object-fit: cover;
}
.change-icons .change-icon:nth-of-type(2) {
  display: none;
}
.change-icons:hover .change-icon:nth-of-type(1) {
  display: none;
}
.change-icons:hover .change-icon:nth-of-type(2) {
  display: block;
}
.change-icons:hover {
  cursor: pointer;
}
</style>