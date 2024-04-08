<script setup>
import { storeToRefs } from 'pinia'
import useUser from '@/store/user.pinia.js'

const userPinia = useUser()
const { user } = storeToRefs(userPinia)
function navigateToClient() {
  window.location.replace('https://admin.adspro.uz')
}
</script>

<template>
  <a-row :gutter="16" justify="end" align="middle">
    <a-col class="ml-auto">
      <a-button @click="navigateToClient" type="primary">
        {{ $t('ADD_BOARD') }}
      </a-button>
    </a-col>
    <a-col>
      <div>
        <b>ID: {{ user?.id }}</b>
      </div>
      <p class="m-0 small text-muted">
        {{ $t('BALANCE') }}: {{ user?.balance }} {{ $t('SOUM') }}
      </p>
    </a-col>
  </a-row>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.header-switch {
  display: flex;
  padding: 0.3rem;
  border-radius: 4px;
  font-size: 25px;
  background-color: #fff;
  width: 100px;
  box-shadow: inset 0 0 10px rgba($muted, 0.1);
  border: 1px solid rgba($muted, 0.2);
  .switch-item {
    border-radius: 4px;
    padding: 0.5rem;
    width: 50%;
    text-align: center;
    cursor: pointer;
    &.active {
      background-color: rgba($primary, 0.1);
    }
  }
}
</style>
