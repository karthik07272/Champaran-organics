! function(o) {
    "use strict";

    function t() {
        var t = o(".single-product .quantity:not(.buttons_added)").find(".qty");
        t && "date" != t.prop("type") && (t.parent().addClass("buttons_added").prepend('<button type="button" class="minus" ><i class="freshio-icon-angle-down"></i></button>'), t.addClass("input-text").after('<button type="button" class="plus"><i class="freshio-icon-angle-up"></i></button>'), o("input.qty:not(.product-quantity input.qty)").each(function() {
            var t = parseFloat(o(this).attr("min"));
            t && 0 < t && parseFloat(o(this).val()) < t && o(this).val(t)
        }), o(".plus, .minus").unbind("click"), o(".plus, .minus").on("click", function() {
            var t = o(this).parent().find(".qty"),
                a = parseFloat(t.val()),
                n = parseFloat(t.attr("max")),
                s = parseFloat(t.attr("min")),
                i = t.attr("step");
            a && "" !== a && "NaN" !== a || (a = 0), "" !== n && "NaN" !== n || (n = ""), "" !== s && "NaN" !== s || (s = 0), "any" !== i && "" !== i && void 0 !== i && "NaN" !== parseFloat(i) || (i = 1), o(this).is(".plus") ? n && (n == a || n < a) ? t.val(n) : t.val(a + parseFloat(i)) : s && (s == a || a < s) ? t.val(s) : 0 < a && t.val(a - parseFloat(i)), t.trigger("change")
        }))
    }
    t(), o(document).on("qv_loader_stop", function() {
        t()
    })
}(jQuery);