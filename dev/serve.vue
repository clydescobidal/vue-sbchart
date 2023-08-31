<script setup>
import VueSbchart from '@/vue-sbchart.vue';

const series = [
	{ timestamp: 1656818225, value: 12 },
	{ timestamp: 1656818226, value: 13 },
	{ timestamp: 1656818227, value: 14 },
	{ timestamp: 1656818228, value: 15 },
	{ timestamp: 1656818229, value: 12.5 },
	{ timestamp: 1656818230, value: 13 },
	{ timestamp: 1656818231, value: 12 }
];
const baseValue = 13;
const options = {
	upColor: '#37eb34',
	downColor: '#eb3434',
	lineWidth: 1
};
</script>

<template>
	<div id="app">
		<div style="width: 500px; height: 230px">
			<vue-sbchart :series="series" :baseValue="baseValue" :options="options" />
		</div>
	</div>
</template>
