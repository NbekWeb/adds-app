<script setup>
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { Form } from 'ant-design-vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import useCore from '@/store/core.pinia.js'
import useBoardConfiguration from '@/store/board-configuration.pinia.js'
import MoneyInputComponent from '@/components/MoneyInputComponent.vue'

const { t } = useI18n()
const useForm = Form.useForm
const boardConfigurationPinia = useBoardConfiguration()
const corePinia = useCore()

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  location: {
    type: String,
    required: true
  }
})

const { loadingUrl, visibleDrower } = storeToRefs(corePinia)
const { boardConfigurationList } = storeToRefs(boardConfigurationPinia)
const form = reactive({
  name: null,
  liveTime: null,
  topTime: null,
  pinTime: null,
  amount: '100000'
})
const rule = ref([
  {
    validator: (rule, value) => {
      if (value <= 0) {
        return Promise.reject(t('VALUE_MUST_BE_GREATER_THEN_ZERO'))
      } else {
        return Promise.resolve()
      }
    },
    trigger: 'blur'
  }
])
const rules = ref({
  name: [
    {
      required: true,
      message: t('REQUIRED_FIELD'),
      trigger: 'blur'
    }
  ],
  liveTime: rule.value,
  topTime: rule.value,
  pinTime: rule.value,
  amount: rule.value
})

const { resetFields, validate, validateInfos } = useForm(form, rules)

const submitForm = () => {
  validate()
    .then(() => {
      boardConfigurationPinia.addNewBoardConfiguration(
        form,
        props.id,
        props.location
      )
    })
    .catch(() => {})
}
const closeDrower = () => {
  visibleDrower.value.delete('configuration/drower')
  resetFields()
}
watch(boardConfigurationList, () => {
  resetFields()
})
</script>

<template>
  <div class="form-content">
    <a-form layout="vertical">
      <a-row :gutter="10">
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :xxl="24">
          <a-form-item :label="$t('RATE_NAME')" v-bind="validateInfos.name">
            <a-input
              :placeholder="$t('ENTER_RATE_NAME')"
              v-model:value="form.name"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" :xxl="8">
          <a-form-item :label="$t('LIVE_TIME')" v-bind="validateInfos.liveTime">
            <a-time-picker
              v-model:value="form.liveTime"
              format="HH:mm"
              :placeholder="`${$t('HOUR')}:${$t('MINUTE')}`"
              value-format="HH:mm"
              class="date-picker"
              :showNow="false"
              :minuteStep="10"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" :xxl="8">
          <a-form-item :label="$t('TOP_TIME')" v-bind="validateInfos.topTime">
            <a-time-picker
              v-model:value="form.topTime"
              format="HH:mm"
              value-format="HH:mm"
              :placeholder="`${$t('HOUR')}:${$t('MINUTE')}`"
              class="date-picker"
              :showNow="false"
              :minuteStep="10"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" :xxl="8">
          <a-form-item :label="$t('PIN_TIME')" v-bind="validateInfos.pinTime">
            <a-time-picker
              v-model:value="form.pinTime"
              format="HH:mm"
              value-format="HH:mm"
              :placeholder="`${$t('HOUR')}:${$t('MINUTE')}`"
              class="date-picker"
              :showNow="false"
              :minuteStep="10"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :xxl="24">
          <a-form-item
            :label="`${$t('AMOUNT')} (UZS)`"
            v-bind="validateInfos.amount"
          >
            <money-input-component
              v-model:value="form.amount"
              placeholder="100 000"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="buttons">
      <a-space>
        <a-button @click="closeDrower">
          {{ $t('BACK') }}
        </a-button>
        <a-button
          @click="submitForm"
          :disabled="loadingUrl.has('board/configuration/create')"
          class="btn-add"
          type="primary"
        >
          <template v-if="loadingUrl.has('board/configuration/create')">
            <icon-loader size="small" class="loader" />
          </template>
          <template v-else>
            {{ $t('ADD') }}
          </template>
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.form-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .date-picker {
    width: 100%;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;

    .loader {
      border-color: $primary !important;
    }

    .btn-add {
      min-width: 90px;
    }
    .btn-check-channel {
      min-width: 155px;
    }
    .btn-add {
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
