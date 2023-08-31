<script setup>
import VueSbchart from '@/vue-sbchart.vue';

const series = [
	{ timestamp: 1656818225, value: 12 },
	{ timestamp: 1656818226, value: 13 },
	{ timestamp: 1656818227, value: 14 },
	{ timestamp: 1656818228, value: 15 },
	{ timestamp: 1656818229, value: 12.5 },
	{ timestamp: 1656818230, value: 13 },
	{ timestamp: 1656818231, value: 12 },
	{ timestamp: 1656818232, value: 16 },
	{ timestamp: 1656818233, value: 13.6 },
	{ timestamp: 1656818234, value: 12.6 },
	{ timestamp: 1656818235, value: 14 },
	{ timestamp: 1656818236, value: 15 },
	{ timestamp: 1656818237, value: 16.5 },
	{ timestamp: 1656818238, value: 13.5 },
	{ timestamp: 1656818239, value: 15 },
	{ timestamp: 1656818240, value: 12.6 },
	{ timestamp: 1656818241, value: 12.6 },
	{ timestamp: 1656818242, value: 12 },
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
		<div style="width: 1000px; height: 250px">
			<vue-sbchart :series="series" :baseValue="baseValue" :options="options" />
		</div>
	</div>
</template>
