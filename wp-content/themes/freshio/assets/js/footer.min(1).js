! function() {
    "use strict";
    document.addEventListener("DOMContentLoaded", function() {
        if (0 !== document.getElementsByClassName("freshio-handheld-footer-bar").length) {
            [].forEach.call(document.querySelectorAll(".freshio-handheld-footer-bar .search > a"), function(t) {
                t.addEventListener("click", function(e) {
                    t.parentElement.classList.toggle("active"), e.preventDefault()
                })
            });
            var e = document.getElementsByClassName("freshio-handheld-footer-bar"),
                t = document.forms,
                n = function(t) {
                    return function(e) {
                        t && -1 !== e.target.tabIndex ? document.body.classList.add("sf-input-focused") : document.body.classList.remove("sf-input-focused")
                    }
                };
            if (e.length && t.length)
                for (var o = 0; o < t.length; o++) e[0].contains(t[o]) || (t[o].addEventListener("focus", n(!0), !0), t[o].addEventListener("blur", n(!1), !0))
        }
    })
}();