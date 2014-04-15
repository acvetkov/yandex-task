/*global console*/
(function(){
    "use strict";

    function reversePrint(linkedList) {
        var result = [];
        var iterator = function(linkedList) {
            if (typeof linkedList.value !== "undefined") {
                result.unshift(linkedList.value);
            }
            if (linkedList.next) {
                iterator(linkedList.next);
            }
        };
        iterator.call(null, linkedList);
        console.log(result.join(', '));
    }

    var someList = {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    };

    reversePrint(someList);
})();