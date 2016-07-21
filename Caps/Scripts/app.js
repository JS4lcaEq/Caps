$(function () {

    var elements = { body: $("body") };
    var bussy = false;

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

    var pages = [newPage("home"), newPage("about"), newPage("gallery"), newPage("contacts")];

    setHeight(pages);

    $(document).on("scroll", function (e) {
        if (bussy) {
            return;
        }
        bussy = true;

        var timer = setTimeout(function () {
            var s = window.pageYOffset;
            setBody(s);
            disactivateMenu(pages);
            var activePage = getActive(pages, s);
            activePage.activate();
            //console.log("jQuery scroll: ", s, activePage);
            bussy = false;
        }, 50);

    });

    console.log("ready!");
});