<template>
	<div ref="simpleBaselineChart" class="simple-baseline-chart">
		<div v-if="props.gridLines" class="simple-baseline-grid" :style="{backgroundSize: `${gap/2}px ${gap/2}px`}">
		</div>
		
		<template v-if="image">
			<img :src="image" />
		</template>

		<div v-if="props.interactive" class="simple-baseline-series">
			<div v-for="(point, index) in points" :key="index" class="simple-baseline-serie" :style="{ width: `${gap/2}px`, left: `${point.x}px`}">
				<div class="serie-wrapper" :style="{top: `${point.y}px` }">
					<div>
						<div>{{ tsToDate(point.serie.timestamp) }}</div>
						<div class="serie-value">{{ point.serie.value }}</div>
						<span class="arrow-down"></span>
					</div>
					<span :style="{backgroundColor: `${point.serie.value > props.baseValue ? rgbToHex(upColor) : rgbToHex(downColor)}`}"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, PropType } from 'vue';
import { TSerie, TOption, TPoint, TRgb } from './types';

const componentToHex = (c: number)  => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (rgb: TRgb) => {
  return "#" + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
}

const tsToDate = (timestamp: number) => {
	const date = new Date(timestamp * 1000);
	return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
const props = defineProps({
	series: {
		type: Array as PropType<TSerie[]>,
		default() {
			return [];
		}
	},
	baseValue: {
		type: Number,
		default: 0
	},
	options: {
		type: Object as PropType<TOption>,
		default() {
			return {
				upColor: '#008000',
				downColor: '#ff0000',
				lineWidth: 1,
			};
		}
	},
	interactive: {
		type: Boolean,
		default: true
	},
	gridLines: {
		type: Boolean,
		default: true
	},
})
const sortedSeries = computed(() => {
	const propSeries = props.series;
	return propSeries.sort((a, b) => {
		return a.timestamp - b.timestamp;
	});
});
const hexToRgb = (hex:string) => {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
};
const upColor = hexToRgb(props.options.upColor) || { r: 0, g: 128, b: 0 };
const downColor = hexToRgb(props.options.downColor) || { r: 255, g: 0, b: 0 };
const lineWidth = props.options.lineWidth || 1;
const simpleBaselineChart = ref<HTMLDivElement>();
const points = ref<TPoint[]>([]);
const gap = ref(0);
const image = ref();
const draw = () => {
	if (sortedSeries.value.length == 0) return;
	let canvas = document.createElement('canvas');
	let parent = simpleBaselineChart.value;
	canvas.width = parent!.offsetWidth * 2;
	canvas.height = parent!.offsetHeight * 2;
	let ctx = canvas.getContext('2d');
	ctx!.lineWidth = 1;
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
	drawLines(ctx!, sortedSeries.value, highest, lowest, canvasHeight, padding, gap.value, baseValuePosition, canvas, 'down');
	finalCtx?.drawImage(canvas, 0, 0);
	// // Up image
	ctx?.clearRect(0, 0, canvas.width, canvas.height);
	ctx?.beginPath();
	if (baseValuePosition > canvasHeight) {
		canvas.height = 1;
	} else {
		canvas.height = canvasHeight - baseValuePosition;
	}
	if (canvas.height <= 0) {
		canvas.height = 1;
	}

	drawLines(ctx!, sortedSeries.value, highest, lowest, canvasHeight, padding, gap.value, baseValuePosition, canvas, 'up', true);
	finalCtx?.drawImage(canvas, 0, 0);

	const dataUrl = finalCanvas.toDataURL('image/png');
	image.value = dataUrl;
};

const drawLines = (ctx: CanvasRenderingContext2D, series: TSerie[], highest: number, lowest: number, canvasHeight: number, padding: number, gap: number, baseValuePosition: number, canvas: HTMLCanvasElement, direction: string, getPoints = false) => {
	ctx.beginPath();
	let index = 0;
	let strokeStyle = `rgb(${upColor.r}, ${upColor.g}, ${upColor.b})`;
	if (direction == 'down') {
		strokeStyle = `rgb(${downColor.r}, ${downColor.g}, ${downColor.b})`;
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
		if (index > -1 && getPoints && props.interactive) {
			points.value.push({
				y: (y / 2) - 5,
				x: x / 2,
				serie
			});
		}
	});
	ctx.strokeStyle = strokeStyle;
	ctx.lineWidth = lineWidth;
	ctx.stroke();
	// Gradient
	let gradient : CanvasGradient;
	if (direction == 'up') {
		gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
		let colorStop = (canvasHeight - baseValuePosition) / canvasHeight;
		if (colorStop > 1) {
			colorStop = 1;
		} else if (colorStop < 0) {
			colorStop = 0;
		}
		gradient.addColorStop(0, `rgba(${upColor.r}, ${upColor.g}, ${upColor.b}, 0.5)`);
		gradient.addColorStop(colorStop, `rgba(${upColor.r}, ${upColor.g}, ${upColor.b}, 0)`);

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
		gradient.addColorStop(0, `rgba(${downColor.r}, ${downColor.g}, ${downColor.b}, 0.5)`);
		gradient.addColorStop(colorStop, `rgba(${downColor.r}, ${downColor.g}, ${downColor.b}, 0)`);

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
</script>

<style scoped>
.simple-baseline-chart {
	width: 100%;
	height: 100%;
	position: relative;
}
.simple-baseline-grid {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	background-size: 58px 58px;
 	background-image:
    linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px);
	opacity: 10%;
}
.simple-baseline-series {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.simple-baseline-serie{
	position: absolute;
	height: 100%;
	top: 0;
}
.simple-baseline-serie:hover:after,
.simple-baseline-serie:hover .serie-wrapper{
	opacity: 100%;
}
.serie-wrapper{
	position: absolute;
	font-size: 10px;
	line-height: 14px;
	font-weight: normal;
	left: -4px;
	height: 8px;
	width: 8px;
	z-index: 10;
	opacity: 0;
	align-items: end;
	justify-content: center;
	border-radius: 50%;
	pointer-events: none;
	background-color: white;
}
.serie-wrapper > div {
	position: absolute;
	bottom: 15px;
	left: 50%;
	width: auto;
	height: auto;
	transform: translateX(-50%);
	border: solid 1px #ddd;
	background-color: white;
	border-radius: 4px;
	padding: 2px 3px;
	text-align: left;
	white-space: nowrap;

}
.serie-wrapper > span {
	width: 5px;
	height: 5px;
	border-radius: 50%;
	display: block;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.simple-baseline-serie:after{
	content: '';
	position: absolute;
	width: 1px;
	height: 100%;
	top: 0;
	left: -1.5px;
	border-right: dashed 1px #aaa;
	opacity: 0;
}
.serie-value{
	font-weight: bold;
	font-size: 11px;
}
img {
	width: 100%;
	height: 100%;
}
.arrow-down {
	position: absolute;
	bottom: -4px;
	left: 50%;
}
.arrow-down:before{
	content: '';
	width: 5px; 
	height: 5px; 
	border: solid 1px #ddd;
	background-color: white;
	transform: translateX(-50%) rotate(45deg);
	display: block;
}
.arrow-down:after{
	content: '';
	display: block;
	position: absolute;
	background-color: white;
	width: 12px;
	height: 5px;
	top: 0.5px;
	left: 0;
	transform: translate(-50%, -50%);
}
</style>
