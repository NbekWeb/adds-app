<script setup>
import IconPlus from '@/components/icons/IconPlus.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="page-header">
    <h1 class="title">Kanallar</h1>
    <a-button
      class="btn-add"
      @click="router.push(`/dashboard/board/add`)"
      size="middle"
      type="primary"
    >
      <icon-plus />
      <span>
        {{ $t('ADD') }}
      </span>
    </a-button>
  </div>
</template>

<style scoped lang="scss">
.page-header {
  h1 {
    margin: auto 0;
  }
}
.btn-add {
  display: flex;
  align-items: center;
}
</style>
