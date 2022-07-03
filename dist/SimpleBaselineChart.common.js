/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 89:
/***/ (function(__unused_webpack_module, exports) {

var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
}); // runtime helper for setting properties on components
// in a tree-shakable way

exports.Z = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;

  for (const [key, val] of props) {
    target[key] = val;
  }

  return target;
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject = require("vue");
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SimpleBaselineChart.vue?vue&type=template&id=042d0341&scoped=true


const _withScopeId = n => (_pushScopeId("data-v-042d0341"), n = n(), _popScopeId(), n);

const _hoisted_1 = {
  ref: "simpleBaselineChart",
  id: "simple_baseline_chart"
};
const _hoisted_2 = ["src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_1, [$setup.image ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("img", {
    key: 0,
    src: $setup.image
  }, null, 8, _hoisted_2)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)], 512);
}
;// CONCATENATED MODULE: ./src/components/SimpleBaselineChart.vue?vue&type=template&id=042d0341&scoped=true

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SimpleBaselineChart.vue?vue&type=script&lang=js

/* harmony default export */ var SimpleBaselineChartvue_type_script_lang_js = ({
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
    const sortedSeries = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
      const propSeries = props.series;
      return propSeries.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });
    });
    const simpleBaselineChart = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    const points = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)([]);
    const gap = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(0);
    const image = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();

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

    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      draw();
    });
    return {
      simpleBaselineChart,
      image
    };
  }

});
;// CONCATENATED MODULE: ./src/components/SimpleBaselineChart.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SimpleBaselineChart.vue?vue&type=style&index=0&id=042d0341&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/SimpleBaselineChart.vue?vue&type=style&index=0&id=042d0341&scoped=true&lang=css

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(89);
;// CONCATENATED MODULE: ./src/components/SimpleBaselineChart.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(SimpleBaselineChartvue_type_script_lang_js, [['render',render],['__scopeId',"data-v-042d0341"]])

/* harmony default export */ var SimpleBaselineChart = (__exports__);
;// CONCATENATED MODULE: ./src/install.js

const SimpleBaselineChartInstall = {
  install(Vue) {
    Vue.component('SimpleBaselineChart', SimpleBaselineChart);
  }

};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SimpleBaselineChartInstall);
}

/* harmony default export */ var install = (SimpleBaselineChartInstall);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (install);


}();
module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=SimpleBaselineChart.common.js.map