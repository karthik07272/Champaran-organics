document.body.classList.contains("woocommerce-cart") || document.body.classList.contains("woocommerce-checkout") || window.innerWidth < 768 || !document.getElementById("site-header-cart") || window.addEventListener("load", function() {
    document.querySelector(".site-header-cart").addEventListener("mouseover", function() {
        var e = window.outerHeight,
            t = this.querySelector(".widget_shopping_cart_content").getBoundingClientRect().bottom + this.offsetHeight,
            o = this.querySelector(".cart_list");
        e < t && (o.style.maxHeight = "15em", o.style.overflowY = "auto")
    })
});