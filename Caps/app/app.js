(function () {

    function MainCtrl($scope) {
        this.test = "test";
        this.scroll = 0;
        this.setScroll = 0;
        this.doScroll = function (scroll) {
            var self = this;
            self.setScroll = scroll;
        }
    }

    angular.module('app', ['vaScrollDirective']);

    angular.module('app').controller('MainCtrl', MainCtrl);

})();
