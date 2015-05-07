/*! Off Canvas Navigation*/
$(function() {
    function h() {
        t.toggleClass(o);
        e.toggleClass(s);
        n.toggleClass(u);
        r.toggleClass(a)
        }
    function p() {
        t.addClass(o);
        e.animate({
            left: "0px"
        }, l);
        n.animate({
            left: c
        }, l);
        r.animate({
            left: c
        }, l)
        }
    function d() {
        t.removeClass(o);
        e.animate({
            left: "-" + c
        }, l);
        n.animate({
            left: "0px"
        }, l);
        r.animate({
            left: "0px"
        }, l)
        }
    var e = $(".oc-nav"),
    t = $("body"),
    n = $(".main-container, .footer-container"),
    r = $(".push"),
    i = $(".site-overlay"),
    s = "oc-nav-left oc-nav-open",
    o = "oc-nav-active",
    u = "container-push",
    a = "push-push",
    f = $(".menu-btn, .oc-nav a"),
    l = 200,
    c = e.width() + "px";
    if (Modernizr.csstransforms3d) {
        f.click(function() {
            h()
            });
        i.click(function() {
            h()
            })
        } else {
        e.css({
            left: "-" + c
        });
        n.css({
            "overflow-x": "hidden"
        });
        var v = !0;
        f.click(function() {
            if (v) {
                p();
                v = !1
            } else {
                d();
                v = !0
            }
        });
        i.click(function() {
            if (v) {
                p();
                v = !1
            } else {
                d();
                v = !0
            }
        })
        }
});