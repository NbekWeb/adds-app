<script setup>
const props = defineProps({
  views: Number
})
</script>

<template>
  <template v-if="views">
    <div class="views flex justify-between">
      <h3>{{ $t('VIEWS') }}</h3>
      <p class="m-0">
        {{ views > 1000 ? `${Math.floor(views / 1000)}k` : views }}
      </p>
    </div>
  </template>
</template>

<style scoped lang="scss"></style>
