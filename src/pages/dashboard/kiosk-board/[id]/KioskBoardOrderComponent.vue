<script setup>
import {onMounted} from "vue";
import usePost from "@/store/post.pinia.js";
import {storeToRefs} from "pinia";

const storePost = usePost()

const { posts } = storeToRefs(storePost)

onMounted(() => {
  storePost.getAllKioskPosts(0)
})
</script>

<template>
  <div>
    {{ posts }}
  </div>
</template>


<style lang="scss" scoped>

</style>