<script setup>
import UserTableComponent from '@/pages/dashboard/user/components/UserTableComponent.vue'
import { onMounted, ref } from 'vue'
import useUser from '@/store/user.pinia.js'

const userPinia = useUser()
const users = ref([
  {
    id: 3,
    fullName: 'Adminjon',
    username: 'admin',
    role: 'ADMIN',
    balance: 0
  },
  {
    id: 4,
    fullName: 'Userjon',
    username: 'user1',
    role: 'USER',
    balance: 0
  },
  {
    id: 5,
    fullName: 'Adminjon',
    username: 'admin',
    role: 'ADMIN',
    balance: 0
  },
  {
    id: 6,
    fullName: 'Userjon',
    username: 'user1',
    role: 'USER',
    balance: 0
  }
])

onMounted(() => {
  userPinia.getAllUsers()
})
</script>

<template>
  <div class="page-header">
    <h3>{{ $t(`${$route.name}`) }}</h3>
    <a-button> Qo'shish </a-button>
  </div>
  <div class="main-data">
    <user-table-component :users="users" />
  </div>
</template>

<style scoped lang="scss">
.page-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
