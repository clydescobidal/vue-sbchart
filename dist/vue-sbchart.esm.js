import { computed, ref, onMounted, openBlock, createElementBlock, createCommentVNode } from 'vue';

var script = {
  name: 'SimpleBaselineChart',
  props: {
    series: {
      type: Array,

      default() {
        return [];
      }

    },
    baseValue: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,

      default() {
        return {};
      }

    }
  },

  setup(props) {
    const sortedSeries = computed(() => {
      const propSeries = props.series;
      return propSeries.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });
    });

    const hexToRgb = hex => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const upColor = hexToRgb(props.options.upColor) || {
      r: 0,
      g: 128,
      b: 0
    };
    const downColor = hexToRgb(props.options.downColor) || {
      r: 255,
      g: 0,
      b: 0
    };
    const lineWidth = props.options.lineWidth || 1;
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
      let finalCtx = finalCanvas.getContext('2d'); // // Down image

      drawLines(ctx, sortedSeries.value, highest, lowest, canvasHeight, padding, gap.value, baseValuePosition, canvas, 'down');
      finalCtx.drawImage(canvas, 0, 0); // // Up image

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
      const dataUrl = finalCanvas.toDataURL('image/png');
      image.value = dataUrl;
    };

    const drawLines = (ctx, series, highest, lowest, canvasHeight, padding, gap, baseValuePosition, canvas, direction, getPoints) => {
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

        if (index > 0 && getPoints && props.interactive) {
          points.value.push({
            x: x / 2,
            y: y / 2,
            value: serie
          });
        }
      });
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke(); // Gradient

      let gradient = null;

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
    return {
      simpleBaselineChart,
      image
    };
  }

};

const _hoisted_1 = {
  ref: "simpleBaselineChart",
  id: "simple_baseline_chart"
};
const _hoisted_2 = ["src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [$setup.image ? (openBlock(), createElementBlock("img", {
    key: 0,
    src: $setup.image
  }, null, 8, _hoisted_2)) : createCommentVNode("", true)], 512);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n#simple_baseline_chart[data-v-513f479a] {\n\twidth: 100%;\n\theight: 100%;\n\tposition: relative;\n}\nimg[data-v-513f479a] {\n\twidth: 100%;\n\theight: 100%;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-513f479a";

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component('VueSbchart', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
