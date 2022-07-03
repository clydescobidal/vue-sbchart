# vue-sbchart

A simple baseline charting component for Vue 3.

## Install

```
npm install vue-sbchart
```

## Usage

### A basic usage

```html
<template>
	<div style="width: 500px; height: 230px">
		<SimpleBaselineChart :series="series" :baseValue="baseValue" />
	</div>
</template>
```

```javascript
import SimpleBaselineChart from 'vue-sbchart';
export default {
	components: { SimpleBaselineChart },
	setup(props) {
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

		return { series, baseValue };
	}
};
```
