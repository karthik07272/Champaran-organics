"use strict";
! function(t, i) {
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return i(t)
    }) : "object" == typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(0, function(t) {
    function i(t) {
        this.$container, this.constraints = null, this.__$tooltiptooltip, this.__init(t)
    }

    function o(i, o) {
        var e = !0;
        return t.each(i, function(t, n) {
            return void 0 === o[t] || i[t] !== o[t] ? (e = !1, !1) : void 0
        }), e
    }

    function e(i) {
        var o = i.attr("id"),
            e = o ? r.window.document.getElementById(o) : null;
        return e ? e === i[0] : t.contains(r.window.document.body, i[0])
    }

    var n = {
            animation: "fade",
            animationDuration: 350,
            content: null,
            contentAsHTML: !1,
            contentCloning: !1,
            debug: !0,
            delay: 300,
            delayTouch: [300, 500],
            functionInit: null,
            functionBefore: null,
            functionReady: null,
            functionAfter: null,
            functionFormat: null,
            IEmin: 6,
            interactive: !1,
            multiple: !1,
            parent: null,
            plugins: ["sideTip"],
            repositionOnScroll: !1,
            restoration: "none",
            selfDestruction: !0,
            theme: [],
            timer: 0,
            trackerInterval: 500,
            trackOrigin: !1,
            trackTooltip: !1,
            trigger: "hover",
            triggerClose: {
                click: !1,
                mouseleave: !1,
                originClick: !1,
                scroll: !1,
                tap: !1,
                touchleave: !1
            },
            triggerOpen: {
                click: !1,
                mouseenter: !1,
                tap: !1,
                touchstart: !1
            },
            updateAnimation: "rotate",
            zIndex: 9999999
        },
        s = "undefined" != typeof window ? window : null,
        r = {
            hasTouchCapability: !(!s || !("ontouchstart" in s || s.DocumentTouch && s.document instanceof s.DocumentTouch || s.navigator.maxTouchPoints)),
            hasTransitions: function() {
                if (!s) return !1;
                var t = (s.document.body || s.document.documentElement).style,
                    i = "transition",
                    o = ["Moz", "Webkit", "Khtml", "O", "ms"];
                if ("string" == typeof t[i]) return !0;
                i = i.charAt(0).toUpperCase() + i.substr(1);
                for (var e = 0; e < o.length; e++)
                    if ("string" == typeof t[o[e] + i]) return !0;
                return !1
            }(),
            IE: !1,
            semVer: "4.2.6",
            window: s
        },
        _ = function() {
            this.__$emitterPrivate = t({}), this.__$emitterPublic = t({}), this.__instancesLatestArr = [], this.__plugins = {}, this._env = r
        };
    _.prototype = {
        __bridge: function(i, o, e) {
            if (!o[e]) {
                var s = function() {};
                s.prototype = i;
                var r = new s;
                r.__init && r.__init(o), t.each(i, function(t, i) {
                    0 != t.indexOf("__") && (o[t] ? n.debug && console.log("The " + t + " method of the " + e + " plugin conflicts with another plugin or native methods") : (o[t] = function() {
                        return r[t].apply(r, Array.prototype.slice.apply(arguments))
                    }, o[t].bridged = r))
                }), o[e] = r
            }
            return this
        },
        __setWindow: function(t) {
            return r.window = t, this
        },
        _getRuler: function(t) {
            return new i(t)
        },
        _off: function() {
            return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _on: function() {
            return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _one: function() {
            return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _plugin: function(i) {
            var o = this;
            if ("string" == typeof i) {
                var e = i,
                    n = null;
                return e.indexOf(".") > 0 ? n = o.__plugins[e] : t.each(o.__plugins, function(t, i) {
                    return i.name.substring(i.name.length - e.length - 1) == "." + e ? (n = i, !1) : void 0
                }), n
            }
            if (i.name.indexOf(".") < 0) throw new Error("Plugins must be namespaced");
            return o.__plugins[i.name] = i, i.core && o.__bridge(i.core, o, i.name), this
        },
        _trigger: function() {
            var t = Array.prototype.slice.apply(arguments);
            return "string" == typeof t[0] && (t[0] = {
                type: t[0]
            }), this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, t), this.__$emitterPublic.trigger.apply(this.__$emitterPublic, t), this
        },
        instances: function(i) {
            var o = [];
            return t(i || ".tooltipstered").each(function() {
                var i = t(this),
                    e = i.data("tooltipster-ns");
                e && t.each(e, function(t, e) {
                    o.push(i.data(e))
                })
            }), o
        },
        instancesLatest: function() {
            return this.__instancesLatestArr
        },
        off: function() {
            return this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        on: function() {
            return this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        one: function() {
            return this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        origins: function(i) {
            return t((i ? i + " " : "") + ".tooltipstered").toArray()
        },
        setDefaults: function(i) {
            return t.extend(n, i), this
        },
        triggerHandler: function() {
            return this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        }
    }, t.tooltipster = new _, t.Tooltipster = function(i, o) {
        this.__callbacks = {
            close: [],
            open: []
        }, this.__closingTime, this.__Content, this.__contentBcr, this.__destroyed = !1, this.__$emitterPrivate = t({}), this.__$emitterPublic = t({}), this.__enabled = !0, this.__garbageCollector, this.__Geometry, this.__lastPosition, this.__namespace = "tooltipster-" + Math.round(1e6 * Math.random()), this.__options, this.__$originParents, this.__pointerIsOverOrigin = !1, this.__previousThemes = [], this.__state = "closed", this.__timeouts = {
            close: [],
            open: null
        }, this.__touchEvents = [], this.__tracker = null, this._$origin, this._$tooltip, this.__init(i, o)
    }, t.Tooltipster.prototype = {
        __init: function(i, o) {
            var e = this;
            if (e._$origin = t(i), e.__options = t.extend(!0, {}, n, o), e.__optionsFormat(), !r.IE || r.IE >= e.__options.IEmin) {
                var s = null;
                if (void 0 === e._$origin.data("tooltipster-initialTitle") && (void 0 === (s = e._$origin.attr("title")) && (s = null), e._$origin.data("tooltipster-initialTitle", s)), null !== e.__options.content) e.__contentSet(e.__options.content);
                else {
                    var _, a = e._$origin.attr("data-tooltip-content");
                    a && (_ = t(a)), _ && _[0] ? e.__contentSet(_.first()) : e.__contentSet(s)
                }
                e._$origin.removeAttr("title").addClass("tooltipstered"), e.__prepareOrigin(), e.__prepareGC(), t.each(e.__options.plugins, function(t, i) {
                    e._plug(i)
                }), r.hasTouchCapability && t(r.window.document.body).on("touchmove." + e.__namespace + "-triggerOpen", function(t) {
                    e._touchRecordEvent(t)
                }), e._on("created", function() {
                    e.__prepareTooltip()
                })._on("repositioned", function(t) {
                    e.__lastPosition = t.position
                })
            } else e.__options.disabled = !0
        },
        __contentInsert: function() {
            var t = this,
                i = t._$tooltip.find(".tooltipster-content"),
                o = t.__Content;
            return t._trigger({
                type: "format",
                content: t.__Content,
                format: function(t) {
                    o = t
                }
            }), t.__options.functionFormat && (o = t.__options.functionFormat.call(t, t, {
                origin: t._$origin[0]
            }, t.__Content)), "string" != typeof o || t.__options.contentAsHTML ? i.empty().append(o) : i.text(o), t
        },
        __contentSet: function(i) {
            return i instanceof t && this.__options.contentCloning && (i = i.clone(!0)), this.__Content = i, this._trigger({
                type: "updated",
                content: i
            }), this
        },
        __destroyError: function() {
            throw new Error("This tooltip has been destroyed and cannot execute your method call.")
        },
        __geometry: function() {
            var i = this,
                o = i._$origin,
                e = i._$origin.is("area");
            if (e) {
                var n = i._$origin.parent().attr("name");
                o = t('img[usemap="#' + n + '"]')
            }
            var s = o[0].getBoundingClientRect(),
                _ = t(r.window.document),
                a = t(r.window),
                l = o,
                p = {
                    available: {
                        document: null,
                        window: null
                    },
                    document: {
                        size: {
                            height: _.height(),
                            width: _.width()
                        }
                    },
                    window: {
                        scroll: {
                            left: r.window.scrollX || r.window.document.documentElement.scrollLeft,
                            top: r.window.scrollY || r.window.document.documentElement.scrollTop
                        },
                        size: {
                            height: a.height(),
                            width: a.width()
                        }
                    },
                    origin: {
                        fixedLineage: !1,
                        offset: {},
                        size: {
                            height: s.bottom - s.top,
                            width: s.right - s.left
                        },
                        usemapImage: e ? o[0] : null,
                        windowOffset: {
                            bottom: s.bottom,
                            left: s.left,
                            right: s.right,
                            top: s.top
                        }
                    }
                };
            if (e) {
                var c = i._$origin.attr("shape"),
                    h = i._$origin.attr("coords");
                if (h && (h = h.split(","), t.map(h, function(t, i) {
                        h[i] = parseInt(t)
                    })), "default" != c) switch (c) {
                    case "circle":
                        var d = h[0],
                            u = h[1],
                            g = h[2],
                            f = u - g,
                            m = d - g;
                        p.origin.size.height = 2 * g, p.origin.size.width = p.origin.size.height, p.origin.windowOffset.left += m, p.origin.windowOffset.top += f;
                        break;
                    case "rect":
                        var w = h[0],
                            v = h[1],
                            y = h[2],
                            b = h[3];
                        p.origin.size.height = b - v, p.origin.size.width = y - w, p.origin.windowOffset.left += w, p.origin.windowOffset.top += v;
                        break;
                    case "poly":
                        for (var $ = 0, C = 0, O = 0, T = 0, z = "even", E = 0; E < h.length; E++) {
                            var I = h[E];
                            "even" == z ? (I > O && (O = I, 0 === E && ($ = O)), $ > I && ($ = I), z = "odd") : (I > T && (T = I, 1 == E && (C = T)), C > I && (C = I), z = "even")
                        }
                        p.origin.size.height = T - C, p.origin.size.width = O - $, p.origin.windowOffset.left += $, p.origin.windowOffset.top += C
                }
            }
            for (i._trigger({
                    type: "geometry",
                    edit: function(t) {
                        p.origin.size.height = t.height, p.origin.windowOffset.left = t.left, p.origin.windowOffset.top = t.top, p.origin.size.width = t.width
                    },
                    geometry: {
                        height: p.origin.size.height,
                        left: p.origin.windowOffset.left,
                        top: p.origin.windowOffset.top,
                        width: p.origin.size.width
                    }
                }), p.origin.windowOffset.right = p.origin.windowOffset.left + p.origin.size.width, p.origin.windowOffset.bottom = p.origin.windowOffset.top + p.origin.size.height, p.origin.offset.left = p.origin.windowOffset.left + p.window.scroll.left, p.origin.offset.top = p.origin.windowOffset.top + p.window.scroll.top, p.origin.offset.bottom = p.origin.offset.top + p.origin.size.height, p.origin.offset.right = p.origin.offset.left + p.origin.size.width, p.available.document = {
                    bottom: {
                        height: p.document.size.height - p.origin.offset.bottom,
                        width: p.document.size.width
                    },
                    left: {
                        height: p.document.size.height,
                        width: p.origin.offset.left
                    },
                    right: {
                        height: p.document.size.height,
                        width: p.document.size.width - p.origin.offset.right
                    },
                    top: {
                        height: p.origin.offset.top,
                        width: p.document.size.width
                    }
                }, p.available.window = {
                    bottom: {
                        height: Math.max(p.window.size.height - Math.max(p.origin.windowOffset.bottom, 0), 0),
                        width: p.window.size.width
                    },
                    left: {
                        height: p.window.size.height,
                        width: Math.max(p.origin.windowOffset.left, 0)
                    },
                    right: {
                        height: p.window.size.height,
                        width: Math.max(p.window.size.width - Math.max(p.origin.windowOffset.right, 0), 0)
                    },
                    top: {
                        height: Math.max(p.origin.windowOffset.top, 0),
                        width: p.window.size.width
                    }
                };
                "html" != l[0].tagName.toLowerCase();) {
                if ("fixed" == l.css("position")) {
                    p.origin.fixedLineage = !0;
                    break
                }
                l = l.parent()
            }
            return p
        },
        __optionsFormat: function() {
            return "number" == typeof this.__options.animationDuration && (this.__options.animationDuration = [this.__options.animationDuration, this.__options.animationDuration]), "number" == typeof this.__options.delay && (this.__options.delay = [this.__options.delay, this.__options.delay]), "number" == typeof this.__options.delayTouch && (this.__options.delayTouch = [this.__options.delayTouch, this.__options.delayTouch]), "string" == typeof this.__options.theme && (this.__options.theme = [this.__options.theme]), null === this.__options.parent ? this.__options.parent = t(r.window.document.body) : "string" == typeof this.__options.parent && (this.__options.parent = t(this.__options.parent)), "hover" == this.__options.trigger ? (this.__options.triggerOpen = {
                mouseenter: !0,
                touchstart: !0
            }, this.__options.triggerClose = {
                mouseleave: !0,
                originClick: !0,
                touchleave: !0
            }) : "click" == this.__options.trigger && (this.__options.triggerOpen = {
                click: !0,
                tap: !0
            }, this.__options.triggerClose = {
                click: !0,
                tap: !0
            }), this._trigger("options"), this
        },
        __prepareGC: function() {
            var i = this;
            return i.__options.selfDestruction ? i.__garbageCollector = setInterval(function() {
                var o = (new Date).getTime();
                i.__touchEvents = t.grep(i.__touchEvents, function(t, i) {
                    return o - t.time > 6e4
                }), e(i._$origin) || i.close(function() {
                    i.destroy()
                })
            }, 2e4) : clearInterval(i.__garbageCollector), i
        },
        __prepareOrigin: function() {
            var t = this;
            if (t._$origin.off("." + t.__namespace + "-triggerOpen"), r.hasTouchCapability && t._$origin.on("touchstart." + t.__namespace + "-triggerOpen touchend." + t.__namespace + "-triggerOpen touchcancel." + t.__namespace + "-triggerOpen", function(i) {
                    t._touchRecordEvent(i)
                }), t.__options.triggerOpen.click || t.__options.triggerOpen.tap && r.hasTouchCapability) {
                var i = "";
                t.__options.triggerOpen.click && (i += "click." + t.__namespace + "-triggerOpen "), t.__options.triggerOpen.tap && r.hasTouchCapability && (i += "touchend." + t.__namespace + "-triggerOpen"), t._$origin.on(i, function(i) {
                    t._touchIsMeaningfulEvent(i) && t._open(i)
                })
            }
            if (t.__options.triggerOpen.mouseenter || t.__options.triggerOpen.touchstart && r.hasTouchCapability) {
                i = "";
                t.__options.triggerOpen.mouseenter && (i += "mouseenter." + t.__namespace + "-triggerOpen "), t.__options.triggerOpen.touchstart && r.hasTouchCapability && (i += "touchstart." + t.__namespace + "-triggerOpen"), t._$origin.on(i, function(i) {
                    !t._touchIsTouchEvent(i) && t._touchIsEmulatedEvent(i) || (t.__pointerIsOverOrigin = !0, t._openShortly(i))
                })
            }
            if (t.__options.triggerClose.mouseleave || t.__options.triggerClose.touchleave && r.hasTouchCapability) {
                i = "";
                t.__options.triggerClose.mouseleave && (i += "mouseleave." + t.__namespace + "-triggerOpen "), t.__options.triggerClose.touchleave && r.hasTouchCapability && (i += "touchend." + t.__namespace + "-triggerOpen touchcancel." + t.__namespace + "-triggerOpen"), t._$origin.on(i, function(i) {
                    t._touchIsMeaningfulEvent(i) && (t.__pointerIsOverOrigin = !1)
                })
            }
            return t
        },
        __prepareTooltip: function() {
            var i = this,
                o = i.__options.interactive ? "auto" : "";
            return i._$tooltip.attr("id", i.__namespace).css({
                "pointer-events": o,
                zIndex: i.__options.zIndex
            }), t.each(i.__previousThemes, function(t, o) {
                i._$tooltip.removeClass(o)
            }), t.each(i.__options.theme, function(t, o) {
                i._$tooltip.addClass(o)
            }), i.__previousThemes = t.merge([], i.__options.theme), i
        },
        __scrollHandler: function(i) {
            var o = this;
            if (o.__options.triggerClose.scroll) o._close(i);
            else if (e(o._$origin) && e(o._$tooltip)) {
                var n = null;
                if (i.target === r.window.document) o.__Geometry.origin.fixedLineage || o.__options.repositionOnScroll && o.reposition(i);
                else {
                    n = o.__geometry();
                    var s = !1;
                    if ("fixed" != o._$origin.css("position") && o.__$originParents.each(function(i, o) {
                            var e = t(o),
                                r = e.css("overflow-x"),
                                _ = e.css("overflow-y");
                            if ("visible" != r || "visible" != _) {
                                var a = o.getBoundingClientRect();
                                if ("visible" != r && (n.origin.windowOffset.left < a.left || n.origin.windowOffset.right > a.right)) return s = !0, !1;
                                if ("visible" != _ && (n.origin.windowOffset.top < a.top || n.origin.windowOffset.bottom > a.bottom)) return s = !0, !1
                            }
                            return "fixed" != e.css("position") && void 0
                        }), s) o._$tooltip.css("visibility", "hidden");
                    else if (o._$tooltip.css("visibility", "visible"), o.__options.repositionOnScroll) o.reposition(i);
                    else {
                        var _ = n.origin.offset.left - o.__Geometry.origin.offset.left,
                            a = n.origin.offset.top - o.__Geometry.origin.offset.top;
                        o._$tooltip.css({
                            left: o.__lastPosition.coord.left + _,
                            top: o.__lastPosition.coord.top + a
                        })
                    }
                }
                o._trigger({
                    type: "scroll",
                    event: i,
                    geo: n
                })
            }
            return o
        },
        __stateSet: function(t) {
            return this.__state = t, this._trigger({
                type: "state",
                state: t
            }), this
        },
        __timeoutsClear: function() {
            return clearTimeout(this.__timeouts.open), this.__timeouts.open = null, t.each(this.__timeouts.close, function(t, i) {
                clearTimeout(i)
            }), this.__timeouts.close = [], this
        },
        __trackerStart: function() {
            var t = this,
                i = t._$tooltip.find(".tooltipster-content");
            return t.__options.trackTooltip && (t.__contentBcr = i[0].getBoundingClientRect()), t.__tracker = setInterval(function() {
                if (e(t._$origin) && e(t._$tooltip)) {
                    if (t.__options.trackOrigin) {
                        var n = t.__geometry(),
                            s = !1;
                        o(n.origin.size, t.__Geometry.origin.size) && (t.__Geometry.origin.fixedLineage ? o(n.origin.windowOffset, t.__Geometry.origin.windowOffset) && (s = !0) : o(n.origin.offset, t.__Geometry.origin.offset) && (s = !0)), s || (t.__options.triggerClose.mouseleave ? t._close() : t.reposition())
                    }
                    if (t.__options.trackTooltip) {
                        var r = i[0].getBoundingClientRect();
                        r.height === t.__contentBcr.height && r.width === t.__contentBcr.width || (t.reposition(), t.__contentBcr = r)
                    }
                } else t._close()
            }, t.__options.trackerInterval), t
        },
        _close: function(i, o, e) {
            var n = this,
                s = !0;
            if (n._trigger({
                    type: "close",
                    event: i,
                    stop: function() {
                        s = !1
                    }
                }), s || e) {
                o && n.__callbacks.close.push(o), n.__callbacks.open = [], n.__timeoutsClear();
                var _ = function() {
                    t.each(n.__callbacks.close, function(t, o) {
                        o.call(n, n, {
                            event: i,
                            origin: n._$origin[0]
                        })
                    }), n.__callbacks.close = []
                };
                if ("closed" != n.__state) {
                    var a = !0,
                        l = (new Date).getTime() + n.__options.animationDuration[1];
                    if ("disappearing" == n.__state && l > n.__closingTime && n.__options.animationDuration[1] > 0 && (a = !1), a) {
                        n.__closingTime = l, "disappearing" != n.__state && n.__stateSet("disappearing");
                        var p = function() {
                            clearInterval(n.__tracker), n._trigger({
                                type: "closing",
                                event: i
                            }), n._$tooltip.off("." + n.__namespace + "-triggerClose").removeClass("tooltipster-dying"), t(r.window).off("." + n.__namespace + "-triggerClose"), n.__$originParents.each(function(i, o) {
                                t(o).off("scroll." + n.__namespace + "-triggerClose")
                            }), n.__$originParents = null, t(r.window.document.body).off("." + n.__namespace + "-triggerClose"), n._$origin.off("." + n.__namespace + "-triggerClose"), n._off("dismissable"), n.__stateSet("closed"), n._trigger({
                                type: "after",
                                event: i
                            }), n.__options.functionAfter && n.__options.functionAfter.call(n, n, {
                                event: i,
                                origin: n._$origin[0]
                            }), _()
                        };
                        r.hasTransitions ? (n._$tooltip.css({
                            "-moz-animation-duration": n.__options.animationDuration[1] + "ms",
                            "-ms-animation-duration": n.__options.animationDuration[1] + "ms",
                            "-o-animation-duration": n.__options.animationDuration[1] + "ms",
                            "-webkit-animation-duration": n.__options.animationDuration[1] + "ms",
                            "animation-duration": n.__options.animationDuration[1] + "ms",
                            "transition-duration": n.__options.animationDuration[1] + "ms"
                        }), n._$tooltip.clearQueue().removeClass("tooltipster-show").addClass("tooltipster-dying"), n.__options.animationDuration[1] > 0 && n._$tooltip.delay(n.__options.animationDuration[1]), n._$tooltip.queue(p)) : n._$tooltip.stop().fadeOut(n.__options.animationDuration[1], p)
                    }
                } else _()
            }
            return n
        },
        _off: function() {
            return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _on: function() {
            return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _one: function() {
            return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _open: function(i, o) {
            var n = this;
            if (!n.__destroying && e(n._$origin) && n.__enabled) {
                var s = !0;
                if ("closed" == n.__state && (n._trigger({
                        type: "before",
                        event: i,
                        stop: function() {
                            s = !1
                        }
                    }), s && n.__options.functionBefore && (s = n.__options.functionBefore.call(n, n, {
                        event: i,
                        origin: n._$origin[0]
                    }))), !1 !== s && null !== n.__Content) {
                    o && n.__callbacks.open.push(o), n.__callbacks.close = [], n.__timeoutsClear();
                    var _, a = function() {
                        "stable" != n.__state && n.__stateSet("stable"), t.each(n.__callbacks.open, function(t, i) {
                            i.call(n, n, {
                                origin: n._$origin[0],
                                tooltip: n._$tooltip[0]
                            })
                        }), n.__callbacks.open = []
                    };
                    if ("closed" !== n.__state) _ = 0, "disappearing" === n.__state ? (n.__stateSet("appearing"), r.hasTransitions ? (n._$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-show"), n.__options.animationDuration[0] > 0 && n._$tooltip.delay(n.__options.animationDuration[0]), n._$tooltip.queue(a)) : n._$tooltip.stop().fadeIn(a)) : "stable" == n.__state && a();
                    else {
                        if (n.__stateSet("appearing"), _ = n.__options.animationDuration[0], n.__contentInsert(), n.reposition(i, !0), r.hasTransitions ? (n._$tooltip.addClass("tooltipster-" + n.__options.animation).addClass("tooltipster-initial").css({
                                "-moz-animation-duration": n.__options.animationDuration[0] + "ms",
                                "-ms-animation-duration": n.__options.animationDuration[0] + "ms",
                                "-o-animation-duration": n.__options.animationDuration[0] + "ms",
                                "-webkit-animation-duration": n.__options.animationDuration[0] + "ms",
                                "animation-duration": n.__options.animationDuration[0] + "ms",
                                "transition-duration": n.__options.animationDuration[0] + "ms"
                            }), setTimeout(function() {
                                "closed" != n.__state && (n._$tooltip.addClass("tooltipster-show").removeClass("tooltipster-initial"), n.__options.animationDuration[0] > 0 && n._$tooltip.delay(n.__options.animationDuration[0]), n._$tooltip.queue(a))
                            }, 0)) : n._$tooltip.css("display", "none").fadeIn(n.__options.animationDuration[0], a), n.__trackerStart(), t(r.window).on("resize." + n.__namespace + "-triggerClose", function(i) {
                                var o = t(document.activeElement);
                                (o.is("input") || o.is("textarea")) && t.contains(n._$tooltip[0], o[0]) || n.reposition(i)
                            }).on("scroll." + n.__namespace + "-triggerClose", function(t) {
                                n.__scrollHandler(t)
                            }), n.__$originParents = n._$origin.parents(), n.__$originParents.each(function(i, o) {
                                t(o).on("scroll." + n.__namespace + "-triggerClose", function(t) {
                                    n.__scrollHandler(t)
                                })
                            }), n.__options.triggerClose.mouseleave || n.__options.triggerClose.touchleave && r.hasTouchCapability) {
                            n._on("dismissable", function(t) {
                                t.dismissable ? t.delay ? (h = setTimeout(function() {
                                    n._close(t.event)
                                }, t.delay), n.__timeouts.close.push(h)) : n._close(t) : clearTimeout(h)
                            });
                            var l = n._$origin,
                                p = "",
                                c = "",
                                h = null;
                            n.__options.interactive && (l = l.add(n._$tooltip)), n.__options.triggerClose.mouseleave && (p += "mouseenter." + n.__namespace + "-triggerClose ", c += "mouseleave." + n.__namespace + "-triggerClose "), n.__options.triggerClose.touchleave && r.hasTouchCapability && (p += "touchstart." + n.__namespace + "-triggerClose", c += "touchend." + n.__namespace + "-triggerClose touchcancel." + n.__namespace + "-triggerClose"), l.on(c, function(t) {
                                if (n._touchIsTouchEvent(t) || !n._touchIsEmulatedEvent(t)) {
                                    var i = "mouseleave" == t.type ? n.__options.delay : n.__options.delayTouch;
                                    n._trigger({
                                        delay: i[1],
                                        dismissable: !0,
                                        event: t,
                                        type: "dismissable"
                                    })
                                }
                            }).on(p, function(t) {
                                !n._touchIsTouchEvent(t) && n._touchIsEmulatedEvent(t) || n._trigger({
                                    dismissable: !1,
                                    event: t,
                                    type: "dismissable"
                                })
                            })
                        }
                        n.__options.triggerClose.originClick && n._$origin.on("click." + n.__namespace + "-triggerClose", function(t) {
                            n._touchIsTouchEvent(t) || n._touchIsEmulatedEvent(t) || n._close(t)
                        }), (n.__options.triggerClose.click || n.__options.triggerClose.tap && r.hasTouchCapability) && setTimeout(function() {
                            if ("closed" != n.__state) {
                                var i = "",
                                    o = t(r.window.document.body);
                                n.__options.triggerClose.click && (i += "click." + n.__namespace + "-triggerClose "), n.__options.triggerClose.tap && r.hasTouchCapability && (i += "touchend." + n.__namespace + "-triggerClose"), o.on(i, function(i) {
                                    n._touchIsMeaningfulEvent(i) && (n._touchRecordEvent(i), n.__options.interactive && t.contains(n._$tooltip[0], i.target) || n._close(i))
                                }), n.__options.triggerClose.tap && r.hasTouchCapability && o.on("touchstart." + n.__namespace + "-triggerClose", function(t) {
                                    n._touchRecordEvent(t)
                                })
                            }
                        }, 0), n._trigger("ready"), n.__options.functionReady && n.__options.functionReady.call(n, n, {
                            origin: n._$origin[0],
                            tooltip: n._$tooltip[0]
                        })
                    }
                    if (n.__options.timer > 0) {
                        h = setTimeout(function() {
                            n._close()
                        }, n.__options.timer + _);
                        n.__timeouts.close.push(h)
                    }
                }
            }
            return n
        },
        _openShortly: function(t) {
            var i = this,
                o = !0;
            if ("stable" != i.__state && "appearing" != i.__state && !i.__timeouts.open && (i._trigger({
                    type: "start",
                    event: t,
                    stop: function() {
                        o = !1
                    }
                }), o)) {
                var e = 0 == t.type.indexOf("touch") ? i.__options.delayTouch : i.__options.delay;
                e[0] ? i.__timeouts.open = setTimeout(function() {
                    i.__timeouts.open = null, i.__pointerIsOverOrigin && i._touchIsMeaningfulEvent(t) ? (i._trigger("startend"), i._open(t)) : i._trigger("startcancel")
                }, e[0]) : (i._trigger("startend"), i._open(t))
            }
            return i
        },
        _optionsExtract: function(i, o) {
            var e = this,
                n = t.extend(!0, {}, o),
                s = e.__options[i];
            return s || (s = {}, t.each(o, function(t, i) {
                var o = e.__options[t];
                void 0 !== o && (s[t] = o)
            })), t.each(n, function(i, o) {
                void 0 !== s[i] && ("object" != typeof o || o instanceof Array || null == o || "object" != typeof s[i] || s[i] instanceof Array || null == s[i] ? n[i] = s[i] : t.extend(n[i], s[i]))
            }), n
        },
        _plug: function(i) {
            var o = t.tooltipster._plugin(i);
            if (!o) throw new Error('The "' + i + '" plugin is not defined');
            return o.instance && t.tooltipster.__bridge(o.instance, this, o.name), this
        },
        _touchIsEmulatedEvent: function(t) {
            for (var i = !1, o = (new Date).getTime(), e = this.__touchEvents.length - 1; e >= 0; e--) {
                var n = this.__touchEvents[e];
                if (!(o - n.time < 500)) break;
                n.target === t.target && (i = !0)
            }
            return i
        },
        _touchIsMeaningfulEvent: function(t) {
            return this._touchIsTouchEvent(t) && !this._touchSwiped(t.target) || !this._touchIsTouchEvent(t) && !this._touchIsEmulatedEvent(t)
        },
        _touchIsTouchEvent: function(t) {
            return 0 == t.type.indexOf("touch")
        },
        _touchRecordEvent: function(t) {
            return this._touchIsTouchEvent(t) && (t.time = (new Date).getTime(), this.__touchEvents.push(t)), this
        },
        _touchSwiped: function(t) {
            for (var i = !1, o = this.__touchEvents.length - 1; o >= 0; o--) {
                var e = this.__touchEvents[o];
                if ("touchmove" == e.type) {
                    i = !0;
                    break
                }
                if ("touchstart" == e.type && t === e.target) break
            }
            return i
        },
        _trigger: function() {
            var i = Array.prototype.slice.apply(arguments);
            return "string" == typeof i[0] && (i[0] = {
                type: i[0]
            }), i[0].instance = this, i[0].origin = this._$origin ? this._$origin[0] : null, i[0].tooltip = this._$tooltip ? this._$tooltip[0] : null, this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, i), t.tooltipster._trigger.apply(t.tooltipster, i), this.__$emitterPublic.trigger.apply(this.__$emitterPublic, i), this
        },
        _unplug: function(i) {
            var o = this;
            if (o[i]) {
                var e = t.tooltipster._plugin(i);
                e.instance && t.each(e.instance, function(t, e) {
                    o[t] && o[t].bridged === o[i] && delete o[t]
                }), o[i].__destroy && o[i].__destroy(), delete o[i]
            }
            return o
        },
        close: function(t) {
            return this.__destroyed ? this.__destroyError() : this._close(null, t), this
        },
        content: function(t) {
            var i = this;
            if (void 0 === t) return i.__Content;
            if (i.__destroyed) i.__destroyError();
            else if (i.__contentSet(t), null !== i.__Content) {
                if ("closed" !== i.__state && (i.__contentInsert(), i.reposition(), i.__options.updateAnimation))
                    if (r.hasTransitions) {
                        var o = i.__options.updateAnimation;
                        i._$tooltip.addClass("tooltipster-update-" + o), setTimeout(function() {
                            "closed" != i.__state && i._$tooltip.removeClass("tooltipster-update-" + o)
                        }, 1e3)
                    } else i._$tooltip.fadeTo(200, .5, function() {
                        "closed" != i.__state && i._$tooltip.fadeTo(200, 1)
                    })
            } else i._close();
            return i
        },
        destroy: function() {
            var i = this;
            if (i.__destroyed) i.__destroyError();
            else {
                "closed" != i.__state ? i.option("animationDuration", 0)._close(null, null, !0) : i.__timeoutsClear(), i._trigger("destroy"), i.__destroyed = !0, i._$origin.removeData(i.__namespace).off("." + i.__namespace + "-triggerOpen"), t(r.window.document.body).off("." + i.__namespace + "-triggerOpen");
                var o = i._$origin.data("tooltipster-ns");
                if (o)
                    if (1 === o.length) {
                        var e = null;
                        "previous" == i.__options.restoration ? e = i._$origin.data("tooltipster-initialTitle") : "current" == i.__options.restoration && (e = "string" == typeof i.__Content ? i.__Content : t("<div></div>").append(i.__Content).html()), e && i._$origin.attr("title", e), i._$origin.removeClass("tooltipstered"), i._$origin.removeData("tooltipster-ns").removeData("tooltipster-initialTitle")
                    } else o = t.grep(o, function(t, o) {
                        return t !== i.__namespace
                    }), i._$origin.data("tooltipster-ns", o);
                i._trigger("destroyed"), i._off(), i.off(), i.__Content = null, i.__$emitterPrivate = null, i.__$emitterPublic = null, i.__options.parent = null, i._$origin = null, i._$tooltip = null, t.tooltipster.__instancesLatestArr = t.grep(t.tooltipster.__instancesLatestArr, function(t, o) {
                    return i !== t
                }), clearInterval(i.__garbageCollector)
            }
            return i
        },
        disable: function() {
            return this.__destroyed ? (this.__destroyError(), this) : (this._close(), this.__enabled = !1, this)
        },
        elementOrigin: function() {
            return this.__destroyed ? void this.__destroyError() : this._$origin[0]
        },
        elementTooltip: function() {
            return this._$tooltip ? this._$tooltip[0] : null
        },
        enable: function() {
            return this.__enabled = !0, this
        },
        hide: function(t) {
            return this.close(t)
        },
        instance: function() {
            return this
        },
        off: function() {
            return this.__destroyed || this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        on: function() {
            return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        one: function() {
            return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        open: function(t) {
            return this.__destroyed ? this.__destroyError() : this._open(null, t), this
        },
        option: function(i, o) {
            return void 0 === o ? this.__options[i] : (this.__destroyed ? this.__destroyError() : (this.__options[i] = o, this.__optionsFormat(), t.inArray(i, ["trigger", "triggerClose", "triggerOpen"]) >= 0 && this.__prepareOrigin(), "selfDestruction" === i && this.__prepareGC()), this)
        },
        reposition: function(t, i) {
            var o = this;
            return o.__destroyed ? o.__destroyError() : "closed" != o.__state && e(o._$origin) && (i || e(o._$tooltip)) && (i || o._$tooltip.detach(), o.__Geometry = o.__geometry(), o._trigger({
                type: "reposition",
                event: t,
                helper: {
                    geo: o.__Geometry
                }
            })), o
        },
        show: function(t) {
            return this.open(t)
        },
        status: function() {
            return {
                destroyed: this.__destroyed,
                enabled: this.__enabled,
                open: "closed" !== this.__state,
                state: this.__state
            }
        },
        triggerHandler: function() {
            return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        }
    }, t.fn.tooltipster = function() {
        var i = Array.prototype.slice.apply(arguments),
            o = "You are using a single HTML element as content for several tooltips. You probably want to set the contentCloning option to TRUE.";
        if (0 === this.length) return this;
        if ("string" == typeof i[0]) {
            var e = "#*$~&";
            return this.each(function() {
                var n = t(this).data("tooltipster-ns"),
                    s = n ? t(this).data(n[0]) : null;
                if (!s) throw new Error("You called Tooltipster's \"" + i[0] + '" method on an uninitialized element');
                if ("function" != typeof s[i[0]]) throw new Error('Unknown method "' + i[0] + '"');
                this.length > 1 && "content" == i[0] && (i[1] instanceof t || "object" == typeof i[1] && null != i[1] && i[1].tagName) && !s.__options.contentCloning && s.__options.debug && console.log(o);
                var r = s[i[0]](i[1], i[2]);
                return r !== s || "instance" === i[0] ? (e = r, !1) : void 0
            }), "#*$~&" !== e ? e : this
        }
        t.tooltipster.__instancesLatestArr = [];
        var s = i[0] && void 0 !== i[0].multiple,
            r = s && i[0].multiple || !s && n.multiple,
            _ = i[0] && void 0 !== i[0].content,
            a = _ && i[0].content || !_ && n.content,
            l = i[0] && void 0 !== i[0].contentCloning,
            p = l && i[0].contentCloning || !l && n.contentCloning,
            c = i[0] && void 0 !== i[0].debug,
            h = c && i[0].debug || !c && n.debug;
        return this.length > 1 && (a instanceof t || "object" == typeof a && null != a && a.tagName) && !p && h && console.log(o), this.each(function() {
            var o = !1,
                e = t(this),
                n = e.data("tooltipster-ns"),
                s = null;
            n ? r ? o = !0 : h && (console.log("Tooltipster: one or more tooltips are already attached to the element below. Ignoring."), console.log(this)) : o = !0, o && (s = new t.Tooltipster(this, i[0]), n || (n = []), n.push(s.__namespace), e.data("tooltipster-ns", n), e.data(s.__namespace, s), s.__options.functionInit && s.__options.functionInit.call(s, s, {
                origin: this
            }), s._trigger("init")), t.tooltipster.__instancesLatestArr.push(s)
        }), this
    }, i.prototype = {
        __init: function(i) {
            this.__$tooltip = i, this.__$tooltip.css({
                left: 0,
                overflow: "hidden",
                position: "absolute",
                top: 0
            }).find(".tooltipster-content").css("overflow", "auto"), this.$container = t('<div class="tooltipster-ruler"></div>').append(this.__$tooltip).appendTo(r.window.document.body)
        },
        __forceRedraw: function() {
            var t = this.__$tooltip.parent();
            this.__$tooltip.detach(), this.__$tooltip.appendTo(t)
        },
        constrain: function(t, i) {
            return this.constraints = {
                width: t,
                height: i
            }, this.__$tooltip.css({
                display: "block",
                height: "",
                overflow: "auto",
                width: t
            }), this
        },
        destroy: function() {
            this.__$tooltip.detach().find(".tooltipster-content").css({
                display: "",
                overflow: ""
            }), this.$container.remove()
        },
        free: function() {
            return this.constraints = null, this.__$tooltip.css({
                display: "",
                height: "",
                overflow: "visible",
                width: ""
            }), this
        },
        measure: function() {
            this.__forceRedraw();
            var t = this.__$tooltip[0].getBoundingClientRect(),
                i = {
                    size: {
                        height: t.height || t.bottom - t.top,
                        width: t.width || t.right - t.left
                    }
                };
            if (this.constraints) {
                var o = this.__$tooltip.find(".tooltipster-content"),
                    e = this.__$tooltip.outerHeight(),
                    n = o[0].getBoundingClientRect(),
                    s = {
                        height: e <= this.constraints.height,
                        width: t.width <= this.constraints.width && n.width >= o[0].scrollWidth - 1
                    };
                i.fits = s.height && s.width
            }
            return r.IE && r.IE <= 11 && i.size.width !== r.window.document.documentElement.clientWidth && (i.size.width = Math.ceil(i.size.width) + 1), i
        }
    };
    var a = navigator.userAgent.toLowerCase(); -
    1 != a.indexOf("msie") ? r.IE = parseInt(a.split("msie")[1]) : -1 !== a.toLowerCase().indexOf("trident") && -1 !== a.indexOf(" rv:11") ? r.IE = 11 : -1 != a.toLowerCase().indexOf("edge/") && (r.IE = parseInt(a.toLowerCase().split("edge/")[1]));
    var l = "tooltipster.sideTip";
    return t.tooltipster._plugin({
        name: l,
        instance: {
            __defaults: function() {
                return {
                    arrow: !0,
                    distance: 6,
                    functionPosition: null,
                    maxWidth: null,
                    minIntersection: 16,
                    minWidth: 0,
                    position: null,
                    side: "top",
                    viewportAware: !0
                }
            },
            __init: function(t) {
                var i = this;
                i.__instance = t, i.__namespace = "tooltipster-sideTip-" + Math.round(1e6 * Math.random()), i.__previousState = "closed", i.__options, i.__optionsFormat(), i.__instance._on("state." + i.__namespace, function(t) {
                    "closed" == t.state ? i.__close() : "appearing" == t.state && "closed" == i.__previousState && i.__create(), i.__previousState = t.state
                }), i.__instance._on("options." + i.__namespace, function() {
                    i.__optionsFormat()
                }), i.__instance._on("reposition." + i.__namespace, function(t) {
                    i.__reposition(t.event, t.helper)
                })
            },
            __close: function() {
                this.__instance.content() instanceof t && this.__instance.content().detach(), this.__instance._$tooltip.remove(), this.__instance._$tooltip = null
            },
            __create: function() {
                var i = t('<div class="premium-tooltipster-base tooltipster-base tooltipster-sidetip"><div class="tooltipster-box"><div class="tooltipster-content"></div></div><div class="tooltipster-arrow"><div class="tooltipster-arrow-uncropped"><div class="tooltipster-arrow-border"></div><div class="tooltipster-arrow-background"></div></div></div></div>');
                this.__options.arrow || i.find(".tooltipster-box").css("margin", 0).end().find(".tooltipster-arrow").hide(), this.__options.minWidth && i.css("min-width", this.__options.minWidth + "px"), this.__options.maxWidth && i.css("max-width", this.__options.maxWidth + "px"), this.__instance._$tooltip = i, this.__instance._trigger("created")
            },
            __destroy: function() {
                this.__instance._off("." + self.__namespace)
            },
            __optionsFormat: function() {
                var i = this;
                if (i.__options = i.__instance._optionsExtract(l, i.__defaults()), i.__options.position && (i.__options.side = i.__options.position), "object" != typeof i.__options.distance && (i.__options.distance = [i.__options.distance]), i.__options.distance.length < 4 && (void 0 === i.__options.distance[1] && (i.__options.distance[1] = i.__options.distance[0]), void 0 === i.__options.distance[2] && (i.__options.distance[2] = i.__options.distance[0]), void 0 === i.__options.distance[3] && (i.__options.distance[3] = i.__options.distance[1]), i.__options.distance = {
                        top: i.__options.distance[0],
                        right: i.__options.distance[1],
                        bottom: i.__options.distance[2],
                        left: i.__options.distance[3]
                    }), "string" == typeof i.__options.side) {
                    i.__options.side = [i.__options.side, {
                        top: "bottom",
                        right: "left",
                        bottom: "top",
                        left: "right"
                    }[i.__options.side]], "left" == i.__options.side[0] || "right" == i.__options.side[0] ? i.__options.side.push("top", "bottom") : i.__options.side.push("right", "left")
                }
                6 === t.tooltipster._env.IE && !0 !== i.__options.arrow && (i.__options.arrow = !1)
            },
            __reposition: function(i, o) {
                var e, n = this,
                    s = n.__targetFind(o),
                    r = [];
                n.__instance._$tooltip.detach();
                var _ = n.__instance._$tooltip.clone(),
                    a = t.tooltipster._getRuler(_),
                    l = !1,
                    p = n.__instance.option("animation");
                switch (p && _.removeClass("tooltipster-" + p), t.each(["window", "document"], function(e, p) {
                    var c = null;
                    if (n.__instance._trigger({
                            container: p,
                            helper: o,
                            satisfied: l,
                            takeTest: function(t) {
                                c = t
                            },
                            results: r,
                            type: "positionTest"
                        }), 1 == c || 0 != c && 0 == l && ("window" != p || n.__options.viewportAware))
                        for (e = 0; e < n.__options.side.length; e++) {
                            var h = {
                                    horizontal: 0,
                                    vertical: 0
                                },
                                d = n.__options.side[e];
                            "top" == d || "bottom" == d ? h.vertical = n.__options.distance[d] : h.horizontal = n.__options.distance[d], n.__sideChange(_, d), t.each(["natural", "constrained"], function(t, e) {
                                if (c = null, n.__instance._trigger({
                                        container: p,
                                        event: i,
                                        helper: o,
                                        mode: e,
                                        results: r,
                                        satisfied: l,
                                        side: d,
                                        takeTest: function(t) {
                                            c = t
                                        },
                                        type: "positionTest"
                                    }), 1 == c || 0 != c && 0 == l) {
                                    var _ = {
                                            container: p,
                                            distance: h,
                                            fits: null,
                                            mode: e,
                                            outerSize: null,
                                            side: d,
                                            size: null,
                                            target: s[d],
                                            whole: null
                                        },
                                        u = ("natural" == e ? a.free() : a.constrain(o.geo.available[p][d].width - h.horizontal, o.geo.available[p][d].height - h.vertical)).measure();
                                    if (_.size = u.size, _.outerSize = {
                                            height: u.size.height + h.vertical,
                                            width: u.size.width + h.horizontal
                                        }, "natural" == e ? o.geo.available[p][d].width >= _.outerSize.width && o.geo.available[p][d].height >= _.outerSize.height ? _.fits = !0 : _.fits = !1 : _.fits = u.fits, "window" == p && (_.fits ? _.whole = "top" == d || "bottom" == d ? o.geo.origin.windowOffset.right >= n.__options.minIntersection && o.geo.window.size.width - o.geo.origin.windowOffset.left >= n.__options.minIntersection : o.geo.origin.windowOffset.bottom >= n.__options.minIntersection && o.geo.window.size.height - o.geo.origin.windowOffset.top >= n.__options.minIntersection : _.whole = !1), r.push(_), _.whole) l = !0;
                                    else if ("natural" == _.mode && (_.fits || _.size.width <= o.geo.available[p][d].width)) return !1
                                }
                            })
                        }
                }), n.__instance._trigger({
                    edit: function(t) {
                        r = t
                    },
                    event: i,
                    helper: o,
                    results: r,
                    type: "positionTested"
                }), r.sort(function(t, i) {
                    if (t.whole && !i.whole) return -1;
                    if (!t.whole && i.whole) return 1;
                    if (t.whole && i.whole) {
                        var o = n.__options.side.indexOf(t.side);
                        return (e = n.__options.side.indexOf(i.side)) > o ? -1 : o > e ? 1 : "natural" == t.mode ? -1 : 1
                    }
                    if (t.fits && !i.fits) return -1;
                    if (!t.fits && i.fits) return 1;
                    if (t.fits && i.fits) {
                        var e;
                        o = n.__options.side.indexOf(t.side);
                        return (e = n.__options.side.indexOf(i.side)) > o ? -1 : o > e ? 1 : "natural" == t.mode ? -1 : 1
                    }
                    return "document" == t.container && "bottom" == t.side && "natural" == t.mode ? -1 : 1
                }), (e = r[0]).coord = {}, e.side) {
                    case "left":
                    case "right":
                        e.coord.top = Math.floor(e.target - e.size.height / 2);
                        break;
                    case "bottom":
                    case "top":
                        e.coord.left = Math.floor(e.target - e.size.width / 2)
                }
                switch (e.side) {
                    case "left":
                        e.coord.left = o.geo.origin.windowOffset.left - e.outerSize.width;
                        break;
                    case "right":
                        e.coord.left = o.geo.origin.windowOffset.right + e.distance.horizontal;
                        break;
                    case "top":
                        e.coord.top = o.geo.origin.windowOffset.top - e.outerSize.height;
                        break;
                    case "bottom":
                        e.coord.top = o.geo.origin.windowOffset.bottom + e.distance.vertical
                }
                "window" == e.container ? "top" == e.side || "bottom" == e.side ? e.coord.left < 0 ? o.geo.origin.windowOffset.right - this.__options.minIntersection >= 0 ? e.coord.left = 0 : e.coord.left = o.geo.origin.windowOffset.right - this.__options.minIntersection - 1 : e.coord.left > o.geo.window.size.width - e.size.width && (o.geo.origin.windowOffset.left + this.__options.minIntersection <= o.geo.window.size.width ? e.coord.left = o.geo.window.size.width - e.size.width : e.coord.left = o.geo.origin.windowOffset.left + this.__options.minIntersection + 1 - e.size.width) : e.coord.top < 0 ? o.geo.origin.windowOffset.bottom - this.__options.minIntersection >= 0 ? e.coord.top = 0 : e.coord.top = o.geo.origin.windowOffset.bottom - this.__options.minIntersection - 1 : e.coord.top > o.geo.window.size.height - e.size.height && (o.geo.origin.windowOffset.top + this.__options.minIntersection <= o.geo.window.size.height ? e.coord.top = o.geo.window.size.height - e.size.height : e.coord.top = o.geo.origin.windowOffset.top + this.__options.minIntersection + 1 - e.size.height) : (e.coord.left > o.geo.window.size.width - e.size.width && (e.coord.left = o.geo.window.size.width - e.size.width), e.coord.left < 0 && (e.coord.left = 0)), n.__sideChange(_, e.side), o.tooltipClone = _[0], o.tooltipParent = n.__instance.option("parent").parent[0], o.mode = e.mode, o.whole = e.whole, o.origin = n.__instance._$origin[0], o.tooltip = n.__instance._$tooltip[0], delete e.container, delete e.fits, delete e.mode, delete e.outerSize, delete e.whole, e.distance = e.distance.horizontal || e.distance.vertical;
                var c, h, d, u = t.extend(!0, {}, e);
                if (n.__instance._trigger({
                        edit: function(t) {
                            e = t
                        },
                        event: i,
                        helper: o,
                        position: u,
                        type: "position"
                    }), n.__options.functionPosition) {
                    var g = n.__options.functionPosition.call(n, n.__instance, o, u);
                    g && (e = g)
                }
                a.destroy(), "top" == e.side || "bottom" == e.side ? (c = {
                    prop: "left",
                    val: e.target - e.coord.left
                }, h = e.size.width - this.__options.minIntersection) : (c = {
                    prop: "top",
                    val: e.target - e.coord.top
                }, h = e.size.height - this.__options.minIntersection), c.val < this.__options.minIntersection ? c.val = this.__options.minIntersection : c.val > h && (c.val = h), d = o.geo.origin.fixedLineage ? o.geo.origin.windowOffset : {
                    left: o.geo.origin.windowOffset.left + o.geo.window.scroll.left,
                    top: o.geo.origin.windowOffset.top + o.geo.window.scroll.top
                }, e.coord = {
                    left: d.left + (e.coord.left - o.geo.origin.windowOffset.left),
                    top: d.top + (e.coord.top - o.geo.origin.windowOffset.top)
                }, n.__sideChange(n.__instance._$tooltip, e.side), o.geo.origin.fixedLineage ? n.__instance._$tooltip.css("position", "fixed") : n.__instance._$tooltip.css("position", ""), n.__instance._$tooltip.css({
                    left: e.coord.left,
                    top: e.coord.top,
                    height: e.size.height,
                    width: e.size.width
                }).find(".tooltipster-arrow").css({
                    left: "",
                    top: ""
                }).css(c.prop, c.val), n.__instance._$tooltip.appendTo(n.__instance.option("parent")), n.__instance._trigger({
                    type: "repositioned",
                    event: i,
                    position: e
                })
            },
            __sideChange: function(t, i) {
                t.removeClass("tooltipster-bottom").removeClass("tooltipster-left").removeClass("tooltipster-right").removeClass("tooltipster-top").addClass("tooltipster-" + i)
            },
            __targetFind: function(t) {
                var i = {},
                    o = this.__instance._$origin[0].getClientRects();
                o.length > 1 && (1 == this.__instance._$origin.css("opacity") && (this.__instance._$origin.css("opacity", .99), o = this.__instance._$origin[0].getClientRects(), this.__instance._$origin.css("opacity", 1)));
                if (o.length < 2) i.top = Math.floor(t.geo.origin.windowOffset.left + t.geo.origin.size.width / 2), i.bottom = i.top, i.left = Math.floor(t.geo.origin.windowOffset.top + t.geo.origin.size.height / 2), i.right = i.left;
                else {
                    var e = o[0];
                    i.top = Math.floor(e.left + (e.right - e.left) / 2), e = o.length > 2 ? o[Math.ceil(o.length / 2) - 1] : o[0], i.right = Math.floor(e.top + (e.bottom - e.top) / 2), e = o[o.length - 1], i.bottom = Math.floor(e.left + (e.right - e.left) / 2), e = o.length > 2 ? o[Math.ceil((o.length + 1) / 2) - 1] : o[o.length - 1], i.left = Math.floor(e.top + (e.bottom - e.top) / 2)
                }
                return i
            }
        }
    }), t
});