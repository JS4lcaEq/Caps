(function () {



    function MainCtrl($scope, $document, $interval) {

        function newPage(id) {
            return {
                "id": id
                , "element": $document.find("#" + id)
                , "hght": 0
                , "setHeight": function () {
                    this["hght"] = this["element"].height();
                }
            };
        }

        function setHeight(pages) {
            for (var i = 0; i < pages.length; i++) {
                pages[i].setHeight();
            }
        }

        this.test = "test";
        this.scroll = 0;
        this.opened = false;
        this.setScroll = 0;
        this.doScroll = function (scroll) {
            var self = this;
            self.setScroll = scroll;
        }

        var ctrl = this;
        
        ctrl.pages = [newPage("home"), newPage("about"), newPage("gallery"), newPage("contacts") ];

        setHeight(ctrl.pages);

        ctrl.bussy = false;
        $document.on("scroll", function (event) {
            if (!ctrl.bussy) {
                ctrl.bussy = true;
                $interval(function () {
                    console.log("ctrl scroll!!!");
                    //var self = this;
                    var s = window.pageYOffset;
                    //$scope.$apply(function () {
                        ctrl.test = s;
                        ctrl.scroll = s;
                        ctrl.bussy = false;
                    //});
                }, 50, 1);
            }

        });



    }

    angular.module('app', []);

    angular.module('app').controller('MainCtrl', MainCtrl);

})();
