(function () {

    function MainCtrl($scope, $document) {
        this.test = "test";
        this.scroll = 0;
        this.opened = false;
        this.setScroll = 0;
        this.doScroll = function (scroll) {
            var self = this;
            self.setScroll = scroll;
        }

        var ctrl = this;
        

        $document.on("scroll", function (event) {
            console.log("ctrl scroll!!!");
            //var self = this;
            var s = window.pageYOffset;
            $scope.$apply(function () {
                ctrl.test = s;
                ctrl.scroll = s;
            });
        });

    }

    angular.module('app', ['vaScrollDirective']);

    angular.module('app').controller('MainCtrl', MainCtrl);

})();
