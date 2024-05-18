<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import dayjs from 'dayjs'

import OrderBoardSelectComponent from '@/pages/dashboard/order/kiosk-order/components/order-form/OrderBoardSelectComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['addOrder', 'cancel'])
const {} = defineProps({
  selectedBoards: Array
})
const { t } = useI18n()
const router = useRouter()
const corePinia = useCore()

const { loadingUrl } = storeToRefs(corePinia)

const currentStep = ref(0)

const configurations = ref([])

const form = reactive({
  board: null,
  configuration: null,
  timeConfiguration: null,
  orderDate: dayjs(),
  orderSeconds: null
})
const isAccessNext = computed(
  () =>
    (!form.board && currentStep.value === 0) ||
    (!form.timeConfiguration && currentStep.value === 1)
)

function handleNextStep() {
  if (form.board) {
    emits('addOrder', form)
  }
}
</script>

<template>
  <a-spin :spinning="loadingUrl.has('kiosk-board/all')">
    <template #indicator>
      <icon-loader />
    </template>
    <order-board-select-component
      v-model:value="form.board"
      :selected-boards="selectedBoards"
    />
  </a-spin>

  <div class="flex justify-between">
    <a-button @click="router.back()"> {{ $t('CANCEL') }} </a-button>
    <a-space>
      <a-button
        @click="handleNextStep"
        :disabled="isAccessNext"
        type="primary"
        size="middle"
      >
        {{ $t('CONTINUE') }}
      </a-button>
    </a-space>
  </div>
</template>

<style scoped lang="scss"></style>
