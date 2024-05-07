<script setup>
import IconPlus from '@/components/icons/IconPlus.vue'
import { formatAmount } from '../../../composables/index.js'
import useUser from '@/store/user.pinia.js'
import { storeToRefs } from 'pinia'

const userPinia = useUser()

const { user } = storeToRefs(userPinia)
</script>

<template>
  <div class="balance-container flex justify-between align-center p-2">
    <div class="flex flex-column py-1">
      <span class="your-balance text-muted">{{ $t('YOUR_BALANCE') }}</span>
      <span class="balance-number text-600">
        {{ formatAmount(user?.balance) }} {{ $t('SOUM') }}
      </span>
    </div>
    <a-button class="btn balance-btn">
      <template #icon>
        <IconPlus />
      </template>
    </a-button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.balance-container {
  min-width: 150px;
  height: 42px;
  border-radius: 4px;
  background-color: rgb($muted, 0.1);
  .balance {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: $white;
    //.balance-icon {
    //  //height: 11px !important;
    //}
  }

  .your-balance {
    font-size: 10px;
    line-height: 14px;
  }
  .balance-number {
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
