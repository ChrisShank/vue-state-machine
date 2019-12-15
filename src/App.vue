<template>
	<stop-light />
</template>

<script lang="ts">
import Vue from 'vue'
import { StopLight } from './state-machines/stop-light'

export default Vue.extend({
	components: { StopLight },
})
</script>
