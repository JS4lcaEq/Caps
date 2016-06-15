(function ($interval, $parse, $compile) {

    function fn($interval, $parse, $compile) {

        var items = [];

        function link(scope, element, attr) {
            //console.log("simple1");


            var current = {
                indexes: { start: 0, end: 0, max: 0 }
                , counts: { scrollFalse: 0, scrollTrue: 0, scrollDown: 0, scrollUp: 0, fastScroll: 0 }
                , len: 0
                , stat: { scroll: [] }
            };


            //scope.vaDebug = current;





            scope.$watch("vaLength", function (newVal) {
                if (newVal) {
                    console.log("WINDOW $watch vaLength");
                    current.len = newVal - 0;
                    //setIndexes(0);
                    setDataWindow(0);
                }

            });

            scope.$watch("vaIndex", function (newVal) {
                console.log("WINDOW $watch vaLength");
                //setIndexes();
                setDataWindow(newVal - 0);
            });

            scope.$watch("vaSrc", function (newVal) {
                if (newVal) {
                    current.indexes.max = newVal.length;
                    //setIndexes(0);
                    setDataWindow(0);
                    console.log("WINDOW $watch vaSrc", newVal.length);
                }
            });


            function setIndexes(startIndex) {
                current.indexes.start = startIndex;
                current.indexes.end = current.indexes.start + current.len;
                if (current.indexes.end > current.indexes.max) {
                    current.indexes.end = current.indexes.max;
                }
            }

            function setDataWindow(startIndex) {
                if (!scope.vaWindow) {
                    scope.vaWindow = [];
                }

                var indexEnd = _getIndexEnd(scope.vaSrc, scope.vaLength, scope.vaIndex);
                _setDataWindow(scope.vaWindow, scope.vaSrc, scope.vaLength, scope.vaIndex, indexEnd);
            }

            function _setDataWindow(dataWindow, src, len, indexStart, indexEnd) {
                dataWindow.length = 0;
                for (var i = indexStart; i <= indexEnd; i++) {
                    dataWindow.push(src[i]);
                }
            }

            function _getIndexEnd(src, len, indexStart) {
                var indexEnd = indexStart + len;
                if (indexEnd > src.length) {
                    indexEnd = src.length;
                }
                return indexEnd;
            }

        }

        return {
            template: '<ng-transclude></ng-transclude>',
            link: link,
            transclude: true,
            scope: {
                vaWindow: "="
                , vaIndex: "<"
                , vaSrc: "<"
                , vaLength: "<"
            }
        }
    }

    angular.module("vaDataWindowDirective", []);

    angular.module("vaDataWindowDirective").directive("vaDataWindow", fn);

})();