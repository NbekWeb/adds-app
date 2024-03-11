<script setup>
import useBoard from '@/store/boadr.pinia.js'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'ant-design-vue'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'
import IconLoader from '@/components/icons/IconLoader.vue'

const { t } = useI18n()
const useForm = Form.useForm
const boardPinia = useBoard()
const corePinia = useCore()
const { loadingUrl } = storeToRefs(corePinia)
const form = reactive({
  name: null,
  liveTime: 0,
  topTime: 0,
  pinTime: 0,
  amount: null
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
      boardPinia.addNewBoardConfiguration(form)
    })
    .catch(() => {})
}

function formatInput() {
  form.amount = form.amount
    .toString()
    .replace(/\D/g, '')
    .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
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
      <a-form-item
        :label="`${$t('LIVE_TIME')} (${$t('HOUR')})`"
        v-bind="validateInfos.liveTime"
      >
        <!--        <a-input :min="0" type="number" v-model:value="form.liveTime" />-->
        <a-time-picker
          v-model:value="form.liveTime"
          format="HH:mm"
          value-format="HH:mm"
          class="date-picker"
          :showNow="false"
          autofocus
          :minuteStep="10"
        />
      </a-form-item>
      <a-form-item
        :label="`${$t('TOP_TIME')} (${$t('HOUR')})`"
        v-bind="validateInfos.topTime"
      >
        <!--        <a-input :min="0" type="number" v-model:value="form.topTime" />-->
        <a-time-picker
          v-model:value="form.topTime"
          format="HH:mm"
          value-format="HH:mm"
          class="date-picker"
          :showNow="false"
          autofocus
          :minuteStep="10"
        />
      </a-form-item>
      <a-form-item
        :label="`${$t('PIN_TIME')} (${$t('HOUR')})`"
        v-bind="validateInfos.pinTime"
      >
        <!--        <a-input :min="0" type="number" v-model:value="form.pinTime" />-->
        <a-time-picker
          v-model:value="form.pinTime"
          format="HH:mm"
          value-format="HH:mm"
          class="date-picker"
          :showNow="false"
          autofocus
          :minuteStep="10"
        />
      </a-form-item>
      <a-form-item
        :label="`${$t('AMOUNT')} (UZS)`"
        v-bind="validateInfos.amount"
      >
        <a-input
          @input="formatInput"
          placeholder="100 000"
          :min="0"
          type="text"
          v-model:value="form.amount"
        />
      </a-form-item>
    </a-form>
    <div class="buttons">
      <a-space>
        <a-button @click="boardPinia.visibleDrover(false)">{{
          $t('BACK')
        }}</a-button>
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
