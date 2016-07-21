$(function () {

    var elements = { body: $("body") };
    var bussy = false;

    function onScroll(scroll) {
        if (scroll > 5) {
            elements.body.addClass("scrolled");
        } else {
            elements.body.removeClass("scrolled");
        }
    }

    $(document).on("scroll", function (e) {
        if (bussy) {
            return;
        }
        bussy = true;

        var timer = setTimeout(function () {
        var s = window.pageYOffset;
        onScroll(s);
        console.log("jQuery scroll: ", s);
            bussy = false;
        }, 50);

    });

    console.log("ready!");
});