(function () {

    function fn($document) {

        var items = [];

        function newPage(id) {
            return {
                "id": id
                , "element": $document.find("#"+id)
                , "hght": 0
                , "setHeight": function () {
                    this["hght"] = this["element"].height();
                }
            };
        }

        function link(scope, element, attr) {


            var trigger = false;

            var pages = { "home": newPage("home"), "about": newPage("about"), "gallery": newPage("gallery"), "contacts": newPage("contacts") };

            scope.$watch("vaSetScroll", function () {
                console.log(scope.vaSetScroll)
                //element.scrollTop(scope.vaSetScroll);
            });



            $document.on("scroll", function (event) {
                //console.log("$document scroll");
                scope.$apply(function () {
                    var sc = $document.scrollTop();
                    pages.home.setHeight();
                    //if (scope.vaGetScroll != sc) {
                    scope.vaGetScroll = { "current": sc, "pages": pages };
                    //}

                });
            });


        }

        return {
            template: '<div id="scroll" ng-class="{\'scrolled\': vaGetScroll > 0}"><ng-transclude></ng-transclude></div>',
            link: link,
            transclude: true,
            replace: true,
            scope: {
                vaData: "=",
                vaGetScroll: "=",
                vaSetScroll: "<"
            }
        }
    }

    angular.module("vaScrollDirective", []);

    angular.module("vaScrollDirective").directive("vaScroll", fn);

})();