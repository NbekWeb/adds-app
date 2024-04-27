<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const emits = defineEmits(['add', 'edit'])
const model = defineModel('data')

const corePinia = useCore()
const { visibleDrawer } = storeToRefs(corePinia)

const formRef = ref()
const form = reactive({
  text: null,
  url: null,
  orderNumber: model.value?.length
})
const rule = reactive([
  {
    required: true,
    message: t('REQUIRED_FIELD'),
    trigger: 'blur'
  }
])
function addNewButton() {
  formRef.value.validate().then(() => {
    if (model.value) {
      emits('edit', form)
      model.value = null
    } else {
      form.orderNumber = model.value?.length
      emits('add', form)
    }
  })
}
function closeModal() {
  corePinia.visibleDrawer.delete('button/form')
  model.value = null
}
onMounted(() => {
  form.orderNumber = model.value?.orderNumber
  form.url = model.value?.url
  form.text = model.value?.text
})
</script>

<template>
  <a-form layout="vertical" :model="form" ref="formRef">
    <a-form-item :label="$t('LINKED_BUTTON_TEXT')" name="text" :rules="rule">
      <a-input v-model:value="form.text" />
    </a-form-item>
    <a-form-item :label="$t('LINKED_BUTTON_URL')" name="text" :rules="rule">
      <a-input v-model:value="form.url" />
    </a-form-item>
    <div class="flex justify-end">
      <a-space>
        <a-button @click="closeModal">
          {{ $t('CANCEL') }}
        </a-button>
        <a-button type="primary" @click="addNewButton">
          {{ $t(model ? 'SAVE' : 'ADD') }}
        </a-button>
      </a-space>
    </div>
  </a-form>
</template>

<style scoped lang="scss"></style>
