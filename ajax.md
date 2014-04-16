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
var head = document.getElementsByTagName("head")[0];
var script = document.createElement("script");
script.async = true;
script.src = "/data/items/?callback=jsonHandler";
head.appendChild(script);

function jsonHandler(jsonData) {
    console.log(jsonData);
}
```

При этом сервер должен обернуть ответ в функцию переданную в параметр callback

```php
<?echo "jsonHandler($json)";?>
```

Аналогичным способом есть возможность передачи параметров серверу через динамически создаваемый iframe. Этот способ похож на JSONP, но у него есть кроссдоменное ограничение.
Данные можно передать только на текущий домен и его субдомены.

Пример реализации:

```js
var iframe = document.createElement("iframe");
iframe.name = "tmp";
iframe.src = "/data/items/?callback=jsonHandler";
document.body.appendChild(iframe);

var handler = function(jsonData) {
    console.log(jsonData);
}
```

Сервер так же, как и в случае с JSONP, должен обернуть ответ в функцию и теги <script>
```php
<?echo "<script>parent.handler($json)</script>";?> # parent - ссылка на родительское окно
```