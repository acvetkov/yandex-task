Tasks
----------

Some javascript tasks from Yandex.

**ArraySelector.getSumCombinations(originalArray, needSum)**

This method find all subsets of original array, where sum of elements equals to needSum
```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var results = ArraySelector.getSumCombinations(arr, 10);
/**

 [[1, 2, 3, 4],
 [2, 3, 5],
 [1, 4, 5],
 [1, 3, 6],
 [4, 6],
 [1, 2, 7],
 [3, 7],
 [2, 8],
 [1, 9],
 [10]]

*/

```

**Function.prototype.delayCall**
Метод позволяет не вызывать функцию чаще, чем 1 раз в промежуток времени
```js

var block = document.getElementById("black_square");
    var handler = function(event) {
        console.log("Handler");
    };

handler = handler.delayCall(1000); // не чаще, чем 1 раз в секунду
block.onclick = function() {
    handler();
}

```