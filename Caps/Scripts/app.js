$(function () {

    var bussy = false;

    var menuOpened = false;

    var elements = { body: $("body"), bigView: $("#big_view") };

    function setBody(scroll) {
        if (scroll > 5) {
            elements.body.addClass("scrolled");
        } else {
            elements.body.removeClass("scrolled");
        }
    }

    function newPage(id) {
        return {
            "id": id
            , "element": $("#" + id)
            , "menuElement": $("nav li:has(a[href$='" + id + "'])")
            , "hght": 0
            , "start": 0
            , "end": 0
            , "setHeight": function () {
                this["hght"] = this["element"].height();
            }
            , "activate": function () {
                this.menuElement.addClass("active");
            }
            , "disactivate": function () {
                this.menuElement.removeClass("active");
            }
        };
    }



    function setHeight(pages) {
        var prev = 0;
        for (var i = 0; i < pages.length; i++) {
            pages[i].setHeight();
            if (i > 0) {
                pages[i].start = pages[i - 1].end;
            }
            pages[i].end = pages[i].start + pages[i].hght;
        }
    }

    function getActive(pages, scroll) {
        //console.log(pages, scroll)
        for (var i = 0; i < pages.length; i++) {
            if (scroll <= pages[i].end - pages[0].hght / 2) {
                return pages[i];
            }
        }
    }

    function disactivateMenu(pages) {
        for (var i = 0; i < pages.length; i++) {
            pages[i].disactivate();
        }
    }

    function onScroll() {
        var s = window.pageYOffset;
        setBody(s);
        disactivateMenu(pages);
        getActive(pages, s).activate();
    }

    function galleryIni(thumbnailsSelector, bigViewSelector) {
        $(bigViewSelector).on("click", function (e) {
            $(e.currentTarget).removeClass("opened");
        });
        $(thumbnailsSelector).each(function (index, item) {
            var url = item.src.replace("_", "");
            $(item).on("click", function () {
                elements.bigView.css("background-image", "url('" + url + "')");
                elements.bigView.addClass("opened");

            });
        });
    }

    galleryIni("#gallery img", "#big_view");

    function menuSwitchIni(switchSelector, boxSelector) {
        var trigger = false;
        var target = $(boxSelector);
        $(switchSelector).on("click", function () {
            trigger = !trigger;
            console.log("menu:", trigger);
            if (trigger) {
                target.addClass("opened");
            } else {
                target.removeClass("opened");
            }
        });
    }

    menuSwitchIni("header a", "#top")

    var pages = [newPage("home"), newPage("about"), newPage("gallery"), newPage("contacts")];

    setHeight(pages);



    $(document).on("scroll", function () {
        if (bussy) {
            return;
        }
        bussy = true;
        var timer = setTimeout(function () {
            onScroll();
            console.log("scroll slow");
            bussy = false;
        }, 100);

    });

    $(window).on("resize", function () {
        //console.log("resize");
        if (bussy) {
            return;
        }
        bussy = true;
        var timer = setTimeout(function () {
            console.log("resize slow");
            setHeight(pages);
            onScroll();
            bussy = false;
        }, 100);
    });

    onScroll();

    //console.log("ready!", window.pageYOffset);
});