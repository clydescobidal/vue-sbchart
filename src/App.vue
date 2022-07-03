<template>
	<div style="width: 500px; height: 230px">
		<SimpleBaselineChart
			:series="[
				{ timestamp: 1656818225, value: 12 },
				{ timestamp: 1656818226, value: 13 },
				{ timestamp: 1656818227, value: 14 },
				{ timestamp: 1656818228, value: 15 },
				{ timestamp: 1656818229, value: 12.5 },
				{ timestamp: 1656818230, value: 13 },
				{ timestamp: 1656818231, value: 12 }
			]"
			:baseValue="13"
		/>
	</div>
</template>

<script>
import SimpleBaselineChart from './components/SimpleBaselineChart.vue';

export default {
	name: 'App',
	components: {
		SimpleBaselineChart
	}
};
</script>
