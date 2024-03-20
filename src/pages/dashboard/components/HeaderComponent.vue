<script setup>
import { ref } from 'vue'
import useUser from '@/store/user.pinia.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import useCore from '@/store/core.pinia.js'

const router = useRouter()
const userPinia = useUser()
const corePinia = useCore()
const { user } = storeToRefs(userPinia)
const account = ref('ads')
const changeAccountRole = (role) => {
  account.value = role
  userPinia.changeRole(role)
  router.push({
    params: {
      role: role
    }
  })
}
</script>

<template>
  <a-row :gutter="16" justify="end" align="middle">
    <a-col>
      <h2 class="m-0">
        <template v-if="account === 'ads'">
          Siz, <b>E'lon beruvchi rejimidasiz</b>
        </template>
        <template v-else> Siz, <b> E'lon oluvchi rejimidasiz</b> </template>
      </h2>
    </a-col>
    <a-col class="ml-auto">
      <div class="header-switch">
        <div
          @click="changeAccountRole('ads')"
          class="switch-item"
          :class="account === 'ads' && 'active'"
        >
          <a-tooltip title="E'lon beruvchi rejimiga o'tish"> 🎉 </a-tooltip>
        </div>
        <div
          @click="changeAccountRole('owner')"
          class="switch-item"
          :class="account === 'owner' && 'active'"
        >
          <a-tooltip title="E'lon oluvchi rejimiga o'tish"> 😎 </a-tooltip>
        </div>
      </div>
    </a-col>
    <a-col>
      <div>
        <b>ID: {{ user?.id }}</b>
      </div>
      <p class="m-0 small text-muted">Balans: {{ user?.balance }} so'm</p>
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
