(function () {

    function fn() {

        var items = [];

        function link(scope, element, attr) {
            console.log("vaScrollDirective");
            var trigger = false;



            scope.$watch("vaSetScroll", function () {
                console.log(scope.vaSetScroll)
                element.scrollTop(scope.vaSetScroll);


            });

            element.on("scroll", function (event) {
                console.log("on scroll");
                scope.$apply(function () {
                    var sc = element.scrollTop();
                    if (scope.vaScroll != sc) {
                        scope.vaScroll = sc;
                    }
                    
                });
                
            });


        }

        return {
            template: '<ng-transclude></ng-transclude>',
            link: link,
            transclude: true,
            scope: {
                vaData: "=",
                vaScroll: "=",
                vaSetScroll: "<"
            }
        }
    }

    angular.module("vaScrollDirective", []);

    angular.module("vaScrollDirective").directive("vaScroll", fn);

})();