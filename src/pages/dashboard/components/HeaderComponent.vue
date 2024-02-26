<script setup>

import {ref} from "vue";

const account = ref('ads')
</script>

<template>
  <a-row :gutter="16" justify="end" align="middle">
    <a-col>
      <h2 class="m-0">
        <template v-if="account === 'ads'">
          Siz, <b>E'lon beruvchi rejimidasiz</b>
        </template>
        <template v-else>
          Siz, <b> E'lon oluvchi rejimidasiz</b>
        </template>
      </h2>
    </a-col>
    <a-col class="ml-auto">
      <div class="header-switch">
        <div @click="account = 'ads'" class="switch-item" :class="account === 'ads' && 'active'">
          <a-tooltip title="E'lon beruvchi rejimiga o'tish">
            🎉
          </a-tooltip>
        </div>
        <div @click="account = 'owner'" class="switch-item" :class="account === 'owner' && 'active'">
          <a-tooltip title="E'lon oluvchi rejimiga o'tish">
            😎
          </a-tooltip>
        </div>
      </div>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="4" :xl="3">
      <div><b>ID: 1234567</b></div>
      <p class="m-0 small text-muted">Balans: 129 200 so'm</p>
    </a-col>
  </a-row>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variable";
.header-switch{
  display: flex;
  padding: .3rem;
  border-radius: 4px;
  font-size: 25px;
  background-color: #fff;
  width: 100px;
  box-shadow: inset 0 0 10px rgba($muted,.1);
  border: 1px solid rgba($muted,.2);
  .switch-item{
    border-radius: 4px;
    padding: .5rem;
    width: 50%;
    text-align: center;
    cursor: pointer;
    &.active{
      background-color: rgba($primary,.1);
    }
  }
}
</style>