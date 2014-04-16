Самый популярный способ передачи параметров на сервер без перезагрузки страницы - это использоввание встроенного объекта XMLHttpRequest.

Пример использования:
```js
var xhr = new XMLHttpRequest();
xhr.open('POST', '/data/items/', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log('success', xhr.responseText);
        } else {
            console.log('error');
        }
    }
};
xhr.send("param=1&item=2");
```

Данный способ не является кроссбраузерным, в частности, это касается старых IE, где XMLHttpRequest реализован как объект ActiveX

Инициализация XMLHttpRequest с учетом старых IE
```js
function getXHR() {
    if (typeof XMLHttpRequest !== "undefined") {
        return new XMLHttpRequest();
    } else {
        if (typeof ActiveXObject !== "undefined") {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    }
    throw new Error("Youe browser don't support XMLHTTPRequest");
}
```

Есть возможность передачи параметров серверу с помощью JSONP. Идея состоит в динамически создаваемом скрипте, которому в аттрибут src присваивается нужный URL.
То есть, получается обыкновенный GET-запрос. Данный способ является и кроссбраузерным и кроссдоменным.

Пример использования:
```js

```