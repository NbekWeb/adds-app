<script setup>
import { ref } from 'vue'

const props = defineProps({
  disable: Boolean
})
const emits = defineEmits(['update:modelValue'])
const phone_number = ref()

function formatPhoneNumber() {
  const v = phone_number.value.replace(/[^0-9]/g, '')
  const l = v.length
  let lastValue
  if (l < 3) {
    const reg = new RegExp(`^([0-9]{2})`)
    lastValue = v.replace(reg, '$1')
  } else if (l < 6) {
    const reg = new RegExp(`^([0-9]{2})([0-9]{${l - 2}})`)
    lastValue = v.replace(reg, '$1 $2')
  } else if (l < 8) {
    const reg = new RegExp(`^([0-9]{2})([0-9]{3})([0-9]{${l - 5}})`)
    lastValue = v.replace(reg, '$1 $2-$3')
  } else {
    const reg = new RegExp(`^([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{${l - 7}})`)
    lastValue = v.replace(reg, '$1 $2-$3-$4')
  }
  emits('update:modelValue', v)
  return (phone_number.value = lastValue)
}
</script>

<template>
  <a-input
    type="text"
    size="large"
    @change="formatPhoneNumber"
    :maxlength="12"
    :disabled="disable"
    v-model:value="phone_number"
    placeholder="90 654-25-48"
  >
    <template #addonBefore> +998 </template>
  </a-input>
</template>

<style scoped lang="scss"></style>
