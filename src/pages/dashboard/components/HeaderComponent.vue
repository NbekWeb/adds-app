<script setup>

import {ref} from "vue";

const account = ref(1)
</script>

<template>
  <a-row :gutter="16" justify="end" align="middle">
    <a-col :xs="24" :sm="24" :md="12" :lg="4" :xl="3">
      <a-select v-model:value="account" placeholder="Akkaunt turini tanlang">
        <a-select-option :value="1">Reklama berish</a-select-option>
        <a-select-option :value="2">Reklama olish</a-select-option>
      </a-select>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="4" :xl="3">
      <div><b>ID: 1234567</b></div>
      <p class="m-0 small text-muted">Balans: 129 200 so'm</p>
    </a-col>
  </a-row>
</template>

<style scoped lang="scss">

</style>