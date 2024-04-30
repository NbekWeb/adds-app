<script setup>
defineProps({
  reactions: Object
})
</script>

<template>
  <div class="statistics-reaction my-3 pb-3">
    <h2>Reaksiyalar</h2>

    <a-row :gutter="[5, 10]">
      <a-col v-for="reaction in reactions">
        <a-tag color="processing" :bordered="false">
          {{ reaction.emoji }}
          <span class="reaction">{{ reaction.count }}</span>
        </a-tag>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.reaction {
  //margin-left: 2px;
  color: black;
}
.statistics-reaction {
  border-bottom: 1px dashed $muted;
}
</style>
