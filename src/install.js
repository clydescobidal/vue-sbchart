import SimpleBaselineChart from './components/SimpleBaselineChart.vue';

const SimpleBaselineChartInstall = {
	install(Vue) {
		Vue.component('SimpleBaselineChart', SimpleBaselineChart);
	}
};

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(SimpleBaselineChartInstall);
}

export default SimpleBaselineChartInstall;
