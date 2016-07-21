(function () {



    function MainCtrl($scope, $document, $interval) {

        function newPage(id) {
            return {
                "id": id
                , "element": $document.find("#" + id)
                , "hght": 0
                , "start": 0
                , "end": 0
                , "setHeight": function () {
                    this["hght"] = this["element"].height();
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





        this.test = "test";
        this.scroll = 0;
        this.opened = false;
        this.bigViewSrc = "http://localhost:49081/assets/css/img/Gallery/16S_.jpg";
        this.setScroll = 0;

        var ctrl = this;
        
        ctrl.pages = [newPage("home"), newPage("about"), newPage("gallery"), newPage("contacts") ];

        this.active = ctrl.pages[0];

        setHeight(ctrl.pages);

        this.onImageClick = function (image) {
            console.log(image);
            return false;
        };

        ctrl.bussy = false;
        $document.on("scroll", function (event) {
            if (!ctrl.bussy) {
                ctrl.bussy = true;
                $interval(function () {
                    //console.log("ctrl scroll!!!");
                    var s = window.pageYOffset;
                        ctrl.test = s;
                        ctrl.scroll = s;
                        ctrl.active = getActive(ctrl.pages, ctrl.scroll);
                        ctrl.bussy = false;
                }, 50, 1);
            }

        });

        function iniGallery(itemsSelector, bigViewSelector) {
            var items = $document.find(itemsSelector);
            var bigView = $document.find(bigViewSelector);
            for (var i = 0; i < items.length; i++) {
                $(items[i]).on("click", function (event) {
                    $scope.$apply(function () {
                        ctrl.bigViewSrc = event.target.src;
                        console.log(event.target.src, ctrl.bigViewSrc);
                    });

                });
                console.log(items[i].src);
            }
        }
        iniGallery("#gallery img", "#big_view");
    }

    angular.module('app', []);

    angular.module('app').controller('MainCtrl', MainCtrl);

})();
