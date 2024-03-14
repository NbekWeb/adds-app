<script setup>
import IconUser from '@/components/icons/IconUser.vue'
import useUser from '@/store/user.pinia.js'
import { storeToRefs } from 'pinia'
import { onMounted, reactive } from 'vue'
import PhoneNumberInputComponent from '@/components/PhoneNumberInputComponent.vue'
import { useRouter } from 'vue-router'
import IconLoader from '@/components/icons/IconLoader.vue'
import useCore from '@/store/core.pinia.js'

const router = useRouter()
const userPinia = useUser()
const corePinia = useCore()
const { loadingUrl } = storeToRefs(corePinia)
const { user } = storeToRefs(userPinia)

const reg = new RegExp(`^([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{${2}})`)
const form = reactive({
  username: null,
  fullName: null
})
const updateUser = () => {
  userPinia.updateUser(form)
}
onMounted(() => {
  form.username = user.value.username
  form.fullName = user.value.fullName
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
              {{ user.fullName }}
            </h1>
            <p class="user-phone-number">
              +998
              {{
                user.username ? user.username.replace(reg, '$1 $2-$3-$4') : ''
              }}
            </p>
          </div>
        </div>
      </div>
      <a-form layout="vertical">
        <a-row :gutter="10">
          <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <a-form-item :label="$t('F_I_O')">
              <a-input
                v-model:value="form.fullName"
                :placeholder="$t('ENTER_YOUR_FULL_NAME')"
                size="large"
              />
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <a-form-item :label="$t('PHONE_NUMBER')">
              <phone-number-input-component
                v-model:value="form.username"
                size="large"
              />
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
          class="btn-save"
          size="large"
          type="primary"
          :disabled="loadingUrl.has('user/update')"
        >
          <template v-if="loadingUrl.has('user/update')">
            <icon-loader size="small" class="loader" />
          </template>
          <template v-else>
            {{ $t('SAVE') }}
          </template>
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
    .loader {
      border-color: $primary !important;
    }
    .btn-save {
      min-width: 90px;
    }
    .btn-check-channel {
      min-width: 155px;
    }
    .btn-save {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        border-color: white;
      }
    }
  }
}
</style>
