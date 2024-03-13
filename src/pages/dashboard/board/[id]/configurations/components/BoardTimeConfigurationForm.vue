<script setup>
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'ant-design-vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'
import useBoardTimeConfiguration from '@/store/board-time-configuration.pinia.js'
import MoneyInputComponent from '@/components/MoneyInputComponent.vue'

const { t } = useI18n()
const useForm = Form.useForm
const corePinia = useCore()
const boardTimeConfigurationPinia = useBoardTimeConfiguration()

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
const { timeConfigurationList } = storeToRefs(boardTimeConfigurationPinia)
const form = reactive({
  startTime: null,
  endTime: null,
  amount: null
})
const rules = ref({
  startTime: [
    {
      required: true,
      message: t('REQUIRED_FIELD'),
      trigger: 'blur'
    }
  ],
  endTime: [
    {
      required: true,
      message: t('REQUIRED_FIELD'),
      trigger: 'blur'
    }
  ],
  amount: [
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
  ]
})
const { resetFields, validate, validateInfos } = useForm(form, rules)

const submitForm = () => {
  validate()
    .then(() => {
      boardTimeConfigurationPinia.addNewBoardTimeConfiguration(
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
watch(timeConfigurationList, () => {
  resetFields()
})
</script>

<template>
  <div class="form-content">
    <a-form layout="vertical">
      <a-row :gutter="10">
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="12">
          <a-form-item
            :label="$t('START_TIME')"
            v-bind="validateInfos.startTime"
          >
            <a-time-picker
              v-model:value="form.startTime"
              format="HH:mm"
              :placeholder="`${$t('HOUR')}:${$t('MINUTE')}`"
              value-format="HH:mm"
              class="date-picker"
              :showNow="false"
              :minuteStep="10"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="12">
          <a-form-item :label="$t('END_TIME')" v-bind="validateInfos.endTime">
            <a-time-picker
              v-model:value="form.endTime"
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
          :disabled="loadingUrl.has('board/time-configuration/create')"
          class="btn-add"
          type="primary"
        >
          <template v-if="loadingUrl.has('board/time-configuration/create')">
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
