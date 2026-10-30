<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { COUNTRIES_QUERY } from '@/graphql/countries'

interface Country {
  code: string
  name: string
  emoji: string
}

const { result, loading, error } = useQuery<{ countries: Country[] }>(COUNTRIES_QUERY)
</script>

<template>
  <p v-if="loading">Loading…</p>
  <p v-else-if="error">Error: {{ error.message }}</p>
  <ul v-else-if="result">
    <li v-for="country in result.countries.slice(0, 10)" :key="country.code">
      {{ country.emoji }} {{ country.name }}
    </li>
  </ul>
</template>
