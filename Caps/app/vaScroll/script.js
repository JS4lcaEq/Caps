(function () {

    function fn() {

        var items = [];

        function link(scope, element, attr) {
            var scrollElement = element.find("#scroll");
            console.log("vaScrollDirective", scrollElement);
            var trigger = false;



            scope.$watch("vaSetScroll", function () {
                console.log(scope.vaSetScroll)
                //element.scrollTop(scope.vaSetScroll);
            });

            scrollElement.on("scroll", function (event) {
                console.log("on scroll");
                scope.$apply(function () {
                    var sc = scrollElement.scrollTop();
                    if (scope.vaGetScroll != sc) {
                        scope.vaGetScroll = sc;
                    }
                    
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