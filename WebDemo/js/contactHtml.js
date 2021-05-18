(function(window){
	let num = 9999;
	var htmlStr = `<button>1</button>
		<button>2</button>
		<button>3</button>

		<div id="outer" style="width: 200px;padding: 30px 0;background-color: #ff0000;;">
			<div id="midder" style="padding: 30px 0;width: 100px;background-color: #cccccc;margin: 0  auto;">
				<div id="inner" style="height: 50px;width: 50px;background-color: #999;margin: 0 auto;"></div>
			</div>
		</div>
		<ul style="height: 120px;background: #ff0000;">
			<li>111111</li>
			<li>222222</li>
			<li>333333</li>
			<li>${num}</li>
		</ul>`;
		
	var htmlStr2 = `
	<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title></title>
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="app">
        
    </div>
   
    <script>
        var app = new Vue({
            el: "#app",
            data: {
				
            },

            methods: {

            },
            filters: {

            },
            directives: {

            },
            components: {

            },
            // 生命周期方法
            beforeCreate() {

            },
            created() {

            },
            beforeMount() {

            },
            mounted() {

            },
            beforeUpdate() {

            },
            updated() {

            },
            beforeDestroy() {

            },
            destroyed() {

            }


        })
    </script>

</body>

</html>
	
	`;
	document.getElementById('innerBox').innerHTML = htmlStr;
})(window);