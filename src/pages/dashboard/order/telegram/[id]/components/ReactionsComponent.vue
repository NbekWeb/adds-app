<script setup>
defineProps({
  reactions: Object
})
</script>

<template>
  <template v-if="reactions?.length">
    <div class="statistics-reaction mb-3 pb-3">
      <h3>{{ $t('REACTIONS') }}</h3>

      <a-row :gutter="[5, 10]">
        <a-col v-for="(reaction, i) in reactions" :key="i">
          <a-tag color="processing" :bordered="false">
            {{ reaction.emoji }}
            <span class="reaction">{{ reaction.count }}</span>
          </a-tag>
        </a-col>
      </a-row>
    </div>
  </template>
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
