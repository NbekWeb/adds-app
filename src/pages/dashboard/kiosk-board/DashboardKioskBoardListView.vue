<script setup>
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
</script>

<template>
  <page-header-component title="Kiosk board">
    <template #actions>
      <a-button type="primary" size="middle">
        {{ $t('ADD') }}
      </a-button>
    </template>
  </page-header-component>
</template>

<style scoped lang="scss"></style>
