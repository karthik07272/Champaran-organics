! function() {
    "use strict";
    var e = -1 < navigator.userAgent.toLowerCase().indexOf("webkit"),
        t = -1 < navigator.userAgent.toLowerCase().indexOf("opera"),
        n = -1 < navigator.userAgent.toLowerCase().indexOf("msie");
    (e || t || n) && document.getElementById && window.addEventListener && window.addEventListener("hashchange", function() {
        var e = document.getElementById(location.hash.substring(1));
        e && (/^(?:a|select|input|button|textarea)$/i.test(e.tagName) || (e.tabIndex = -1), e.focus())
    }, !1)
}();