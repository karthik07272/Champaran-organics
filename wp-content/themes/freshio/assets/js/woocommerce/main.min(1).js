! function(a) {
    "use strict";
    a("body").on("hover", ".group-action .compare-button .compare:not(.tooltipstered), .group-action .yith-wcqv-button:not(.tooltipstered), .group-action .yith-wcwl-add-to-wishlist > div > a:not(.tooltipstered), .freshio-color-type:not(.tooltipstered)", function() {
        var t = a(this);
        void 0 !== a.fn.tooltipster && t.tooltipster({
            position: "top",
            functionBefore: function(t, o) {
                t.content(t._$origin.text())
            },
            theme: "opal-product-tooltipster",
            delay: 0,
            animation: "grow"
        }).tooltipster("show")
    }).on("hover", ".shop-tooltip", function() {
        var t = a(this);
        void 0 !== a.fn.tooltipster && t.tooltipster({
            position: "top",
            theme: "opal-product-tooltipster",
            delay: 0,
            animation: "grow"
        })
    }), a(document).on("added_to_wishlist removed_from_wishlist", function() {
        var o = a(".header-wishlist .count, .footer-wishlist .count");
        a.ajax({
            url: yith_wcwl_l10n.ajax_url,
            data: {
                action: "yith_wcwl_update_wishlist_count"
            },
            dataType: "json",
            success: function(t) {
                o.html(t.count)
            }
        })
    }), a("body").on("woosw_change_count", function(t, o) {
        a(".header-wishlist .count, .footer-wishlist .count").html(o)
    }), a(document).ready(function() {
        var e = a(".woocommerce-product-search"),
            t = a(".woocommerce-product-search .search-field"),
            i = a(".ajax-search-result"),
            n = wp.template("ajax-live-search-template");
        a("body").on("click", function() {
            i.hide()
        }), t.length && t.keyup(function() {
            2 < this.value.length ? a.ajax({
                url: freshioAjax.ajaxurl,
                type: "post",
                data: {
                    action: "freshio_ajax_search_products",
                    query: this.value
                },
                beforeSend: function() {
                    e.addClass("loading")
                },
                success: function(t) {
                    e.removeClass("loading");
                    var o = a.parseJSON(t);
                    i.empty(), i.show(), a.each(o, function(t, o) {
                        i.append(n({
                            url: o.url,
                            title: o.value,
                            img: o.img,
                            price: o.price
                        }))
                    })
                }
            }) : i.hide()
        }).on("click", function(t) {
            t.stopPropagation()
        }).on("focus", function(t) {
            2 < this.value.length && i.show()
        })
    })
}(jQuery);