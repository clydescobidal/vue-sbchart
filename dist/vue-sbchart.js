import { defineComponent as Y, computed as q, ref as T, onMounted as J, openBlock as b, createElementBlock as y, normalizeStyle as L, createCommentVNode as D, Fragment as K, renderList as Q, createElementVNode as S, toDisplayString as z, unref as F } from "vue";
const X = ["src"], Z = {
  key: 2,
  class: "simple-baseline-series"
}, P = { class: "serie-value" }, x = /* @__PURE__ */ Y({
  __name: "VueSBChart",
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
        return {
          upColor: "#008000",
          downColor: "#ff0000",
          lineWidth: 1
        };
      }
    },
    interactive: {
      type: Boolean,
      default: !0
    },
    gridLines: {
      type: Boolean,
      default: !0
    }
  },
  setup(w) {
    const n = w, f = (e) => {
      var t = e.toString(16);
      return t.length == 1 ? "0" + t : t;
    }, C = (e) => "#" + f(e.r) + f(e.g) + f(e.b), M = (e) => {
      const t = new Date(e * 1e3);
      return `${t.getDate()}/${t.getMonth()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`;
    }, k = q(() => n.series.sort((t, r) => t.timestamp - r.timestamp)), E = (e) => {
      let t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
      return t ? { r: parseInt(t[1], 16), g: parseInt(t[2], 16), b: parseInt(t[3], 16) } : null;
    }, s = E(n.options.upColor) || { r: 0, g: 128, b: 0 }, i = E(n.options.downColor) || { r: 255, g: 0, b: 0 }, G = n.options.lineWidth || 1, R = T(), O = T([]), m = T(0), I = T(), U = () => {
      if (k.value.length == 0)
        return;
      let e = document.createElement("canvas"), t = R.value;
      e.width = t.offsetWidth * 2, e.height = t.offsetHeight * 2;
      let r = e.getContext("2d");
      r.lineWidth = 1;
      let v = n.baseValue, o = k.value.map((W) => W.value), u = 1, p = o.length, g = u / p;
      m.value = e.width / (p - 1) - g;
      let h = e.height - u, c = Math.max.apply(Math, o), $ = Math.min.apply(Math, o), V = (v - $) / (c - $), d = (h - u) * V;
      d < 0 && (d = 0);
      let a = document.createElement("canvas");
      a.width = e.width, a.height = e.height;
      let l = a.getContext("2d");
      N(r, k.value, c, $, h, u, m.value, d, e, "down"), l == null || l.drawImage(e, 0, 0), r == null || r.clearRect(0, 0, e.width, e.height), r == null || r.beginPath(), d > h ? e.height = 1 : e.height = h - d, e.height <= 0 && (e.height = 1), N(r, k.value, c, $, h, u, m.value, d, e, "up", !0), l == null || l.drawImage(e, 0, 0);
      const _ = a.toDataURL("image/png");
      I.value = _;
    }, N = (e, t, r, v, o, u, p, g, h, c, $ = !1) => {
      e.beginPath();
      let V = 0, d = `rgb(${s.r}, ${s.g}, ${s.b})`;
      c == "down" && (d = `rgb(${i.r}, ${i.g}, ${i.b})`), t.forEach((l, _) => {
        let W = (l.value - v) / (r - v), A = (o - u) * W, B = 0, j = o - A;
        _ == 0 ? B = u : B = p * _, e.lineTo(B, j), _ > -1 && $ && n.interactive && O.value.push({
          y: j / 2 - 5,
          x: B / 2,
          serie: l
        });
      }), e.strokeStyle = d, e.lineWidth = G, e.stroke();
      let a;
      if (c == "up") {
        a = e.createLinearGradient(0, 0, 0, o);
        let l = (o - g) / o;
        l > 1 ? l = 1 : l < 0 && (l = 0), a.addColorStop(0, `rgba(${s.r}, ${s.g}, ${s.b}, 0.5)`), a.addColorStop(l, `rgba(${s.r}, ${s.g}, ${s.b}, 0)`), e.lineTo(p * (t.length - 1), o - g), e.lineTo(p * (V - t.length), o - g);
      } else {
        let l = g / o;
        l > 1 ? l = 1 : l < 0 && (l = 0), a = e.createLinearGradient(0, o, 0, 0), a.addColorStop(0, `rgba(${i.r}, ${i.g}, ${i.b}, 0.5)`), a.addColorStop(l, `rgba(${i.r}, ${i.g}, ${i.b}, 0)`), e.lineTo(h.width - u, p), e.lineTo(u, p);
      }
      c == "down" && (e.fillStyle = "transparent", e.fillRect(0, 0, h.width, o - g)), a && (e.fillStyle = a), e.globalCompositeOperation = "destination-over", e.fill(), e.globalCompositeOperation = "source-over";
    };
    return J(() => {
      U();
    }), (e, t) => (b(), y("div", {
      ref_key: "simpleBaselineChart",
      ref: R,
      class: "simple-baseline-chart"
    }, [
      n.gridLines ? (b(), y("div", {
        key: 0,
        class: "simple-baseline-grid",
        style: L({ backgroundSize: `${m.value / 2}px ${m.value / 2}px` })
      }, null, 4)) : D("", !0),
      I.value ? (b(), y("img", {
        key: 1,
        src: I.value
      }, null, 8, X)) : D("", !0),
      n.interactive ? (b(), y("div", Z, [
        (b(!0), y(K, null, Q(O.value, (r, v) => (b(), y("div", {
          key: v,
          class: "simple-baseline-serie",
          style: L({ width: `${m.value / 2}px`, left: `${r.x}px` })
        }, [
          S("div", {
            class: "serie-wrapper",
            style: L({ top: `${r.y}px` })
          }, [
            S("div", null, [
              S("div", null, z(M(r.serie.timestamp)), 1),
              S("div", P, z(r.serie.value), 1)
            ]),
            S("span", {
              style: L({ backgroundColor: `${r.serie.value > n.baseValue ? C(F(s)) : C(F(i))}` })
            }, null, 4)
          ], 4)
        ], 4))), 128))
      ])) : D("", !0)
    ], 512));
  }
});
const H = (w, n) => {
  const f = w.__vccOpts || w;
  for (const [C, M] of n)
    f[C] = M;
  return f;
}, te = /* @__PURE__ */ H(x, [["__scopeId", "data-v-6c9e2924"]]);
export {
  te as VueSBChart
};
