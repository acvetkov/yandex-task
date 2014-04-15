/*global describe, it, ArraySelector*/

"use strict";
var fs = require('fs');
var vm = require('vm');
var path = './js/ArraySelector.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);
var assert = require("assert");

describe('ArraySelector tests', function(){
    it('should return empty array', function(){
        var arr = [1, 2, 3],
            emptyArr = [],
            symbolsArr = ["some", "symbols", "and", "words"];

        assert.equal(ArraySelector.getSumCombinations(arr, 10).length, 0);
        assert.equal(ArraySelector.getSumCombinations(emptyArr, 10).length, 0);
        assert.equal(ArraySelector.getSumCombinations(symbolsArr, 10).length, 0);

    });
    it('should return expected count of subsets', function(){
        var arr = [1, 2, 3],
            big = [1, 2, 3, 4, 5];

        assert.equal(ArraySelector.getSumCombinations(arr, 10).length, 0);
        assert.equal(ArraySelector.getSumCombinations(arr, 3).length, 2);
        assert.equal(ArraySelector.getSumCombinations(big, 5).length, 3);
    });

    it('should return right arrays', function() {
        var originalArray = ['1', 1, 2, 3, 4, 5, 6, 7, 8, 0, 12, 9],
            fiveCombinations = [[5], [2, 3], [1, 4]],
            sum = 5;

        var fiveResult = ArraySelector.getSumCombinations(originalArray, 5);
        assert.equal(fiveCombinations.length, fiveResult.length);
        fiveResult.forEach(function(item){
            assert.equal(getArraySum(item), sum);
        });

        function getArraySum(arr) {
            var result = 0;
            arr.forEach(function(item){
                if (typeof item === "number") {
                    result += item;
                }
            });
            return result;
        }
    });

    it('should return empty array or one subset array', function(){
        var arr = [1, 2, 3],
            expected = [[1, 2, 3]];
        var result = ArraySelector.getSumCombinations(arr, 6);
        assert.deepEqual(result, expected);

        var emptyResult = ArraySelector.getSumCombinations(arr, 7);
        assert.equal(emptyResult.length, 0);
    });
});