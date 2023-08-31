'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = {
  name: 'SimpleBaselineChart',
  props: {
    series: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    baseValue: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  setup: function setup(props) {
    var sortedSeries = vue.computed(function () {
      var propSeries = props.series;
      return propSeries.sort(function (a, b) {
        return a.timestamp - b.timestamp;
      });
    });

    var hexToRgb = function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    var upColor = hexToRgb(props.options.upColor) || {
      r: 0,
      g: 128,
      b: 0
    };
    var downColor = hexToRgb(props.options.downColor) || {
      r: 255,
      g: 0,
      b: 0
    };
    var lineWidth = props.options.lineWidth || 1;
    var simpleBaselineChart = vue.ref(null);
    var points = vue.ref([]);
    var gap = vue.ref(0);
    var image = vue.ref();

    var draw = function draw() {
      if (sortedSeries.value.length == 0) return;
      var canvas = document.createElement('canvas');
      var parent = simpleBaselineChart.value;
      canvas.width = parent.offsetWidth * 2;
      canvas.height = parent.offsetHeight * 2;
      var ctx = canvas.getContext('2d');
      ctx.lineWidth = 1;
      var baseValue = props.baseValue;
      var series = sortedSeries.value.map(function (x) {
        return x.value;
      });
      var padding = 1;
      var seriesLength = series.length;
      var offsetRight = padding / seriesLength;
      gap.value = canvas.width / (seriesLength - 1) - offsetRight;
      var canvasHeight = canvas.height - padding;
      var highest = Math.max.apply(Math, series);
      var lowest = Math.min.apply(Math, series);
      var ratio = (baseValue - lowest) / (highest - lowest);
      var baseValuePosition = (canvasHeight - padding) * ratio;

      if (baseValuePosition < 0) {
        baseValuePosition = 0;
      }

      var finalCanvas = document.createElement('canvas');
      finalCanvas.width = canvas.width;
      finalCanvas.height = canvas.height;
      var finalCtx = finalCanvas.getContext('2d'); // // Down image

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
      var dataUrl = finalCanvas.toDataURL('image/png');
      image.value = dataUrl;
    };

    var drawLines = function drawLines(ctx, series, highest, lowest, canvasHeight, padding, gap, baseValuePosition, canvas, direction, getPoints) {
      ctx.beginPath();
      var index = 0;
      var strokeStyle = "rgb(".concat(upColor.r, ", ").concat(upColor.g, ", ").concat(upColor.b, ")");

      if (direction == 'down') {
        strokeStyle = "rgb(".concat(downColor.r, ", ").concat(downColor.g, ", ").concat(downColor.b, ")");
      }

      series.forEach(function (serie, index) {
        var ratio = (serie.value - lowest) / (highest - lowest);
        var adjustedSerie = (canvasHeight - padding) * ratio;
        var x = 0;
        var y = canvasHeight - adjustedSerie;

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

      var gradient = null;

      if (direction == 'up') {
        gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        var colorStop = (canvasHeight - baseValuePosition) / canvasHeight;

        if (colorStop > 1) {
          colorStop = 1;
        } else if (colorStop < 0) {
          colorStop = 0;
        }

        gradient.addColorStop(0, "rgba(".concat(upColor.r, ", ").concat(upColor.g, ", ").concat(upColor.b, ", 0.5)"));
        gradient.addColorStop(colorStop, "rgba(".concat(upColor.r, ", ").concat(upColor.g, ", ").concat(upColor.b, ", 0)"));
        ctx.lineTo(gap * (series.length - 1), canvasHeight - baseValuePosition); // bottom-right

        ctx.lineTo(gap * (index - series.length), canvasHeight - baseValuePosition); // bottom-left
      } else {
        var _colorStop = baseValuePosition / canvasHeight;

        if (_colorStop > 1) {
          _colorStop = 1;
        } else if (_colorStop < 0) {
          _colorStop = 0;
        }

        gradient = ctx.createLinearGradient(0, canvasHeight, 0, 0);
        gradient.addColorStop(0, "rgba(".concat(downColor.r, ", ").concat(downColor.g, ", ").concat(downColor.b, ", 0.5)"));
        gradient.addColorStop(_colorStop, "rgba(".concat(downColor.r, ", ").concat(downColor.g, ", ").concat(downColor.b, ", 0)"));
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

    vue.onMounted(function () {
      draw();
    });
    return {
      simpleBaselineChart: simpleBaselineChart,
      image: image
    };
  }
};var _hoisted_1 = {
  ref: "simpleBaselineChart",
  id: "simple_baseline_chart"
};
var _hoisted_2 = ["src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [$setup.image ? (vue.openBlock(), vue.createElementBlock("img", {
    key: 0,
    src: $setup.image
  }, null, 8, _hoisted_2)) : vue.createCommentVNode("", true)], 512);
}function styleInject(css, ref) {
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
}var css_248z = "\n#simple_baseline_chart[data-v-513f479a] {\n\twidth: 100%;\n\theight: 100%;\n\tposition: relative;\n}\nimg[data-v-513f479a] {\n\twidth: 100%;\n\theight: 100%;\n}\n";
styleInject(css_248z);script.render = render;
script.__scopeId = "data-v-513f479a";// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('VueSbchart', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;