<script setup>
import IconUser from '@/components/icons/IconUser.vue'
import useUser from '@/store/user.pinia.js'
import { storeToRefs } from 'pinia'
import { onMounted, reactive } from 'vue'
import PhoneNumberInputComponent from '@/components/PhoneNumberInputComponent.vue'
import { useRouter } from 'vue-router'
import IconLoader from '@/components/icons/IconLoader.vue'

const router = useRouter()
const userPinia = useUser()
const { user, loading } = storeToRefs(userPinia)

const reg = new RegExp(`^([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{${2}})`)
const form = reactive({
  username: null,
  firstName: null,
  lastName: null
})
const updateUser = () => {
  userPinia.updateUser(form)
}
onMounted(() => {
  if (user.value.username && user.value.firstName && user.value.lastName) {
    form.username = user.value.username
    form.firstName = user.value.firstName
    form.lastName = user.value.lastName
  }
})
</script>

<template>
  <div class="main">
    <div>
      <div class="mb-xl-5">
        <div class="account-info">
          <a-avatar :size="64">
            <template #icon>
              <icon-user />
            </template>
          </a-avatar>
          <div class="user-info">
            <h1 class="user-full-name">
              {{ user.firstName }} {{ user.lastName }}
            </h1>
            <p class="user-phone-number">
              +998 {{ user.username?.replace(reg, '$1 $2-$3-$4') }}
            </p>
          </div>
        </div>
      </div>
      <a-form layout="vertical">
        <a-row :gutter="10">
          <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
            <a-form-item :label="$t('FIRST_NAME')">
              <a-input v-model:value="form.firstName" size="large" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
            <a-form-item :label="$t('LAST_NAME')">
              <a-input v-model:value="form.lastName" size="large" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
            <a-form-item :label="$t('PHONE_NUMBER')">
              <phone-number-input-component v-model:value="form.username" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="button-group">
      <a-space>
        <a-button @click="router.back()" size="large">
          {{ $t('BACK') }}
        </a-button>
        <a-button
          @click="updateUser"
          size="large"
          type="primary"
          :loading="loading"
        >
          {{ $t('SAVE') }}
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 162px);
  .account-info {
    display: flex;
    align-items: center;
    gap: 10px;
    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      h1 {
        font-size: 18px;
        font-weight: 700;
        margin: 0;
      }
      p {
        margin: 0;
        color: rgb($muted, 0.7);
      }
    }
  }
  .button-group {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
