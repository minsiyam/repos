!function (e, t)
{
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.FbFClient = {})
}
    (this, function (e)
    {
        "use strict";
        function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
        function r(e, t)
        {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        function n(e, t, n)
        {
            return t && r(e.prototype, t), n && r(e, n), e
        }
        function t(t, e)
        {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), r.push.apply(r, n)), r
        }
        function s(o)
        {
            for (var e = 1; e < arguments.length; e++)
            {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2 ? t(Object(i), !0).forEach(function (e) { var t, n, r; t = o, r = i[n = e], n in t ? Object.defineProperty(t, n, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : t[n] = r }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : t(Object(i)).forEach(function (e) { Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(i, e)) })
            }
            return o
        }
        function a(e, t)
        {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && u(e, t)
        }
        function o(e)
        {
            return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) { return e.__proto__ || Object.getPrototypeOf(e) })(e)
        }
        function u(e, t)
        {
            return (u = Object.setPrototypeOf || function (e, t) { return e.__proto__ = t, e })(e, t)
        }
        function c()
        {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1; if ("function" == typeof Proxy) return !0;
            try { return Date.prototype.toString.call(Reflect.construct(Date, [], function () { })), !0 } catch (e) { return !1 }
        }
        function l(e, t, n)
        {
            return (l = c() ? Reflect.construct : function (e, t, n) {
                var r = [null]; r.push.apply(r, t);
                var o = new (Function.bind.apply(e, r)); return n && u(o, n.prototype), o
            }).apply(null, arguments)
        }
        function f(e)
        {
            var r = "function" == typeof Map ? new Map : void 0;
            return (f = function (e) {
                if (null === e || (t = e, -1 === Function.toString.call(t).indexOf("[native code]"))) return e;
                var t; if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== r) {
                    if (r.has(e)) return r.get(e);
                    r.set(e, n)
                }
                function n()
                {
                    return l(e, arguments, o(this).constructor)
                }
                return n.prototype = Object.create(e.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), u(n, e)
            })(e)
        }
        function p(e, t)
        {
            return !t || "object" != typeof t && "function" != typeof t ? function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function d(n)
        {
            var r = c();
            return function () { var e, t = o(n); return p(this, r ? (e = o(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments)) }
        }
        function h(e, t)
        {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)r[n] = e[n];
            return r
        }
        function m(e)
        {
            if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
                if (Array.isArray(e) || (e = function (e, t) {
                    if (e) {
                        if ("string" == typeof e) return h(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? h(e, t) : void 0
                    }
                }
                    (e)))
                {
                    var t = 0, n = function () { };
                    return { s: n, n: function () { return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] } }, e: function (e) { throw e }, f: n }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var r, o, i = !0, a = !1;
            return { s: function () { r = e[Symbol.iterator]() }, n: function () { var e = r.next(); return i = e.done, e }, e: function (e) { a = !0, o = e }, f: function () { try { i || null == r.return || r.return() } finally { if (a) throw o } } }
        }
        var y = function ()
        {
            a(o, f(Error)); var r = d(o);
            function o(e)
            {
                var t, n;
                return i(this, o), (t = r.call(this, (n = e).message ? n.message : n.error && n.error.message ? n.error.message : n[0] && n[0].status ? n[0].status : void 0)).name = "BioServerError", t.response = e, t
            } return o
        }(),
            g = function ()
            {
                a(r, f(Error));
                var n = d(r);
                function r(e)
                {
                    var t;
                    return i(this, r), (t = n.call(this, JSON.stringify(e))).name = "ListenerError", t.response = e, t
                } return r
            }(),
            v = function ()
            {
                a(r, f(Error));
                var n = d(r);
                function r(e)
                {
                    var t;
                    return i(this, r), (t = n.call(this, "Missing property ".concat(e))).name = "MissingPropertyError", t
                } return r
            }(), b = function () { };
        function w(t, e)
        {
            var n = e.filter(function (e) { return !t[e] }); if (0 < n.length) throw new v(n)
        }
        function S(e, t, n, r)
        {
            var o = JSON.stringify(t);
            return r("Requesting", e), n("Requesting", e, o), fetch(e, { method: "post", mode: "cors", headers: { "Content-Type": "application/json" }, body: o }).then(function (t) { return r("Received response"), t.json().then(function (e) { if (!0 === t.ok) return n("Success response content", e), e; throw n("Error response content", e), new y(e) }) })
        }
        function P(e)
        {
            return Object.values(e.reduce(function (e, t) { return (!e[t.bioLocation] || e[t.bioLocation].matchScore < t.matchScore) && (e[t.bioLocation] = { biolocation: t.bioLocation, personId: t.personId, matchScore: t.matchScore, status: t.status }), e }, {}))
        }
        function O(e)
        {
            return e.reduce(function (e, t, n) { return e[t] = Math.pow(2, n), e }, {})
        }
        function M(n)
        {
            function e(e, t) { return !0 === n[e] ? t : 0 } return [e("g", 1), e("quality", 2), e("nfiq", 4), e("minutiaMap", 8), e("vectorMap", 16), e("segmentation", 32)].reduce(function (e, t) { return e | t }, 0)
        }
        function j(n)
        {
            function e(e, t) { return !0 === n[e] ? t : 0 } return [e("none", 1), e("binarized", 2), e("minutia", 4), e("vectors", 8), e("invertedColor", 16), e("markSubjectOnFrame", 32)].reduce(function (e, t) { return e | t }, 0)
        }
        var k = function ()
        {
            function r(e, t) {
                var n, o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : b;
                if (i(this, r), !e) throw new Error("Please supply a valid taxonomy as first argument");
                if (!t) throw new Error("Please supply a valid bioServer as second argument"); this.baseAddress = "/" === (n = (t || "http://localhost/FBF/rpc/api/").trim())[n.length - 1] ? n : n + "/", this.taxonomy = e.trim(), this.debug = function (e) {
                    for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++)n[r - 1] = arguments[r];
                    return o.apply(void 0, ["[bioServer]", "debug", (new Date).toISOString(), e].concat(n))
                }, this.info = function (e)
                    {
                    for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++)n[r - 1] = arguments[r];
                    return o.apply(void 0, ["[bioServer]", "info", (new Date).toISOString(), e].concat(n))
                    }, this.suffix = "s"
            }
            return n(r, [{ key: "enroll", value: function (e, t) { var n = this, r = e.map(function (e) { if (n.debug("Enrolling biometrics", e.personId || t, e.biolocation, !!e.templates), w(e, ["biolocation", "templates"]), !e.personId && !t) throw new v("personId"); return { personId: e.personId || t, biolocation: e.biolocation, taxonomy: n.taxonomy, templates: e.templates } }); return S(this.baseAddress + "biometric" + this.suffix + "/enroll", r, this.debug, this.info) } }, { key: "identify", value: function (e, t) { var n = this, r = 1 < arguments.length && void 0 !== t ? t : {}, o = e.map(function (e) { return n.debug("Identifying biometrics", e.biolocation, !!e.templates), w(e, ["biolocation", "templates"]), { biolocation: e.biolocation, taxonomy: n.taxonomy, templates: e.templates } }), i = !1 === r.maxOnly ? function (e) { return e } : P; return S(this.baseAddress + "biometric" + this.suffix + "/identify", o, this.debug, this.info).then(function (e) { return i(e) }) } }, { key: "verify", value: function (e, t) { var n = this, r = e.map(function (e) { if (n.debug("Verifying template", e.personId || t, e.biolocation, !!e.templates), w(e, ["biolocation", "templates"]), !e.personId && !t) throw new v("personId"); return { personId: e.personId || t, biolocation: e.biolocation, taxonomy: n.taxonomy, templates: e.templates } }); return S(this.baseAddress + "biometric" + this.suffix + "/verify", r, this.debug, this.info) } }, { key: "generalize", value: function (e) { this.debug("Generalizing template", e.length); var t = { biolocation: e[0].biolocation, templates: e.map(function (e) { return e.template.template }) }; return S(this.baseAddress + "template/generalize", t, this.debug, this.info) } }, { key: "delete", value: function (e, t) { if (e && t) return this.debug("Deleting template(s)", t, "for", e), S(this.baseAddress + "biometric" + this.suffix + "/delete", { taxonomy: this.taxonomy, personId: e, biolocation: t }, this.debug, this.info) } }]), r
        }(),
            I = O(["RawBitmap", "RawWSQ", "BinarizedJPG", "BinarizedPNG", "BinarizedBMP", "BinarizedWSQ", "RefreshJPG", "RefreshPNG"]),
            A = O(["None", "MMStandard", "MMLite", "ISO", "ANSI", "NIST", "IdKit", "FujitsuStandard", "TopazStandard", "IrisIdLong", "IrisIdShort", "FujitsuStandardV2", "ROCStandard", "ROCFast", "FujitsuIFormat", "FujitsuI33Format", "FujitsuRFormat"]),
            x = Object.freeze({ imageTypes: I, templateTypes: A, refreshTypes: { ImageResponse: 0, StreamResponse: 1, None: 2 } }),
            E = function (e)
            {
                return { clientConfiguration: { minutiaeMinQuality: 10, minutiaeMaxQuality: 40, faceQuality: 140, interFrameDelay: 0 }, actions: [{ action: e.action, bioAttributes: M(e), biolocation: e.biolocation, deviceIds: e.deviceIds, refreshType: e.refreshType, templatetypes: e.templateType, imagetypes: e.imageType, refreshScale: 0, refreshProperties: j(e) }] }
            },
            R = { globalAction: "UnSubscribeAll" },
            C = { globalAction: "Configuration", clientConfiguration: { deviceEnumerationType: "EnumerateOnce" } },
            F = { globalAction: "PauseAll" },
            D = { globalAction: "ResumeAll" },
            V = function () { },
            T = function (e) { throw new g(e) }; function B(e, t) {
                var n, r = t, o = m(e);
                try
                {
                    for (o.s();
                        !(n = o.n()).done;) {
                            if (!(r = r[n.value])) return
                    }
                } catch (e) { o.e(e) } finally { o.f() } return r
        }
        function L(n)
        {
            return new Promise(function (e, t) { try { e(n()) } catch (e) { t(e) } })
        }
        function N(e)
        {
            return e && e.template && e.templateBase64 ? { template: e.template, type: e.type, quality: e.quality } : e
        }

        var z = function ()
        {
            function t(e)
            {
                var o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : V;
                i(this, t), this.defaultAddress = e || "ws://127.0.0.1:4530", this.defaultAddress.startsWith("wss://") || this.defaultAddress.startsWith("ws://") || (this.defaultAddress = "ws://" + this.defaultAddress), this.promises = {}, this.responseMapping = { Capabilities: this.extractLocations, Refresh: this.extractCaptures, Success: this.extractCaptures, Error: T, LicenseError: T, Status: this.extractStatus }, this.debug = function (e) {
                    for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++)
                        n[r - 1] = arguments[r];
                    return o.apply(void 0, ["[Listener]", "debug", (new Date).toISOString(), e].concat(n))
                },
                    this.info = function (e) {
                    for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++)
                        n[r - 1] = arguments[r];
                    return o.apply(void 0, ["[Listener]", "info", (new Date).toISOString(), e].concat(n))
                    }
            } return n(t, [{ key: "send", value: function (e) { this.info("Sending request"), this.debug(JSON.stringify(e)), this.socket.send(JSON.stringify(e)) } }, { key: "connect", value: function (e) { var r = this; return this.socket = new WebSocket(e || this.defaultAddress), this.socket.onmessage = function (e) { if (e.data) { var t = JSON.parse(e.data); r.debug("Received", t); var n = t.status; if (n && r.responseMapping[n]) return r.debug("Processing", n), r.responseMapping[n].bind(r)(t); r.debug("Unsupported response", n) } }, new Promise(function (e, t) { r.socket.onopen = function () { r.info("Connected to the listener"), e() }, r.socket.onerror = function () { return t(new g({ message: "Unable to connect to device listener" })) } }) } }, { key: "isConnected", value: function () { return !!this.socket } }, { key: "capture", value: function (r, o, e) { var i = this, a = 2 < arguments.length && void 0 !== e ? e : V; return this.debug("Capture", r), new Promise(function (e, t) { i.promises.capture = { resolve: e, reject: t, stream: o, status: a }; var n = s({}, r); n.action = "Subscribe", !0 === r.snap && (n.action = "Snap", i.debug("DEPRECATED use of capture({ snap: true }, streamFunc). Please use .snap(..., streamFunc) instead")), i.send(E(n)) }) } }, { key: "snap", value: function (r, e, t) { var o = this, i = 1 < arguments.length && void 0 !== e ? e : V, a = 2 < arguments.length && void 0 !== t ? t : V; this.debug("Snap preview", r); var n = r.templateType; return n && (A[n] || Object.values(A).includes(n)) ? new Promise(function (n, e) { o.promises.capture = { stream: function (e) { i(e); var t = e && e[0] && e[0].status; if (t && "Success" === t.response) return o.info("Capture complete"), n(e) }, status: a, reject: e }; var t = s(s({}, r), {}, { action: "Snap" }); o.send(E(t)) }) : Promise.reject("snap() requires a valid template type. Input: ".concat(n)) } }, { key: "snap3", value: function (t, n, e) { var r = this, o = 2 < arguments.length && void 0 !== e ? e : V, i = []; return this.snap(t, o, n).then(function (e) { return i.push(e[0]), n(i), r.snap(t, o, n) }).then(function (e) { return i.push(e[0]), n(i), r.snap(t, o, n) }).then(function (e) { return i.push(e[0]), i }) } }, { key: "stop", value: function (e) { var t = this; this.debug("Requesting stop"); var n = s({}, e); return n.action = e.action || "UnSubscribe", L(function () { return t.send(E(n)) }) } }, { key: "pause", value: function () { var e = this; return this.debug("Pausing capture"), L(function () { return e.send(F) }) } }, { key: "resume", value: function () { var e = this; return this.debug("Resuming capture"), L(function () { return e.send(D) }) } }, { key: "disconnect", value: function () { var n = this; return this.socket ? new Promise(function (e) { n.send(R); var t = setInterval(function () { n.debug("Attempting to close WS - current state: ", n.socket.readyState, " - bytes left: ", n.socket.bufferedAmount), (n.socket.readyState < 2 && 0 === n.socket.bufferedAmount || n.socket.readyState <= 3) && (n.socket.close(), clearInterval(t), n.debug("Socket closed"), n.socket = null, e()) }, 200) }) : Promise.resolve() } }, { key: "getDevices", value: function () { var n = this; return new Promise(function (e, t) { return n.promises.devices = { resolve: e, reject: t }, n.send(C), null }) } }, { key: "extractLocations", value: function (e) { if (this.debug("Extracting available devices and biolocations"), this.promises.devices) { if (0 === e.devices.length) return this.promises.devices.reject(); this.promises.devices.resolve(e.devices) } } }, { key: "extractCaptures", value: function (t) { var n = this, e = t.results.filter(function (e) { return e.images[0] }).map(function (e) { return n.extractOneCapture(e, t.status) }); if (!B([0, "image", "data"], e)) return this.debug("No capture data"), this.promises.capture.reject(new g("No capture data")); this.debug("Streaming capture", e); var r = this.promises.capture.stream; return r && r(e), this.promises.capture.resolve ? (this.info("Capture complete"), this.promises.capture.resolve(e)) : void 0 } }, { key: "extractOneCapture", value: function (e, t) { this.debug("Extracting captured data", e); var n, r = B(["images", 0], e); return { image: { data: r.imageBase64 || r.rawBitmapData, nFIQ: r.nFIQ }, images: e.images && e.images.reduce(function (e, t) { var n; return e[t.type] = { data: (n = t).imageBase64 || n.rawBitmapData || n.RawWSQ, nFIQ: n.nFIQ, type: n.type }, e }, {}), template: N(B(["templates", 0], e)), templates: e.templates.map(N), status: { capture: e.status, response: t }, biolocation: e.bioLocation, metadata: (n = e.metadata) ? n.reduce(function (e, t) { var n = t.key, r = t.value; return e[n] = r, e }, {}) : n } } }, { key: "extractStatus", value: function (e) { var t, n, r, o, i; e.results && e.results[0] && (n = (t = e.results[0]).message, r = t.status, i = n || r, (o = this.promises.capture.status) && i && o(i)) } }]), t
        }();
        e.BioServer = k,
            e.enums = x,
            e.Listener = z,
            e.palmVeinInstructions = { Captured: "Capture successful.", PamlVeinMessageBrightMoment: "Trying to capture again. Don't move your hand.", PamlVeinMessageBrightNg: "Trying to capture again. Don't move your hand.", PamlVeinMessageClose: "Bring your hand slightly close to the sensor.", PamlVeinMessageCorrectly: "With your fingers spread, place your hand at the correct position again.", PamlVeinMessageEvenUp: "Lay your hand flat.", PamlVeinMessageFingerOpen: "Spread your fingers.", PamlVeinMessageFlattenOut: "Please flatten the hand, and bring it closer to the sensor a little.", PamlVeinMessageHoldUpHand: "Place your hand above the sensor.", PamlVeinMessageKeepAway: "Keep away your hand from the sensor.", PamlVeinMessageMoveAway: "Move your hand away from the sensor.", PamlVeinMessageMoveBackward: "Move your hand slightly toward you.", PamlVeinMessageMoveForward: "Move your hand slightly away from you.", PamlVeinMessageMoveLeft: "Move your hand slightly to the left.", PamlVeinMessageMoveRight: "Move your hand slightly to the right.", PamlVeinMessageNoGuidance: "", PamlVeinMessageSaving: "Don't move your hand.", PamlVeinMessageSensorOrient: "Place your hand parallel to the sensor.", PamlVeinMessageStopMoving: "Don't move your hand." }, e.version = "2097-1ad1bf78-es", Object.defineProperty(e, "__esModule", { value: !0 })
    });