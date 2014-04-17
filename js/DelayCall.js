(function() {

    "use strict";

    /**
     * Вызов метода не чаще 1 раза в промежуток времени
     * @param delay
     * @returns {call}
     */
    Function.prototype.delayCall = function(delay) {
        delay = clampDelay(delay);
        var func = this;

        func.lastRun = new Date().getTime();
        var call = function() {
            var time = new Date().getTime();
            if (time - func.lastRun > delay) {
                func.lastRun = time;
                func.apply(func, [].slice.call(arguments));
            }
        };
        return call;
    };

    /**
     * Вызов метода count раз за 1 секунду
     * @param count
     * @returns {call}
     */
    Function.prototype.timeCall = function(count) {
        var func = this;
        var compare = new Date().getTime();
        var total = 0;
        var call = function() {
            total++;
            var time = new Date().getTime();
            if (time - compare <= 1000) {
                if (total <= count) {
                    func.apply(func, [].slice.call(arguments));
                }
            } else {
                compare = time;
                total = 0;
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
