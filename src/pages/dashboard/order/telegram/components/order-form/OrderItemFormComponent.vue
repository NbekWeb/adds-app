<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { formatAmount } from '@/composables/index.js'
import useCore from '@/store/core.pinia.js'
import dayjs from 'dayjs'

import OrderBoardSelectComponent from '@/pages/dashboard/order/telegram/components/order-form/OrderBoardSelectComponent.vue'
import OrderConfigurationSelectComponent from '@/pages/dashboard/order/telegram/components/order-form/OrderConfigurationSelectComponent.vue'
import OrderTimeConfigSelectComponent from '@/pages/dashboard/order/telegram/components/order-form/OrderTimeConfigSelectComponent.vue'
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

const steps = ref([
  {
    title: t('SELECT_CHANNEL')
  },
  {
    title: t('SELECT_CONFIGURATION')
  },
  {
    title: t('SELECT_DATE_AND_TIME')
  }
])
const currentStep = ref(0)

const configurations = ref([])

const form = reactive({
  board: null,
  configuration: null,
  timeConfiguration: null,
  orderDate: dayjs()
})
const isAccessNext = computed(
  () =>
    (!form.board && currentStep.value === 0) ||
    (!form.configuration && currentStep.value === 1) ||
    (!form.timeConfiguration && currentStep.value === 2)
)

const selectedConfigAmount = ref(0)
const selectedTimeConfigAmount = ref(0)

function handleNextStep() {
  if (!isAccessNext.value && currentStep.value < 2) {
    currentStep.value++
  } else if (form.board && form.configuration && form.timeConfiguration) {
    emits('addOrder', form)
  }
}
function handleBackStep() {
  if (currentStep.value === 2) {
    form.timeConfiguration = null
    selectedTimeConfigAmount.value = 0
  } else if (currentStep.value === 1) {
    form.configuration = null
    selectedConfigAmount.value = 0
  } else if (currentStep.value === 0) {
    form.board = null
    emits('cancel')
  }
  if (currentStep.value > 0) currentStep.value--
}
</script>

<template>
  <a-spin
    :spinning="
      loadingUrl.has('board/all') ||
      loadingUrl.has('board/time-configurations') ||
      loadingUrl.has('board/configurations')
    "
  >
    <template #indicator>
      <icon-loader />
    </template>
    <div style="height: calc(100vh - 180px)" class="flex flex-column">
      <a-steps :items="steps" :current="currentStep"> </a-steps>

      <template v-if="currentStep === 0">
        <order-board-select-component
          v-model:value="form.board"
          :selected-boards="selectedBoards"
        />
      </template>
      <template v-if="currentStep === 1">
        <order-configuration-select-component
          v-model:value="form.configuration"
          v-model:amount="selectedConfigAmount"
          :board-id="form.board.id"
        />
      </template>
      <template v-if="currentStep === 2">
        <order-time-config-select-component
          v-model:value="form.timeConfiguration"
          v-model:date="form.orderDate"
          v-model:amount="selectedTimeConfigAmount"
          :board-id="form.board.id"
          :configuration-id="form?.configuration?.id"
        />
      </template>
      <div>
        <div class="flex justify-end">
          <h3>
            {{ $t('TOTAL') }}:
            {{ formatAmount(selectedConfigAmount + selectedTimeConfigAmount) }}
            <span>UZS</span>
          </h3>
        </div>
        <div class="flex justify-between">
          <a-button @click="router.back()"> {{ $t('CANCEL') }} </a-button>
          <a-space>
            <a-button @click="handleBackStep">
              {{ $t('BACK') }}
            </a-button>
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
      </div>
    </div>
  </a-spin>
</template>
<style></style>
