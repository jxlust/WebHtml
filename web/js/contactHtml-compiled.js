'use strict';

(function (window) {
  var num = 9999;
  var htmlStr = '<button>1</button>\n\t\t<button>2</button>\n\t\t<button>3</button>\n\n\t\t<div id="outer" style="width: 200px;padding: 30px 0;background-color: #ff0000;;">\n\t\t\t<div id="midder" style="padding: 30px 0;width: 100px;background-color: #cccccc;margin: 0  auto;">\n\t\t\t\t<div id="inner" style="height: 50px;width: 50px;background-color: #999;margin: 0 auto;"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t<ul style="height: 120px;background: #ff0000;">\n\t\t\t<li>111111</li>\n\t\t\t<li>222222</li>\n\t\t\t<li>333333</li>\n\t\t\t<li>' + num + '</li>\n\t\t</ul>';

  var htmlStr2 = '\n\t<!DOCTYPE html>\n<html>\n\n<head>\n    <meta charset="utf-8" />\n    <title></title>\n    <script src="../js/vue.js"></script>\n</head>\n\n<body>\n    <div id="app">\n        \n    </div>\n   \n    <script>\n        var app = new Vue({\n            el: "#app",\n            data: {\n\t\t\t\t\n            },\n\n            methods: {\n\n            },\n            filters: {\n\n            },\n            directives: {\n\n            },\n            components: {\n\n            },\n            // \u751F\u547D\u5468\u671F\u65B9\u6CD5\n            beforeCreate() {\n\n            },\n            created() {\n\n            },\n            beforeMount() {\n\n            },\n            mounted() {\n\n            },\n            beforeUpdate() {\n\n            },\n            updated() {\n\n            },\n            beforeDestroy() {\n\n            },\n            destroyed() {\n\n            }\n\n\n        })\n    </script>\n\n</body>\n\n</html>\n\t\n\t';
  document.getElementById('innerBox').innerHTML = htmlStr;
})(window);
