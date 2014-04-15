var ArraySelector;

(function() {
    "use strict";

    /**
     * Some Monkey Patching.
     * Only for example, don't use in real project
     */
    if (typeof Array.prototype.filter === "undefined") {
        Array.prototype.filter = function(array, callback, thisArg) {
            var result = [];
            for (var i = 0, max = array.length; i < max; i++) {
                if (typeof callback === "function" && callback.call(thisArg, array[i])) {
                    result.push(array[i]);
                }
            }
            return result;
        };
        Array.prototype.forEach = function(array, callback, thisArg) {
            for (var i = 0, max = array.length; i < max; i++) {
                if (typeof callback === "function") {
                    callback.call(thisArg, array[i]);
                }
            }
        };
    }

    Array.prototype.sum = function() {
        var result = 0;
        for (var i = 0, max = this.length; i < max; i++) {
            if (typeof this[i] === "number") {
                result += this[i];
            }
        }
        return result;
    };

    ArraySelector = (function() {
        var calcSum = 10,
            searchArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            memory = {
                cache : {},
                calculate: function(arr, sum) {
                    var key = arr.join() + sum.toString();
                    if (typeof this.cache[key] === "undefined") {
                        this.cache[key] = getVariants();
                    }
                    return this.cache[key];
                }
            };

        return {
            /**
             * Find all subsets of original array, where sum of elements equals to need sum
             * @param arr (array) original array
             * @param sum (number) need sum
             * @returns {*}
             */
            getSumCombinations: function(arr, sum) {
                if ((arr instanceof Array)) {
                    searchArr = arr;
                }
                if (typeof sum === "number" && sum > 0) {
                    calcSum = sum;
                }
                return memory.calculate(searchArr, calcSum);
            }
        };

        function getVariants() {
            var cleanArray = clearArray(searchArr);
            var totalSum = cleanArray.sum();
            if (totalSum > calcSum) {
                return getArrays(cleanArray);
            } else if (totalSum === calcSum){
                return [cleanArray];
            } else {
                return [];
            }
        }

        function clearArray(arr) {
            return arr.filter(function(item) {
                return (typeof item === "number" && item > 0);
            });
        }

        function getArrays(arr) {
            var subSets = getSelections(arr);
            return subSets.filter(function(arrSet){
                return arrSet.sum() === calcSum;
            });
        }

        function getSelections(arr) {
            var total = arr.length,
                itemSet = [],
                power = Math.pow(2, total),
                result = [];

            for (var i = 0; i < power; i++) {
                itemSet = [];
                for (var j = 0; j < total; j++) {
                    if (i & (1 << j)) {
                        itemSet.push(arr[j]);
                    }
                }
                result.push(itemSet);
            }
            return result;
        }

    })();
})();