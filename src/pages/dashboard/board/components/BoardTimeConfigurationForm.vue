<script setup>
import useBoard from '@/store/boadr.pinia.js'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'ant-design-vue'

const { t } = useI18n()
const useForm = Form.useForm
const boardPinia = useBoard()

const form = reactive({
  name: null,
  liveTime: 0,
  topTime: 0,
  pinTime: 0,
  amount: 0
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
const { validate, validateInfos } = useForm(form, rules)

const submitForm = () => {
  validate()
    .then(() => {
      console.log(form)
    })
    .catch(() => {})
}
</script>

<template>
  <div class="form-content">
    <a-form layout="vertical">
      <a-form-item :label="$t('RATE_NAME')" v-bind="validateInfos.name">
        <a-input
          :placeholder="$t('ENTER_RATE_NAME')"
          v-model:value="form.name"
        />
      </a-form-item>
      <a-form-item :label="$t('LIVE_TIME')" v-bind="validateInfos.liveTime">
        <a-input :min="0" type="number" v-model:value="form.liveTime" />
      </a-form-item>
      <a-form-item :label="$t('TOP_TIME')" v-bind="validateInfos.topTime">
        <a-input :min="0" type="number" v-model:value="form.topTime" />
      </a-form-item>
      <a-form-item :label="$t('PIN_TIME')" v-bind="validateInfos.pinTime">
        <a-input :min="0" type="number" v-model:value="form.pinTime" />
      </a-form-item>
      <a-form-item :label="$t('AMOUNT')" v-bind="validateInfos.amount">
        <a-input :min="0" type="number" v-model:value="form.amount" />
      </a-form-item>
    </a-form>
    <div class="buttons">
      <a-space>
        <a-button @click="boardPinia.visibleDrover(false)">{{
          $t('BACK')
        }}</a-button>
        <a-button @click="submitForm" type="primary">
          {{ $t('ADD') }}
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
