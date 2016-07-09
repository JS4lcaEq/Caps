(function () {

    function fn($document) {

        var items = [];

        function link(scope, element, attr) {


            var trigger = false;



            scope.$watch("vaSetScroll", function () {
                console.log(scope.vaSetScroll)
                //element.scrollTop(scope.vaSetScroll);
            });



            $document.on("scroll", function (event) {
                //console.log("$document scroll");
                scope.$apply(function () {
                    var sc = $document.scrollTop();
                    //if (scope.vaGetScroll != sc) {
                        scope.vaGetScroll = sc;
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