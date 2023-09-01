import { defineComponent as J, computed as j, ref as L, onMounted as K, openBlock as _, createElementBlock as $, normalizeStyle as M, createCommentVNode as z, Fragment as Q, renderList as X, normalizeClass as Z, createElementVNode as y, toDisplayString as F, unref as G, pushScopeId as P, popScopeId as H } from "vue";
const x = (h) => (P("data-v-94ca05f0"), h = h(), H(), h), ee = ["src"], te = {
  key: 2,
  class: "simple-baseline-series"
}, le = { class: "simple-baseline-serie-value" }, re = /* @__PURE__ */ x(() => /* @__PURE__ */ y("span", { class: "arrow-down" }, null, -1)), oe = /* @__PURE__ */ J({
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
  setup(h) {
    const s = h, f = (e) => {
      var t = e.toString(16);
      return t.length == 1 ? "0" + t : t;
    }, C = (e) => "#" + f(e.r) + f(e.g) + f(e.b), W = (e) => {
      const t = new Date(e * 1e3);
      return `${t.getDate()}/${t.getMonth()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`;
    }, k = j(() => s.series.sort((t, l) => t.timestamp - l.timestamp)), O = (e) => {
      let t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
      return t ? { r: parseInt(t[1], 16), g: parseInt(t[2], 16), b: parseInt(t[3], 16) } : null;
    }, u = O(s.options.upColor) || { r: 0, g: 128, b: 0 }, p = O(s.options.downColor) || { r: 255, g: 0, b: 0 }, U = s.options.lineWidth || 1, B = L(), I = L([]), V = L(0), D = L(), S = j(() => {
      var e;
      return ((e = B.value) == null ? void 0 : e.clientWidth) / (s.series.length - 1);
    }), A = () => {
      if (k.value.length == 0)
        return;
      let e = document.createElement("canvas"), t = B.value;
      e.width = t.clientWidth * 2, e.height = t.clientHeight * 2;
      let l = e.getContext("2d");
      l.lineWidth = 1;
      let n = s.baseValue, a = k.value.map((w) => w.value), d = 0, m = a.length;
      V.value = e.width / (m - 1);
      let i = e.height - d, b = Math.max.apply(Math, a), c = Math.min.apply(Math, a), E = (n - c) / (b - c), g = (i - d) * E;
      g < 0 && (g = 0);
      let v = document.createElement("canvas");
      v.width = e.width, v.height = e.height;
      let o = v.getContext("2d");
      R(l, k.value, b, c, i, d, V.value, g, e, "down"), o == null || o.drawImage(e, 0, 0), l == null || l.clearRect(0, 0, e.width, e.height), l == null || l.beginPath(), g > i ? e.height = 1 : e.height = i - g, e.height <= 0 && (e.height = 1), R(l, k.value, b, c, i, d, V.value, g, e, "up", !0), o == null || o.drawImage(e, 0, 0);
      const r = v.toDataURL("image/png");
      D.value = r;
    }, R = (e, t, l, n, a, d, m, i, b, c, E = !1) => {
      e.beginPath();
      let g = 0, v = `rgb(${u.r}, ${u.g}, ${u.b})`;
      c == "down" && (v = `rgb(${p.r}, ${p.g}, ${p.b})`), t.forEach((r, w) => {
        let Y = (r.value - n) / (l - n), q = (a - d) * Y, T = 0, N = a - q;
        w == 0 ? T = d : T = m * w, e.lineTo(T, N), w > -1 && E && s.interactive && I.value.push({
          y: N / 2 - 4,
          x: T / 2,
          serie: r
        });
      }), e.strokeStyle = v, e.lineWidth = U, e.stroke();
      let o;
      if (c == "up") {
        o = e.createLinearGradient(0, 0, 0, a);
        let r = (a - i) / a;
        r > 1 ? r = 1 : r < 0 && (r = 0), o.addColorStop(0, `rgba(${u.r}, ${u.g}, ${u.b}, 0.5)`), o.addColorStop(r, `rgba(${u.r}, ${u.g}, ${u.b}, 0)`), e.lineTo(m * (t.length - 1), a - i), e.lineTo(m * (g - t.length), a - i);
      } else {
        let r = i / a;
        r > 1 ? r = 1 : r < 0 && (r = 0), o = e.createLinearGradient(0, a, 0, 0), o.addColorStop(0, `rgba(${p.r}, ${p.g}, ${p.b}, 0.5)`), o.addColorStop(r, `rgba(${p.r}, ${p.g}, ${p.b}, 0)`), e.lineTo(b.width - d, m), e.lineTo(d, m);
      }
      c == "down" && (e.fillStyle = "transparent", e.fillRect(0, 0, b.width, a - i)), o && (e.fillStyle = o), e.globalCompositeOperation = "destination-over", e.fill(), e.globalCompositeOperation = "source-over";
    };
    return K(() => {
      A();
    }), (e, t) => (_(), $("div", {
      ref_key: "simpleBaselineChart",
      ref: B,
      class: "simple-baseline-chart"
    }, [
      s.gridLines && B.value ? (_(), $("div", {
        key: 0,
        class: "simple-baseline-grid",
        style: M({ backgroundSize: `${S.value}px ${S.value}px` })
      }, null, 4)) : z("", !0),
      D.value ? (_(), $("img", {
        key: 1,
        src: D.value
      }, null, 8, ee)) : z("", !0),
      s.interactive ? (_(), $("div", te, [
        (_(!0), $(Q, null, X(I.value, (l, n) => (_(), $("div", {
          key: n,
          class: Z(["simple-baseline-serie", {
            "simple-baseline-serie-start": n == 0,
            "simple-baseline-serie-end": n == I.value.length - 1
          }]),
          style: M({
            left: `${S.value * n - (n == 0 ? 0 : S.value / 2)}px`,
            width: `${S.value / (n == 0 || n == I.value.length - 1 ? 2 : 1)}px`
          })
        }, [
          y("div", {
            class: "simple-baseline-serie-wrapper",
            style: M({ top: `${l.y}px` })
          }, [
            y("div", null, [
              y("div", null, F(W(l.serie.timestamp)), 1),
              y("div", le, F(l.serie.value), 1),
              re
            ]),
            y("span", {
              style: M({ backgroundColor: `${l.serie.value > s.baseValue ? C(G(u)) : C(G(p))}` })
            }, null, 4)
          ], 4)
        ], 6))), 128))
      ])) : z("", !0)
    ], 512));
  }
});
const ae = (h, s) => {
  const f = h.__vccOpts || h;
  for (const [C, W] of s)
    f[C] = W;
  return f;
}, ne = /* @__PURE__ */ ae(oe, [["__scopeId", "data-v-94ca05f0"]]);
export {
  ne as VueSBChart
};
