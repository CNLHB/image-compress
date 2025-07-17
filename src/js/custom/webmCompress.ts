// @ts-nocheck
import pngquant from './pngquant.min'
function l() {}
export const compressImageWebm = async (data: any) => { 
  return new Promise(async (resolve, reject) => { 
    const {file: A, level: i} = data;
    try {
        let b = await fn(await A.arrayBuffer());
        b = await tn(b, {
            quality: sn[i]
        });
        const R = new Blob([b],{
            type: "image/webp"
        });
        resolve({
            type: "finished",
            blob: R
        })
    } catch {
        reject({
            type: "error"
        })
    }
  });
};
const sn = {
    slight: "85",
    normal: "75",
    strong: "50",
    extreme: "20"
};

const en = {
    quality: 75,
    target_size: 0,
    target_PSNR: 0,
    method: 4,
    sns_strength: 50,
    filter_strength: 60,
    filter_sharpness: 0,
    filter_type: 1,
    partitions: 0,
    segments: 4,
    pass: 1,
    show_compressed: 0,
    preprocessing: 0,
    autofilter: 0,
    partition_limit: 0,
    alpha_compression: 1,
    alpha_filtering: 1,
    alpha_quality: 100,
    lossless: 0,
    exact: 0,
    image_hint: 0,
    emulate_jpeg_size: 0,
    thread_level: 0,
    low_memory: 0,
    near_lossless: 100,
    use_delta_palette: 0,
    use_sharp_yuv: 0
};
function te(d, A, i={}) {
    return d({
        noInitialRun: !0,
        instantiateWasm: void 0,
        ...i
    })
}
const rn = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]));
let I;
async function nn(d, A) {
    if (await rn()) {
        const b = await import("./webp_enc_simd-DbPpnQ0e.js");
        return I = te(b.default, d, A),
        I
    }
    // const i = await import("./webp_enc-Sr_pEvPt.js");
    // return I = te(i.default, d, A),
    // I
}
async function tn(d, A={}) {
    I || (I = nn());
    const i = {
        ...en,
        ...A
    }
      , R = (await I).encode(d.data, d.width, d.height, i);
    if (!R)
        throw new Error("Encoding error.");
    return R.buffer
}
var on = ( () => {
    var d = import.meta.url;
    return function(i={}) {
        var i = typeof i < "u" ? i : {}, b, R;
        i.ready = new Promise(function(e, r) {
            b = e,
            R = r
        }
        );
        const ke = globalThis.ServiceWorkerGlobalScope !== void 0 && typeof self < "u" && globalThis.caches && globalThis.caches.default !== void 0
          , Se = typeof process == "object" && process.release && process.release.name === "node";
        (ke || Se) && (globalThis.ImageData || (globalThis.ImageData = class {
            constructor(r, n, t) {
                this.data = r,
                this.width = n,
                this.height = t
            }
        }
        ),
        import.meta.url === void 0 && (import.meta.url = "https://localhost"),
        typeof self < "u" && self.location === void 0 && (self.location = {
            href: ""
        }));
        var oe = Object.assign({}, i)
          , ae = typeof window == "object"
          , L = typeof importScripts == "function";
        typeof process == "object" && typeof process.versions == "object" && process.versions.node;
        var T = "";
        function We(e) {
            return i.locateFile ? i.locateFile(e, T) : T + e
        }
        var Z;
        (ae || L) && (L ? T = self.location.href : typeof document < "u" && document.currentScript && (T = document.currentScript.src),
        d && (T = d),
        T.indexOf("blob:") !== 0 ? T = T.substr(0, T.replace(/[?#].*/, "").lastIndexOf("/") + 1) : T = "",
        L && (Z = e => {
            var r = new XMLHttpRequest;
            return r.open("GET", e, !1),
            r.responseType = "arraybuffer",
            r.send(null),
            new Uint8Array(r.response)
        }
        )),
        i.print;
        var O = i.printErr || void 0;
        Object.assign(i, oe),
        oe = null,
        i.arguments && i.arguments,
        i.thisProgram && i.thisProgram,
        i.quit && i.quit;
        var V;
        i.wasmBinary && (V = i.wasmBinary),
        i.noExitRuntime,
        typeof WebAssembly != "object" && z("no native wasm support detected");
        var q, fe = !1;
        function Ie(e, r, n) {
            for (var t = r + n, o = ""; !(r >= t); ) {
                var a = e[r++];
                if (!a)
                    return o;
                if (!(a & 128)) {
                    o += String.fromCharCode(a);
                    continue
                }
                var s = e[r++] & 63;
                if ((a & 224) == 192) {
                    o += String.fromCharCode((a & 31) << 6 | s);
                    continue
                }
                var f = e[r++] & 63;
                if ((a & 240) == 224 ? a = (a & 15) << 12 | s << 6 | f : a = (a & 7) << 18 | s << 12 | f << 6 | e[r++] & 63,
                a < 65536)
                    o += String.fromCharCode(a);
                else {
                    var u = a - 65536;
                    o += String.fromCharCode(55296 | u >> 10, 56320 | u & 1023)
                }
            }
            return o
        }
        function Me(e, r) {
            return e ? Ie(_, e, r) : ""
        }
        function je(e, r, n, t) {
            if (!(t > 0))
                return 0;
            for (var o = n, a = n + t - 1, s = 0; s < e.length; ++s) {
                var f = e.charCodeAt(s);
                if (f >= 55296 && f <= 57343) {
                    var u = e.charCodeAt(++s);
                    f = 65536 + ((f & 1023) << 10) | u & 1023
                }
                if (f <= 127) {
                    if (n >= a)
                        break;
                    r[n++] = f
                } else if (f <= 2047) {
                    if (n + 1 >= a)
                        break;
                    r[n++] = 192 | f >> 6,
                    r[n++] = 128 | f & 63
                } else if (f <= 65535) {
                    if (n + 2 >= a)
                        break;
                    r[n++] = 224 | f >> 12,
                    r[n++] = 128 | f >> 6 & 63,
                    r[n++] = 128 | f & 63
                } else {
                    if (n + 3 >= a)
                        break;
                    r[n++] = 240 | f >> 18,
                    r[n++] = 128 | f >> 12 & 63,
                    r[n++] = 128 | f >> 6 & 63,
                    r[n++] = 128 | f & 63
                }
            }
            return r[n] = 0,
            n - o
        }
        function He(e, r, n) {
            return je(e, _, r, n)
        }
        function De(e) {
            for (var r = 0, n = 0; n < e.length; ++n) {
                var t = e.charCodeAt(n);
                t <= 127 ? r++ : t <= 2047 ? r += 2 : t >= 55296 && t <= 57343 ? (r += 4,
                ++n) : r += 3
            }
            return r
        }
        var U, _, M, J, m, p, se, ue;
        function le() {
            var e = q.buffer;
            i.HEAP8 = U = new Int8Array(e),
            i.HEAP16 = M = new Int16Array(e),
            i.HEAP32 = m = new Int32Array(e),
            i.HEAPU8 = _ = new Uint8Array(e),
            i.HEAPU16 = J = new Uint16Array(e),
            i.HEAPU32 = p = new Uint32Array(e),
            i.HEAPF32 = se = new Float32Array(e),
            i.HEAPF64 = ue = new Float64Array(e)
        }
        var ce, de = [], pe = [], ve = [];
        function Oe() {
            if (i.preRun)
                for (typeof i.preRun == "function" && (i.preRun = [i.preRun]); i.preRun.length; )
                    Ne(i.preRun.shift());
            Q(de)
        }
        function Ve() {
            Q(pe)
        }
        function Be() {
            if (i.postRun)
                for (typeof i.postRun == "function" && (i.postRun = [i.postRun]); i.postRun.length; )
                    qe(i.postRun.shift());
            Q(ve)
        }
        function Ne(e) {
            de.unshift(e)
        }
        function Le(e) {
            pe.unshift(e)
        }
        function qe(e) {
            ve.unshift(e)
        }
        var k = 0
          , B = null;
        function ze(e) {
            k++,
            i.monitorRunDependencies && i.monitorRunDependencies(k)
        }
        function Ge(e) {
            if (k--,
            i.monitorRunDependencies && i.monitorRunDependencies(k),
            k == 0 && B) {
                var r = B;
                B = null,
                r()
            }
        }
        function z(e) {
            i.onAbort && i.onAbort(e),
            e = "Aborted(" + e + ")",
            O(e),
            fe = !0,
            e += ". Build with -sASSERTIONS for more info.";
            var r = new WebAssembly.RuntimeError(e);
            throw R(r),
            r
        }
        var Ke = "data:application/octet-stream;base64,";
        function he(e) {
            return e.startsWith(Ke)
        }
        var S;
        i.locateFile ? (S = "webp_dec.wasm",
        he(S) || (S = We(S))) : S = new URL("" + new URL("webp_dec-C990n7mh.wasm",import.meta.url).href,import.meta.url).href;
        function ge(e) {
            try {
                if (e == S && V)
                    return new Uint8Array(V);
                if (Z)
                    return Z(e);
                throw "both async and sync fetching of the wasm failed"
            } catch (r) {
                z(r)
            }
        }
        function Xe(e) {
            return !V && (ae || L) && typeof fetch == "function" ? fetch(e, {
                credentials: "same-origin"
            }).then(function(r) {
                if (!r.ok)
                    throw "failed to load wasm binary file at '" + e + "'";
                return r.arrayBuffer()
            }).catch(function() {
                return ge(e)
            }) : Promise.resolve().then(function() {
                return ge(e)
            })
        }
        function _e(e, r, n) {
            return Xe(e).then(function(t) {
                return WebAssembly.instantiate(t, r)
            }).then(function(t) {
                return t
            }).then(n, function(t) {
                O("failed to asynchronously prepare wasm: " + t),
                z(t)
            })
        }
        function Ze(e, r, n, t) {
            return !e && typeof WebAssembly.instantiateStreaming == "function" && !he(r) && typeof fetch == "function" ? fetch(r, {
                credentials: "same-origin"
            }).then(function(o) {
                var a = WebAssembly.instantiateStreaming(o, n);
                return a.then(t, function(s) {
                    return O("wasm streaming compile failed: " + s),
                    O("falling back to ArrayBuffer instantiation"),
                    _e(r, n, t)
                })
            }) : _e(r, n, t)
        }
        function Je() {
            var e = {
                a: Zr
            };
            function r(t, o) {
                var a = t.exports;
                return i.asm = a,
                q = i.asm.s,
                le(),
                ce = i.asm.y,
                Le(i.asm.t),
                Ge(),
                a
            }
            ze();
            function n(t) {
                r(t.instance)
            }
            if (i.instantiateWasm)
                try {
                    return i.instantiateWasm(e, r)
                } catch (t) {
                    O("Module.instantiateWasm callback failed with error: " + t),
                    R(t)
                }
            return Ze(V, S, e, n).catch(R),
            {}
        }
        function Q(e) {
            for (; e.length > 0; )
                e.shift()(i)
        }
        function Qe(e) {
            this.excPtr = e,
            this.ptr = e - 24,
            this.set_type = function(r) {
                p[this.ptr + 4 >> 2] = r
            }
            ,
            this.get_type = function() {
                return p[this.ptr + 4 >> 2]
            }
            ,
            this.set_destructor = function(r) {
                p[this.ptr + 8 >> 2] = r
            }
            ,
            this.get_destructor = function() {
                return p[this.ptr + 8 >> 2]
            }
            ,
            this.set_refcount = function(r) {
                m[this.ptr >> 2] = r
            }
            ,
            this.set_caught = function(r) {
                r = r ? 1 : 0,
                U[this.ptr + 12 >> 0] = r
            }
            ,
            this.get_caught = function() {
                return U[this.ptr + 12 >> 0] != 0
            }
            ,
            this.set_rethrown = function(r) {
                r = r ? 1 : 0,
                U[this.ptr + 13 >> 0] = r
            }
            ,
            this.get_rethrown = function() {
                return U[this.ptr + 13 >> 0] != 0
            }
            ,
            this.init = function(r, n) {
                this.set_adjusted_ptr(0),
                this.set_type(r),
                this.set_destructor(n),
                this.set_refcount(0),
                this.set_caught(!1),
                this.set_rethrown(!1)
            }
            ,
            this.add_ref = function() {
                var r = m[this.ptr >> 2];
                m[this.ptr >> 2] = r + 1
            }
            ,
            this.release_ref = function() {
                var r = m[this.ptr >> 2];
                return m[this.ptr >> 2] = r - 1,
                r === 1
            }
            ,
            this.set_adjusted_ptr = function(r) {
                p[this.ptr + 16 >> 2] = r
            }
            ,
            this.get_adjusted_ptr = function() {
                return p[this.ptr + 16 >> 2]
            }
            ,
            this.get_exception_ptr = function() {
                var r = Fe(this.get_type());
                if (r)
                    return p[this.excPtr >> 2];
                var n = this.get_adjusted_ptr();
                return n !== 0 ? n : this.excPtr
            }
        }
        function Ye(e, r, n) {
            var t = new Qe(e);
            throw t.init(r, n),
            e
        }
        function xe(e, r, n, t, o) {}
        function Y(e) {
            switch (e) {
            case 1:
                return 0;
            case 2:
                return 1;
            case 4:
                return 2;
            case 8:
                return 3;
            default:
                throw new TypeError("Unknown type size: " + e)
            }
        }
        function er() {
            for (var e = new Array(256), r = 0; r < 256; ++r)
                e[r] = String.fromCharCode(r);
            me = e
        }
        var me = void 0;
        function y(e) {
            for (var r = "", n = e; _[n]; )
                r += me[_[n++]];
            return r
        }
        var j = {}
          , W = {}
          , G = {}
          , rr = 48
          , nr = 57;
        function tr(e) {
            if (e === void 0)
                return "_unknown";
            e = e.replace(/[^a-zA-Z0-9_]/g, "$");
            var r = e.charCodeAt(0);
            return r >= rr && r <= nr ? "_" + e : e
        }
        function ir(e, r) {
            return e = tr(e),
            {
                [e]: function() {
                    return r.apply(this, arguments)
                }
            }[e]
        }
        function x(e, r) {
            var n = ir(r, function(t) {
                this.name = r,
                this.message = t;
                var o = new Error(t).stack;
                o !== void 0 && (this.stack = this.toString() + `
` + o.replace(/^Error(:[^\n]*)?\n/, ""))
            });
            return n.prototype = Object.create(e.prototype),
            n.prototype.constructor = n,
            n.prototype.toString = function() {
                return this.message === void 0 ? this.name : this.name + ": " + this.message
            }
            ,
            n
        }
        var ye = void 0;
        function g(e) {
            throw new ye(e)
        }
        var be = void 0;
        function we(e) {
            throw new be(e)
        }
        function or(e, r, n) {
            e.forEach(function(f) {
                G[f] = r
            });
            function t(f) {
                var u = n(f);
                u.length !== e.length && we("Mismatched type converter count");
                for (var l = 0; l < e.length; ++l)
                    $(e[l], u[l])
            }
            var o = new Array(r.length)
              , a = []
              , s = 0;
            r.forEach( (f, u) => {
                W.hasOwnProperty(f) ? o[u] = W[f] : (a.push(f),
                j.hasOwnProperty(f) || (j[f] = []),
                j[f].push( () => {
                    o[u] = W[f],
                    ++s,
                    s === a.length && t(o)
                }
                ))
            }
            ),
            a.length === 0 && t(o)
        }
        function $(e, r, n={}) {
            if (!("argPackAdvance"in r))
                throw new TypeError("registerType registeredInstance requires argPackAdvance");
            var t = r.name;
            if (e || g('type "' + t + '" must have a positive integer typeid pointer'),
            W.hasOwnProperty(e)) {
                if (n.ignoreDuplicateRegistrations)
                    return;
                g("Cannot register type '" + t + "' twice")
            }
            if (W[e] = r,
            delete G[e],
            j.hasOwnProperty(e)) {
                var o = j[e];
                delete j[e],
                o.forEach(a => a())
            }
        }
        function ar(e, r, n, t, o) {
            var a = Y(n);
            r = y(r),
            $(e, {
                name: r,
                fromWireType: function(s) {
                    return !!s
                },
                toWireType: function(s, f) {
                    return f ? t : o
                },
                argPackAdvance: 8,
                readValueFromPointer: function(s) {
                    var f;
                    if (n === 1)
                        f = U;
                    else if (n === 2)
                        f = M;
                    else if (n === 4)
                        f = m;
                    else
                        throw new TypeError("Unknown boolean type size: " + r);
                    return this.fromWireType(f[s >> a])
                },
                destructorFunction: null
            })
        }
        var ee = []
          , w = [{}, {
            value: void 0
        }, {
            value: null
        }, {
            value: !0
        }, {
            value: !1
        }];
        function Ae(e) {
            e > 4 && --w[e].refcount === 0 && (w[e] = void 0,
            ee.push(e))
        }
        function fr() {
            for (var e = 0, r = 5; r < w.length; ++r)
                w[r] !== void 0 && ++e;
            return e
        }
        function sr() {
            for (var e = 5; e < w.length; ++e)
                if (w[e] !== void 0)
                    return w[e];
            return null
        }
        function ur() {
            i.count_emval_handles = fr,
            i.get_first_emval = sr
        }
        var H = {
            toValue: e => (e || g("Cannot use deleted val. handle = " + e),
            w[e].value),
            toHandle: e => {
                switch (e) {
                case void 0:
                    return 1;
                case null:
                    return 2;
                case !0:
                    return 3;
                case !1:
                    return 4;
                default:
                    {
                        var r = ee.length ? ee.pop() : w.length;
                        return w[r] = {
                            refcount: 1,
                            value: e
                        },
                        r
                    }
                }
            }
        };
        function re(e) {
            return this.fromWireType(m[e >> 2])
        }
        function lr(e, r) {
            r = y(r),
            $(e, {
                name: r,
                fromWireType: function(n) {
                    var t = H.toValue(n);
                    return Ae(n),
                    t
                },
                toWireType: function(n, t) {
                    return H.toHandle(t)
                },
                argPackAdvance: 8,
                readValueFromPointer: re,
                destructorFunction: null
            })
        }
        function cr(e, r) {
            switch (r) {
            case 2:
                return function(n) {
                    return this.fromWireType(se[n >> 2])
                }
                ;
            case 3:
                return function(n) {
                    return this.fromWireType(ue[n >> 3])
                }
                ;
            default:
                throw new TypeError("Unknown float type: " + e)
            }
        }
        function dr(e, r, n) {
            var t = Y(n);
            r = y(r),
            $(e, {
                name: r,
                fromWireType: function(o) {
                    return o
                },
                toWireType: function(o, a) {
                    return a
                },
                argPackAdvance: 8,
                readValueFromPointer: cr(r, t),
                destructorFunction: null
            })
        }
        function pr(e) {
            for (; e.length; ) {
                var r = e.pop()
                  , n = e.pop();
                n(r)
            }
        }
        function vr(e, r, n, t, o, a) {
            var s = r.length;
            s < 2 && g("argTypes array size mismatch! Must at least get return value and 'this' types!");
            for (var f = r[1] !== null && n !== null, u = !1, l = 1; l < r.length; ++l)
                if (r[l] !== null && r[l].destructorFunction === void 0) {
                    u = !0;
                    break
                }
            var h = r[0].name !== "void"
              , c = s - 2
              , v = new Array(c)
              , E = []
              , F = [];
            return function() {
                arguments.length !== c && g("function " + e + " called with " + arguments.length + " arguments, expected " + c + " args!"),
                F.length = 0;
                var N;
                E.length = f ? 2 : 1,
                E[0] = o,
                f && (N = r[1].toWireType(F, this),
                E[1] = N);
                for (var P = 0; P < c; ++P)
                    v[P] = r[P + 2].toWireType(F, arguments[P]),
                    E.push(v[P]);
                var Jr = t.apply(null, E);
                function Qr(Yr) {
                    if (u)
                        pr(F);
                    else
                        for (var D = f ? 1 : 2; D < r.length; D++) {
                            var xr = D === 1 ? N : v[D - 2];
                            r[D].destructorFunction !== null && r[D].destructorFunction(xr)
                        }
                    if (h)
                        return r[0].fromWireType(Yr)
                }
                return Qr(Jr)
            }
        }
        function hr(e, r, n) {
            if (e[r].overloadTable === void 0) {
                var t = e[r];
                e[r] = function() {
                    return e[r].overloadTable.hasOwnProperty(arguments.length) || g("Function '" + n + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + e[r].overloadTable + ")!"),
                    e[r].overloadTable[arguments.length].apply(this, arguments)
                }
                ,
                e[r].overloadTable = [],
                e[r].overloadTable[t.argCount] = t
            }
        }
        function gr(e, r, n) {
            i.hasOwnProperty(e) ? ((n === void 0 || i[e].overloadTable !== void 0 && i[e].overloadTable[n] !== void 0) && g("Cannot register public name '" + e + "' twice"),
            hr(i, e, e),
            i.hasOwnProperty(n) && g("Cannot register multiple overloads of a function with the same number of arguments (" + n + ")!"),
            i[e].overloadTable[n] = r) : (i[e] = r,
            n !== void 0 && (i[e].numArguments = n))
        }
        function _r(e, r) {
            for (var n = [], t = 0; t < e; t++)
                n.push(p[r + t * 4 >> 2]);
            return n
        }
        function mr(e, r, n) {
            i.hasOwnProperty(e) || we("Replacing nonexistant public symbol"),
            i[e].overloadTable !== void 0 && n !== void 0 ? i[e].overloadTable[n] = r : (i[e] = r,
            i[e].argCount = n)
        }
        function yr(e, r, n) {
            var t = i["dynCall_" + e];
            return n && n.length ? t.apply(null, [r].concat(n)) : t.call(null, r)
        }
        var K = [];
        function Te(e) {
            var r = K[e];
            return r || (e >= K.length && (K.length = e + 1),
            K[e] = r = ce.get(e)),
            r
        }
        function br(e, r, n) {
            if (e.includes("j"))
                return yr(e, r, n);
            var t = Te(r).apply(null, n);
            return t
        }
        function wr(e, r) {
            var n = [];
            return function() {
                return n.length = 0,
                Object.assign(n, arguments),
                br(e, r, n)
            }
        }
        function Ar(e, r) {
            e = y(e);
            function n() {
                return e.includes("j") ? wr(e, r) : Te(r)
            }
            var t = n();
            return typeof t != "function" && g("unknown function pointer with signature " + e + ": " + r),
            t
        }
        var Ee = void 0;
        function Re(e) {
            var r = Pe(e)
              , n = y(r);
            return C(r),
            n
        }
        function Tr(e, r) {
            var n = []
              , t = {};
            function o(a) {
                if (!t[a] && !W[a]) {
                    if (G[a]) {
                        G[a].forEach(o);
                        return
                    }
                    n.push(a),
                    t[a] = !0
                }
            }
            throw r.forEach(o),
            new Ee(e + ": " + n.map(Re).join([", "]))
        }
        function Er(e, r, n, t, o, a, s) {
            var f = _r(r, n);
            e = y(e),
            o = Ar(t, o),
            gr(e, function() {
                Tr("Cannot call " + e + " due to unbound types", f)
            }, r - 1),
            or([], f, function(u) {
                var l = [u[0], null].concat(u.slice(1));
                return mr(e, vr(e, l, null, o, a), r - 1),
                []
            })
        }
        function Rr(e, r, n) {
            switch (r) {
            case 0:
                return n ? function(o) {
                    return U[o]
                }
                : function(o) {
                    return _[o]
                }
                ;
            case 1:
                return n ? function(o) {
                    return M[o >> 1]
                }
                : function(o) {
                    return J[o >> 1]
                }
                ;
            case 2:
                return n ? function(o) {
                    return m[o >> 2]
                }
                : function(o) {
                    return p[o >> 2]
                }
                ;
            default:
                throw new TypeError("Unknown integer type: " + e)
            }
        }
        function $r(e, r, n, t, o) {
            r = y(r);
            var a = Y(n)
              , s = c => c;
            if (t === 0) {
                var f = 32 - 8 * n;
                s = c => c << f >>> f
            }
            var u = r.includes("unsigned"), l = (c, v) => {}
            , h;
            u ? h = function(c, v) {
                return l(v, this.name),
                v >>> 0
            }
            : h = function(c, v) {
                return l(v, this.name),
                v
            }
            ,
            $(e, {
                name: r,
                fromWireType: s,
                toWireType: h,
                argPackAdvance: 8,
                readValueFromPointer: Rr(r, a, t !== 0),
                destructorFunction: null
            })
        }
        function Cr(e, r, n) {
            var t = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array]
              , o = t[r];
            function a(s) {
                s = s >> 2;
                var f = p
                  , u = f[s]
                  , l = f[s + 1];
                return new o(f.buffer,l,u)
            }
            n = y(n),
            $(e, {
                name: n,
                fromWireType: a,
                argPackAdvance: 8,
                readValueFromPointer: a
            }, {
                ignoreDuplicateRegistrations: !0
            })
        }
        function Pr(e, r) {
            r = y(r);
            var n = r === "std::string";
            $(e, {
                name: r,
                fromWireType: function(t) {
                    var o = p[t >> 2], a = t + 4, s;
                    if (n)
                        for (var f = a, u = 0; u <= o; ++u) {
                            var l = a + u;
                            if (u == o || _[l] == 0) {
                                var h = l - f
                                  , c = Me(f, h);
                                s === void 0 ? s = c : (s += "\0",
                                s += c),
                                f = l + 1
                            }
                        }
                    else {
                        for (var v = new Array(o), u = 0; u < o; ++u)
                            v[u] = String.fromCharCode(_[a + u]);
                        s = v.join("")
                    }
                    return C(t),
                    s
                },
                toWireType: function(t, o) {
                    o instanceof ArrayBuffer && (o = new Uint8Array(o));
                    var a, s = typeof o == "string";
                    s || o instanceof Uint8Array || o instanceof Uint8ClampedArray || o instanceof Int8Array || g("Cannot pass non-string to std::string"),
                    n && s ? a = De(o) : a = o.length;
                    var f = ne(4 + a + 1)
                      , u = f + 4;
                    if (p[f >> 2] = a,
                    n && s)
                        He(o, u, a + 1);
                    else if (s)
                        for (var l = 0; l < a; ++l) {
                            var h = o.charCodeAt(l);
                            h > 255 && (C(u),
                            g("String has UTF-16 code units that do not fit in 8 bits")),
                            _[u + l] = h
                        }
                    else
                        for (var l = 0; l < a; ++l)
                            _[u + l] = o[l];
                    return t !== null && t.push(C, f),
                    f
                },
                argPackAdvance: 8,
                readValueFromPointer: re,
                destructorFunction: function(t) {
                    C(t)
                }
            })
        }
        function Fr(e, r) {
            for (var n = "", t = 0; !(t >= r / 2); ++t) {
                var o = M[e + t * 2 >> 1];
                if (o == 0)
                    break;
                n += String.fromCharCode(o)
            }
            return n
        }
        function Ur(e, r, n) {
            if (n === void 0 && (n = 2147483647),
            n < 2)
                return 0;
            n -= 2;
            for (var t = r, o = n < e.length * 2 ? n / 2 : e.length, a = 0; a < o; ++a) {
                var s = e.charCodeAt(a);
                M[r >> 1] = s,
                r += 2
            }
            return M[r >> 1] = 0,
            r - t
        }
        function kr(e) {
            return e.length * 2
        }
        function Sr(e, r) {
            for (var n = 0, t = ""; !(n >= r / 4); ) {
                var o = m[e + n * 4 >> 2];
                if (o == 0)
                    break;
                if (++n,
                o >= 65536) {
                    var a = o - 65536;
                    t += String.fromCharCode(55296 | a >> 10, 56320 | a & 1023)
                } else
                    t += String.fromCharCode(o)
            }
            return t
        }
        function Wr(e, r, n) {
            if (n === void 0 && (n = 2147483647),
            n < 4)
                return 0;
            for (var t = r, o = t + n - 4, a = 0; a < e.length; ++a) {
                var s = e.charCodeAt(a);
                if (s >= 55296 && s <= 57343) {
                    var f = e.charCodeAt(++a);
                    s = 65536 + ((s & 1023) << 10) | f & 1023
                }
                if (m[r >> 2] = s,
                r += 4,
                r + 4 > o)
                    break
            }
            return m[r >> 2] = 0,
            r - t
        }
        function Ir(e) {
            for (var r = 0, n = 0; n < e.length; ++n) {
                var t = e.charCodeAt(n);
                t >= 55296 && t <= 57343 && ++n,
                r += 4
            }
            return r
        }
        function Mr(e, r, n) {
            n = y(n);
            var t, o, a, s, f;
            r === 2 ? (t = Fr,
            o = Ur,
            s = kr,
            a = () => J,
            f = 1) : r === 4 && (t = Sr,
            o = Wr,
            s = Ir,
            a = () => p,
            f = 2),
            $(e, {
                name: n,
                fromWireType: function(u) {
                    for (var l = p[u >> 2], h = a(), c, v = u + 4, E = 0; E <= l; ++E) {
                        var F = u + 4 + E * r;
                        if (E == l || h[F >> f] == 0) {
                            var N = F - v
                              , P = t(v, N);
                            c === void 0 ? c = P : (c += "\0",
                            c += P),
                            v = F + r
                        }
                    }
                    return C(u),
                    c
                },
                toWireType: function(u, l) {
                    typeof l != "string" && g("Cannot pass non-string to C++ string type " + n);
                    var h = s(l)
                      , c = ne(4 + h + r);
                    return p[c >> 2] = h >> f,
                    o(l, c + 4, h + r),
                    u !== null && u.push(C, c),
                    c
                },
                argPackAdvance: 8,
                readValueFromPointer: re,
                destructorFunction: function(u) {
                    C(u)
                }
            })
        }
        function jr(e, r) {
            r = y(r),
            $(e, {
                isVoid: !0,
                name: r,
                argPackAdvance: 0,
                fromWireType: function() {},
                toWireType: function(n, t) {}
            })
        }
        var Hr = {};
        function Dr(e) {
            var r = Hr[e];
            return r === void 0 ? y(e) : r
        }
        function $e() {
            if (typeof globalThis == "object")
                return globalThis;
            function e(r) {
                r.$$$embind_global$$$ = r;
                var n = typeof $$$embind_global$$$ == "object" && r.$$$embind_global$$$ == r;
                return n || delete r.$$$embind_global$$$,
                n
            }
            if (typeof $$$embind_global$$$ == "object" || (typeof global == "object" && e(global) ? $$$embind_global$$$ = global : typeof self == "object" && e(self) && ($$$embind_global$$$ = self),
            typeof $$$embind_global$$$ == "object"))
                return $$$embind_global$$$;
            throw Error("unable to get global object.")
        }
        function Or(e) {
            return e === 0 ? H.toHandle($e()) : (e = Dr(e),
            H.toHandle($e()[e]))
        }
        function Vr(e) {
            e > 4 && (w[e].refcount += 1)
        }
        function Br(e, r) {
            var n = W[e];
            return n === void 0 && g(r + " has unknown type " + Re(e)),
            n
        }
        function Nr(e) {
            var r = new Array(e + 1);
            return function(n, t, o) {
                r[0] = n;
                for (var a = 0; a < e; ++a) {
                    var s = Br(p[t + a * 4 >> 2], "parameter " + a);
                    r[a + 1] = s.readValueFromPointer(o),
                    o += s.argPackAdvance
                }
                var f = new (n.bind.apply(n, r));
                return H.toHandle(f)
            }
        }
        var Ce = {};
        function Lr(e, r, n, t) {
            e = H.toValue(e);
            var o = Ce[r];
            return o || (o = Nr(r),
            Ce[r] = o),
            o(e, n, t)
        }
        function qr() {
            z("")
        }
        function zr(e, r, n) {
            _.copyWithin(e, r, r + n)
        }
        function Gr() {
            return 2147483648
        }
        function Kr(e) {
            var r = q.buffer;
            try {
                return q.grow(e - r.byteLength + 65535 >>> 16),
                le(),
                1
            } catch {}
        }
        function Xr(e) {
            var r = _.length;
            e = e >>> 0;
            var n = Gr();
            if (e > n)
                return !1;
            let t = (u, l) => u + (l - u % l) % l;
            for (var o = 1; o <= 4; o *= 2) {
                var a = r * (1 + .2 / o);
                a = Math.min(a, e + 100663296);
                var s = Math.min(n, t(Math.max(e, a), 65536))
                  , f = Kr(s);
                if (f)
                    return !0
            }
            return !1
        }
        er(),
        ye = i.BindingError = x(Error, "BindingError"),
        be = i.InternalError = x(Error, "InternalError"),
        ur(),
        Ee = i.UnboundTypeError = x(Error, "UnboundTypeError");
        var Zr = {
            n: Ye,
            o: xe,
            l: ar,
            r: lr,
            k: dr,
            c: Er,
            b: $r,
            a: Cr,
            g: Pr,
            f: Mr,
            m: jr,
            d: Ae,
            e: Or,
            i: Vr,
            h: Lr,
            j: qr,
            q: zr,
            p: Xr
        };
        Je();
        var ne = function() {
            return (ne = i.asm.u).apply(null, arguments)
        }
          , C = function() {
            return (C = i.asm.v).apply(null, arguments)
        }
          , Pe = i.___getTypeName = function() {
            return (Pe = i.___getTypeName = i.asm.w).apply(null, arguments)
        }
        ;
        i.__embind_initialize_bindings = function() {
            return (i.__embind_initialize_bindings = i.asm.x).apply(null, arguments)
        }
        ;
        var Fe = function() {
            return (Fe = i.asm.z).apply(null, arguments)
        }, X;
        B = function e() {
            X || Ue(),
            X || (B = e)
        }
        ;
        function Ue() {
            if (k > 0 || (Oe(),
            k > 0))
                return;
            function e() {
                X || (X = !0,
                i.calledRun = !0,
                !fe && (Ve(),
                b(i),
                i.onRuntimeInitialized && i.onRuntimeInitialized(),
                Be()))
            }
            i.setStatus ? (i.setStatus("Running..."),
            setTimeout(function() {
                setTimeout(function() {
                    i.setStatus("")
                }, 1),
                e()
            }, 1)) : e()
        }
        if (i.preInit)
            for (typeof i.preInit == "function" && (i.preInit = [i.preInit]); i.preInit.length > 0; )
                i.preInit.pop()();
        return Ue(),
        i.ready
    }
}
)();
let ie;
async function an(d, A) {
    ie = te(on, d, A)
}
async function fn(d) {
    ie || an();
    const i = (await ie).decode(d);
    if (!i)
        throw new Error("Decoding error");
    return i
}


