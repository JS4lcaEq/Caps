(function () {

    function fn() {

        var items = [];

        function link(scope, element, attr) {
            console.log("vaScrollDirective");
            var trigger = false;
            element.on("scroll", function (event) {
                scope.$apply(function () {
                    var sc = element.scrollTop();
                    //console.log(sc);
                    trigger = true;
                    scope.vaScroll = sc;

                });
                
            });


            scope.$watch("vaScroll", function () {
                if (!trigger) {
                    console.log(scope.vaScroll)
                    element.scrollTop(scope.vaScroll);
                }
                trigger = false;

            });




        }

        return {
            template: '<ng-transclude></ng-transclude>',
            link: link,
            transclude: true,
            scope: {
                vaData: "=",
                vaScroll: "="
            }
        }
    }

    angular.module("vaScrollDirective", []);

    angular.module("vaScrollDirective").directive("vaScroll", fn);

})();