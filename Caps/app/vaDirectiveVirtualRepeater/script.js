(function ($interval, $parse, $compile) {

    function fn($interval, $parse, $compile) {

        var items = [];

        function link(scope, element, attr) {
            //console.log("simple1");
            var elements = {
                items: element.find(".va-items")
                , listBox: element.find(".va-list-box")
                , list: element.find(".va-list")
                , box: element.find(".va-virtual-repeater")
                , spacers: { fast: element.find(".va-scroll-fast .va-spacers") }
                , scrolls: { fast: element.find(".va-scroll-fast") }
            };

            var current = {
                height: { box: 0, item: 0, fastItem: 0, spacers: { slow: 0, fast: 0, fastActive: 0 } }
                , triggers: { scroll: false, scrollFast: false }
                , indexes: { start: 0, end: 0, max: 0 }
                , counts: { scrollFalse: 0, scrollTrue: 0, scrollDown: 0, scrollUp: 0, fastScroll: 0 }
                , ready: { template: false, height: false }
                , len: 0
                , scroll: 0
                , subScope: null
                , stat: { scroll: [] }
                , h: 0
                , intervals: { fastScroll: null }
                , touchStart:0
            };


            scope.dataWindow = [];
            scope.vaDebug = current;

            elements.scrolls.fast.on("scroll", function () {
                    if (current.intervals.fastScroll) {
                        current.counts.fastScroll++;
                        return;
                    }
                scope.$apply(function () {

                    if (current.triggers.scrollFast) {
                        current.triggers.scrollFast = false;
                        return;
                    }


                    var scroll = elements.scrolls.fast.scrollTop();
                    current.indexes.start = Math.round(scroll * current.height.fastItemInverse);


                    current.intervals.fastScroll = $interval(function () {
                        setIndexes(current.indexes.start);

                        setDataWindow();
                        current.intervals.fastScroll = null;
                    }, 30, 1);
                });
            });

            elements.list.on("touchstart", function (event) {
                current.touchStart = event.originalEvent.touches[0].clientY + 0;
                event.preventDefault();
                console.log("touchstart", current.touchStart, event.originalEvent.target);
                //return false;
            });

            elements.list.on("touchmove", function (event) {
                event.preventDefault();
                var wheel = current.touchStart - event.originalEvent.touches[0].clientY;
                if (wheel > 15 || wheel < -15) {
                    current.touchStart = event.originalEvent.touches[0].clientY;
                    scope.$apply(function () {
                        onWheel(wheel/10);
                    });
                }

                    console.log("touchmove",event.originalEvent.touches[0].clientY, wheel);
                //return false;
            });

            elements.list.on("touchend", "div", function (event) {
                console.log("touchend");
            });

            elements.listBox.on("wheel", function (event) {
                var wheel = event.originalEvent.deltaY;
                scope.$apply(function () {
                    onWheel(wheel);
                });
                return false;
            });

            scope.$watch("vaTemplate", function () {
                console.log("$watch vaTemplate");
                setTemplate();
            });

            scope.$watch("vaLength", function (newVal) {
                console.log("$watch vaLength");
                current.len = newVal * 1;
                setHeight();
                setDataWindow();
            });

            scope.$watch("vaSrc", function (nw) {

                if (nw) {
                    elements.scrolls.fast.scrollTop(0);
                    current.indexes.max = nw.length - 1;
                    current.height.spacers.fast = nw.length * current.height.item;
                    if (current.height.spacers.fast > current.height.box * 20) {
                        current.height.spacers.fast = current.height.box * 20;
                    }
                    current.height.spacers.fastActive = current.height.spacers.fast - current.height.box;
                    if (current.height.spacers.fastActive < 0) current.height.spacers.fastActive = 0;
                    if (current.height.spacers.fastActive > 0 && current.indexes.max > 0) {
                        current.height.fastItem = current.height.spacers.fastActive / current.indexes.max;
                    } else {
                        current.height.fastItem = 0;
                    }
                    if (current.height.spacers.fastActive > 0) {
                        current.height.fastItemInverse = current.indexes.max / current.height.spacers.fastActive;
                    } else {
                        current.height.fastItemInverse = 0;
                    }

                    elements.spacers.fast.height(current.height.spacers.fast);

                    setIndexes(0);
                    console.log("$watch vaSrc", nw.length, current.height);
                    if (current.height.box > 0) {
                        setDataWindow();
                    } else {
                        $interval(function () {
                            setDataWindow();
                        }, 0, 1);
                    }

                }
            });

            scope.onClick = function (item, index) {
                //console.log("onClick", this);
                scope.vaOnClick({ obj: { index: index, item: item } });
            };

            function onWheel(diff) {
                if (diff > 0) {
                        current.indexes.start += 1;

                        if (current.indexes.start > current.indexes.max) {
                            current.indexes.start = current.indexes.max;
                        }
                        setIndexes(current.indexes.start);
                        setDataWindow();
                        current.scroll = Math.round(current.indexes.start * current.height.fastItem);
                        current.triggers.scrollFast = true;
                        elements.scrolls.fast.scrollTop(current.scroll);
                        current.counts.scrollDown++;
                    } else {
                    if (diff < 0) {
                            current.indexes.start += -1;
                            if (current.indexes.start < 0) {
                                current.indexes.start = 0;
                            }
                            setIndexes(current.indexes.start);
                            setDataWindow();
                            current.scroll = Math.round(current.indexes.start * current.height.fastItem);
                            current.triggers.scrollFast = true;
                            elements.scrolls.fast.scrollTop(current.scroll);
                            current.counts.scrollUp++;
                        }
                    }
            }

            function setHeight() {
                current.ready.height = false;
                scope.dataWindow.length = 0;
                current.height.box = 200;
                current.height.item = 20;
                elements.box.height(current.height.box);
                //elements.list.css("margin-top", current.h + "px").css("margin-bottom", current.h + "px");
                //elements.listBox.scrollTop(1000);
                scope.dataWindow.length = 0;
                current.ready.height = true;
            }

            function setIndexes(startIndex) {
                current.indexes.start = startIndex;
                current.indexes.end = current.indexes.start + current.len;
                if (current.indexes.end > scope.vaSrc.length) {
                    current.indexes.end = scope.vaSrc.length;
                }
            }

            function setDataWindow() {

                scope.dataWindow.length = 0;
                for (var i = current.indexes.start; i < current.indexes.end; i++) {
                    scope.dataWindow.push(scope.vaSrc[i]);
                }
            }

            function setTemplate() {
                var tmpl = '<li class="va-items" ng-repeat="(index, item) in dataWindow"  ng-click="onClick(item, index)">' + scope.vaTemplate + '&nbsp;</li>';
                var newElement = angular.element(tmpl);
                var subScope = scope.$new(false);
                $compile(newElement)(subScope);
                if (current.subScope) {
                    current.subScope.$destroy();
                }
                current.subScope = subScope;
                elements.list.html('<li class="va-items"></li>');
                element.find(".va-items").replaceWith(newElement);
                current.ready.template = true;
            }

            //setTemplate();


        }

        return {
            //template: 
            //    '<div class="va-virtual-repeater">' +
            //        '<ul class="va-list">' +
            //            '<li class="va-items"></li>' +
            //        '</ul>' +
            //        '<div class="va-scroll-slow">' +
            //            '<div class="va-spacers"></div>' +
            //        '</div>' +
            //        '<div class="va-scroll-fast">' +
            //            '<div class="va-spacers"></div>' +
            //        '</div>' +
            //    '</div>',
            templateUrl: function () { return "app/vaDirectiveVirtualRepeater/template.html?t=" + Math.random(); },
            link: link,
            transclude: true,
            scope: {
                vaTemplate: "<"
                , vaSrc: "="
                , vaLength: "<"
                , vaDebug: "="
                , vaLastClickedItem: "="
                , vaOnClick: "&"
                , test: "@"
            }
        }
    }

    angular.module("vaVirtualRepeaterDirective", []);

    angular.module("vaVirtualRepeaterDirective").directive("vaVirtualRepeater", fn);

})();