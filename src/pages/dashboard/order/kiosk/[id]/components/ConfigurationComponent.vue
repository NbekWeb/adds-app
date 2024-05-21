<script setup>
import dayjs from 'dayjs'
const props = defineProps({
  configuration: [Object, null],
  startDate:  [Date, String]
})
</script>

<template>
  <div class="configuration pb-1 mb-3 pb-3">
    <template v-if="configuration">
      <h2>{{ configuration?.name }}</h2>
      <div class="mt-2 flex justify-between align-center">
        <h4 class="m-0">{{ $t('THE_TIME_OF_PUBLICATION') }} </h4>
        <p class="m-0">{{ dayjs(startDate).format('DD.MM.YYYY, HH:mm') }}</p>
      </div>
    </template>
    <template v-else>
      <h2>{{ $t('NOT_CONFIGURATION') }}</h2>
      <p class="text-muted">
        {{ $t('POST_A_ONE_TIME_ANNOUNCEMENT_TO_A_CHANNEL') }}
      </p>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.configuration {
  border-bottom: 1px dashed $muted;
}
</style>
