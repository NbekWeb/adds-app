<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  statistics: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <h2>Jarayon</h2>
  <div class="statistics flex pb-4">
    <div class="order-statistics flex flex-column align-center">
      <template v-if="statistics?.startDate">
        <div
          class="order-statistics-status flex justify-center align-center p-3"
        >
          🕐
        </div>
      </template>

      <template v-if="statistics?.startDate || statistics?.startPinDate">
        <span class="step-border my-2"></span>
      </template>

      <template v-if="statistics?.startPinDate">
        <div
          class="order-statistics-status flex justify-center align-center p-3"
        >
          📌
        </div>
      </template>

      <template v-if="statistics?.startDate || statistics?.startPinDate">
        <span class="step-border my-2"></span>
      </template>
      <template v-if="statistics?.startDate">
        <div
          class="order-statistics-status flex justify-center align-center p-3"
        >
          🔝
        </div>
      </template>
    </div>
    <div class="flex flex-column justify-between pl-2">
      <template v-if="statistics?.startDate">
        <div class="order-statistics-value flex align-center">
          E'lon
          {{ dayjs(statistics?.startDate).format('DD.MM.YYYY, HH:mm') }} dan
          <template v-if="statistics?.endDate">
            {{ dayjs(statistics?.endDate).format('DD.MM.YYYY, HH:mm') }} gacha
            kanalda turgan
          </template>
          <template v-else> boshlab kanalda turibdi </template>
        </div>
      </template>

      <template v-if="statistics?.startPinDate">
        <div class="order-statistics-value flex align-center">
          E'lon
          {{ dayjs(statistics?.startPinDate).format('DD.MM.YYYY, HH:mm') }} dan
          <template v-if="statistics?.endPinDate">
            {{ dayjs(statistics?.endPinDate).format('DD.MM.YYYY, HH:mm') }}
            gacha pinda turgan
          </template>
          <template v-else> boshlab pinda turibdi </template>
        </div>
      </template>

      <template v-if="statistics?.startDate">
        <div class="order-statistics-value flex align-center">
          E'lon
          {{ dayjs(statistics?.startDate).format('DD.MM.YYYY, HH:mm') }} dan
          <template v-if="statistics?.endTopDate">
            {{ dayjs(statistics?.endTopDate).format('DD.MM.YYYY, HH:mm') }}
            gacha topda turgan
          </template>
          <template v-else> boshlab topda turibdi </template>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.statistics {
  border-bottom: 1px dashed $muted;
}
.order-statistics {
  width: 50px;
}
.order-statistics-value {
  height: 50px;
}
.order-statistics-status {
  width: 50px;
  height: 50px;
  font-size: 20px;
  background-color: $light;
  border-radius: 10px;
}
.step-border {
  display: block;
  height: 20px;
  width: 2px;
  border-radius: 2px;
  background-color: rgb($body, 0.3);
}
</style>
