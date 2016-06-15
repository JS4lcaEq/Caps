(function () {

    function MainCtrl($scope) {
        this.test = "test";
        this.scroll = 0;
        this.doScroll = function (scroll) {
            var self = this;
            self.scroll = scroll;
        }
    }

    angular.module('app', ['vaScrollDirective']);

    angular.module('app').controller('MainCtrl', MainCtrl);

})();
