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

            //scope.$watch("vaSetScroll", function () {
            //    //console.log(scope.vaSetScroll)
            //    //element.scrollTop(scope.vaSetScroll);
            //});


            var i = 0;
            $document.on("scroll", function (event) {
                i++;
                var s = window.pageYOffset;

                scope.$apply(function () {

                    scope.vaGetScroll = s;


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