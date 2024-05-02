<script setup>
import 'leaflet/dist/leaflet.css'
import {
  LMap,
  LTileLayer,
  LMarker,
  LPolyline,
  LPolygon,
  LCircle
} from '@vue-leaflet/vue-leaflet'
import { ref, watch } from 'vue'

const emits = defineEmits(['change'])
const props = defineProps({
  markers: {
    type: [Array, null],
    default: null
  },
  polyLine: {
    type: [Array, null],
    default: null
  },
  polygon: {
    type: [Array, null],
    default: null
  },
  circle: {
    type: [Array, null],
    default: null
  }
})
const url = ref(
  `https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=bG8hsL9iJdnFJSSSpai0`
)
const zoom = ref(15)
const markers = ref(props.markers || [['41.311081', '69.240562']])
const polyLine = ref(props.polyLine || [])
const polygon = ref(props.polygon || [])
const circle = ref(props.circle || [])

watch(props, () => {
  if (props.markers) markers.value = props.markers
  if (props.polyLine) polyLine.value = props.polyLine
  if (props.polygon) polygon.value = props.polygon
  if (props.circle) circle.value = props.circle
})
const click = (e) => {
  emits('change', e)
}
</script>

<template>
  <div class="map-block">
    <l-map
      @click="click"
      v-model:zoom="zoom"
      :center="markers[0]"
      :use-global-leaflet="false"
    >
      <l-tile-layer :url="url" layer-type="base" name="OpenStreetMap" />
      <l-marker
        v-for="(marker, index) in markers"
        :key="`markerKey${marker.join()}${index}`"
        :lat-lng="marker"
      />
      <l-polyline
        :lat-lngs="polyLine"
        fill-color="#6265F0"
        :fill-opacity="0.2"
        :color="`#6265F0`"
      />
      <l-polygon
        :lat-lngs="polygon"
        color="#6265F0"
        :fill-opacity="0.2"
        fill-color="#6265F0"
      />
      <l-circle
        v-for="(c, index) in circle"
        :key="`circleKey${index}`"
        :lat-lng="c.center"
        :radius="c.radius || 2"
        :color="c.color || '#6265F0'"
      />
    </l-map>
  </div>
</template>

<style scoped lang="scss">
.map-block {
  position: relative;
  height: 70vh;
  .map-buttons {
    text-align: right;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);
    padding: 10px 1rem;
    z-index: 99999;
  }
}
</style>
