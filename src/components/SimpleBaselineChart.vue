<template>
	<div ref="simpleBaselineChart" id="simple_baseline_chart">
		<template v-if="image">
			<img :src="image" />
		</template>
	</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
export default {
	name: 'SimpleBaselineChart',
	props: {
		series: {
			type: Array,
			default: () => []
		},
		baseValue: {
			type: Number,
			default: 0
		}
	},

	setup(props) {
		const sortedSeries = computed(() => {
			const propSeries = props.series;
			return propSeries.sort((a, b) => {
				return a.timestamp - b.timestamp;
			});
		});

		const simpleBaselineChart = ref(null);

		const points = ref([]);
		const gap = ref(0);
		const image = ref();

		const draw = () => {
			if (sortedSeries.value.length == 0) return;
			let canvas = document.createElement('canvas');
			let parent = simpleBaselineChart.value;
			canvas.width = parent.offsetWidth * 2;
			canvas.height = parent.offsetHeight * 2;
			let ctx = canvas.getContext('2d');
			ctx.lineWidth = 1;
			let baseValue = props.baseValue;
			let series = sortedSeries.value.map(x => x.value);

			let padding = 1;
			let seriesLength = series.length;
			let offsetRight = padding / seriesLength;

			gap.value = canvas.width / (seriesLength - 1) - offsetRight;
			let canvasHeight = canvas.height - padding;
			let highest = Math.max.apply(Math, series);
			let lowest = Math.min.apply(Math, series);
			let ratio = (baseValue - lowest) / (highest - lowest);
			let baseValuePosition = (canvasHeight - padding) * ratio;
			if (baseValuePosition < 0) {
				baseValuePosition = 0;
			}
			let finalCanvas = document.createElement('canvas');
			finalCanvas.width = canvas.width;
			finalCanvas.height = canvas.height;
			let finalCtx = finalCanvas.getContext('2d');
			// // Down image
			drawLines(ctx, sortedSeries.value, highest, lowest, canvasHeight, padding, gap.value, baseValuePosition, canvas, 'down');
			finalCtx.drawImage(canvas, 0, 0);
			// // Up image
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.beginPath();
			if (baseValuePosition > canvasHeight) {
				canvas.height = 1;
			} else {
				canvas.height = canvasHeight - baseValuePosition;
			}
			if (canvas.height <= 0) {
				canvas.height = 1;
			}

			drawLines(ctx, sortedSeries.value, highest, lowest, canvasHeight, padding, gap.value, baseValuePosition, canvas, 'up', true);
			finalCtx.drawImage(canvas, 0, 0);
			if (props.dashes && baseValuePosition > 0 && baseValuePosition <= canvasHeight) {
				finalCtx.moveTo(0, canvas.height);
				finalCtx.lineTo(canvas.width, canvas.height);
				finalCtx.setLineDash([5, 3]);
				finalCtx.strokeStyle = 'rgba(255,255,255,0.35)';
				finalCtx.stroke();
				finalCtx.setLineDash([0, 0]);
			}
			const dataUrl = finalCanvas.toDataURL('image/png');
			image.value = dataUrl;
		};

		const drawLines = (ctx, series, highest, lowest, canvasHeight, padding, gap, baseValuePosition, canvas, direction, getPoints) => {
			ctx.beginPath();
			let index = 0;
			let strokeStyle = 'green';
			if (direction == 'down') {
				strokeStyle = 'red';
			}

			series.forEach((serie, index) => {
				let ratio = (serie.value - lowest) / (highest - lowest);
				let adjustedSerie = (canvasHeight - padding) * ratio;
				let x = 0;
				let y = canvasHeight - adjustedSerie;

				if (index == 0) {
					x = padding;
				} else {
					x = gap * index;
				}
				ctx.lineTo(x, y);
				if (index > 0 && getPoints && props.interactive) {
					points.value.push({
						x: x / 2,
						y: y / 2,
						value: serie
					});
				}
			});
			ctx.strokeStyle = strokeStyle;
			ctx.stroke();
			// Gradient
			let gradient = null;
			if (direction == 'up') {
				gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
				let colorStop = (canvasHeight - baseValuePosition) / canvasHeight;
				if (colorStop > 1) {
					colorStop = 1;
				} else if (colorStop < 0) {
					colorStop = 0;
				}
				gradient.addColorStop(0, 'rgba(50, 168, 82, 0.5)');
				gradient.addColorStop(colorStop, 'rgba(50, 168, 82, 0)');

				ctx.lineTo(gap * (series.length - 1), canvasHeight - baseValuePosition); // bottom-right
				ctx.lineTo(gap * (index - series.length), canvasHeight - baseValuePosition); // bottom-left
			} else {
				let colorStop = baseValuePosition / canvasHeight;
				if (colorStop > 1) {
					colorStop = 1;
				} else if (colorStop < 0) {
					colorStop = 0;
				}
				gradient = ctx.createLinearGradient(0, canvasHeight, 0, 0);
				gradient.addColorStop(0, 'rgba(168, 50, 50, 0.5)');
				gradient.addColorStop(colorStop, 'rgba(168, 50, 50, 0');

				ctx.lineTo(canvas.width - padding, gap); // top-right
				ctx.lineTo(padding, gap); // top-left
			}
			if (direction == 'down') {
				ctx.fillStyle = 'transparent';
				ctx.fillRect(0, 0, canvas.width, canvasHeight - baseValuePosition);
			}
			if (gradient) {
				ctx.fillStyle = gradient;
			}
			ctx.globalCompositeOperation = 'destination-over';
			ctx.fill();
			ctx.globalCompositeOperation = 'source-over';
		};

		onMounted(() => {
			draw();
		});

		return { simpleBaselineChart, image };
	}
};
</script>

<style scoped>
#simple_baseline_chart {
	width: 100%;
	height: 100%;
	position: relative;
}
img {
	width: 100%;
	height: 100%;
}
</style>
