<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const props = withDefaults(
  defineProps<{
    center?: [number, number] // [lng, lat]
    zoom?: number
    styleUrl?: string
  }>(),
  {
    center: () => [-110.36, 46.0], // Montana
    zoom: 6,
    styleUrl: 'mapbox://styles/mapbox/outdoors-v12',
  },
)

const token = import.meta.env.VITE_MAPBOX_TOKEN
const container = ref<HTMLDivElement | null>(null)
let map: mapboxgl.Map | null = null

onMounted(() => {
  if (!token || !container.value) return

  mapboxgl.accessToken = token
  map = new mapboxgl.Map({
    container: container.value,
    style: props.styleUrl,
    center: props.center,
    zoom: props.zoom,
  })
  map.addControl(new mapboxgl.NavigationControl(), 'top-right')
})

// Release the WebGL context and listeners when the component goes away.
onBeforeUnmount(() => {
  map?.remove()
  map = null
})
</script>

<template>
  <p v-if="!token" class="map-missing-token">
    Set <code>VITE_MAPBOX_TOKEN</code> in <code>.env</code> to show the map (see <code>.env.example</code>).
  </p>
  <div v-else ref="container" class="map" />
</template>

<style scoped>
.map {
  width: 100%;
  height: 480px;
  border-radius: 8px;
}

.map-missing-token {
  padding: 1rem;
  border: 1px dashed currentColor;
  border-radius: 8px;
}
</style>
