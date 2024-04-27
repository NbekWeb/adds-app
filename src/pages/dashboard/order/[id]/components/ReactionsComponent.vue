<script setup>
defineProps({
  reactions: Object
})
</script>

<template>
  <a-row :gutter="[5, 10]">
    <a-col v-for="reaction in reactions">
      <a-tag color="processing" :bordered="false">
        {{ reaction.emoji }}
        <span class="reaction">{{ reaction.count }}</span>
      </a-tag>
    </a-col>
  </a-row>
</template>

<style scoped lang="scss">
.reaction {
  //margin-left: 2px;
  color: black;
}
</style>
