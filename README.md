@@ -1,65 +0,0 @@
# vue-sbchart

![build](https://github.com/cleidoscope/vue-sbchart/actions/workflows/build.yml/badge.svg) ![License](https://img.shields.io/npm/l/vue-sbchart.svg)

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
    <SimpleBaselineChart :series="series" :baseValue="baseValue" :options="options" />
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
    const options = {
        upColor: '#37eb34',
	downColor: '#eb3434',
	lineWidth: 1
    };

    return { series, baseValue, options };
  }
};
```

### Props
| Property      | Type |  Description |
| ----------- |  ---- | ---
| series      | Array       | An array of objects containing **value** and **timestamp** properties
| baseValue   | float       | The base value used to calculate high and low positions
| options   | Object        | An object with customization properties (see below)

### Options
You can customize the chart by passing an object in the component's **options** prop (see example above) with these properties:
| Property      | Type | Default | Description |
| ----------- | ----------- | ---- | ---
| upColor      | string (hex)       | #008000 | Gradient and line color when value is higher than the base value
| downColor   | string (hex)        | #ff0000 | Gradient and line color when value is less than the base value
| lineWidth   | Number        | 1  | The line size of stroke
