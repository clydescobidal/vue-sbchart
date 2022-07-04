<script>
import { defineComponent } from 'vue';
import VueSbchart from '@/vue-sbchart.vue';

export default defineComponent({
	name: 'ServeDev',
	components: {
		VueSbchart
	}
});
</script>

<template>
	<div id="app">
		<vue-sbchart />
	</div>
</template>
