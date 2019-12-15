<template>
	<div class="light-container">
		<div
			class="light green"
			:class="{ 'green-active': activeLight === 'green' }"
		></div>
		<div
			class="light yellow"
			:class="{ 'yellow-active': activeLight === 'yellow' }"
		></div>
		<div class="light red" :class="{ 'red-active': activeLight === 'red' }">
			<red-light v-if="activeLight === 'red'" @accepted="$emit('transition')" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RedLight } from './red-light'

export default Vue.extend({
	components: { RedLight },

	props: {
		activeLight: {
			required: true,
			type: String as () => 'green' | 'yellow' | 'red',
			validator: prop => ['green', 'yellow', 'red'].includes(prop),
		},
	},
})
</script>

<style scoped>
.light-container {
	border: black 4px solid;
	display: inline-flex;
	flex-direction: column;
	margin: auto;
}

.light {
	border: black 2px solid;
	border-radius: 50%;
	height: 200px;
	margin: 20px 10px;
	width: 200px;
}

.green {
	background-color: #22543d;
}

.green-active {
	background-color: #38a169;
}

.yellow {
	background-color: #744210;
}

.yellow-active {
	background-color: #f6e05e;
}

.red {
	background-color: #742a2a;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
}

.red-active {
	background-color: #e53e3e;
}
</style>
