/*	$('button').on('click', function() {
			console.log($(this).index());
		});*/
/*	$('button').click(function(){
		console.log($(this).index()+" .");
	})
*/
var len = document.getElementsByTagName('button').length;
console.log(len);
var obj = document.getElementsByTagName('button');
console.log(obj[1])
for(var i = 0; i < len; i++) {
	(function(j) {
		obj[j].onclick = (function(e) {
			//console.log(e);
			console.log(j + "闭包");

		});
	})(i)

}
/*	for(var i = 0; i < len; i++) {
		(
			function(j) {
				document.getElementsByTagName('button')[j].click(function() {
					console.log("闭包"+j);
				});
			}
		)(i)

	}*/