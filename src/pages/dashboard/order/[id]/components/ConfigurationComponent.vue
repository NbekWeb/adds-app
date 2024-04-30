<script setup>
import { formatTime } from '@/composables/index.js'
const props = defineProps({
  configuration: Object
})
</script>

<template>
  <div class="configuration pb-1 mb-2">
    <h2>{{ configuration.name }}</h2>
    <div class="">
      <div class="flex justify-between">
        <p class="text-muted">{{ $t('POST_LIVE_TIME') }}</p>
        <p class="text-body">
          <template v-if="formatTime(configuration.liveTime, 'day')">
            {{ formatTime(configuration.liveTime, 'day') }}
            {{ $t('DAY').toLowerCase() }},
          </template>
          <template v-if="formatTime(configuration.liveTime, 'hour')">
            {{ formatTime(configuration.liveTime, 'hour') }}
            {{ $t('HOUR').toLowerCase() }},
          </template>
          <template v-if="formatTime(configuration.liveTime, 'minute')">
            {{ formatTime(configuration.liveTime, 'minute') }}
            {{ $t('MINUTE').toLowerCase() }}
          </template>
        </p>
      </div>
      <div class="flex justify-between">
        <p class="text-muted">{{ $t('POST_TOP_TIME') }}</p>
        <p class="text-body">
          <template v-if="formatTime(configuration.topTime, 'day')">
            {{ formatTime(configuration.topTime, 'day') }}
            {{ $t('DAY').toLowerCase() }},
          </template>
          <template v-if="formatTime(configuration.topTime, 'hour')">
            {{ formatTime(configuration.topTime, 'hour') }}
            {{ $t('HOUR').toLowerCase() }},
          </template>
          <template v-if="formatTime(configuration.topTime, 'minute')">
            {{ formatTime(configuration.topTime, 'minute') }}
            {{ $t('MINUTE').toLowerCase() }}
          </template>
        </p>
      </div>
      <div class="flex justify-between">
        <p class="text-muted">{{ $t('POST_PIN_TIME') }}</p>
        <p class="text-body">
          <template v-if="formatTime(configuration.pinTime, 'day')">
            {{ formatTime(configuration.liveTime, 'day') }}
            {{ $t('DAY').toLowerCase() }},
          </template>
          <template v-if="formatTime(configuration.pinTime, 'hour')">
            {{ formatTime(configuration.pinTime, 'hour') }}
            {{ $t('HOUR').toLowerCase() }},
          </template>
          <template v-if="formatTime(configuration.pinTime, 'minute')">
            {{ formatTime(configuration.pinTime, 'minute') }}
            {{ $t('MINUTE').toLowerCase() }}
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.configuration {
  border-bottom: 1px dashed $muted;
}
</style>
