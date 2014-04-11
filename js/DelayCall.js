(function(){
    "use strict";
    Function.prototype.delayCall = function(delay) {
        delay = clampDelay(delay);
        var func = this;

        func.lastRun = new Date().getTime();
        var call = function() {
            var time = new Date().getTime();
            if (time - func.lastRun > delay) {
                func.lastRun = time;
                func.apply(this, [].slice.call(arguments));
            }
        };
        return call;
    };

    function clampDelay(delay) {
        var min = 100;
        if (typeof delay === "undefined" || delay < min) {
            return min;
        }
        return delay;
    }

})();
