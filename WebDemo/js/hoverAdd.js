var origalArray = ['../images/test1_0.png', '../images/test2_0.png'];
	var hoverArrya = ['../images/test1_1.png', '../images/test2_1.png'];
	var htmlStr = '';
	origalArray.forEach(function(item, index, obj) {
		console.log('item', item);
		htmlStr += '<li style="background: url(' + item + ') no-repeat center"></li>';
	})
	document.getElementsByClassName('js-add-image')[0].innerHTML = htmlStr;
	$('.js-add-image > li').each(function() {
		console.log('', $(this).index());
		var hIndex = $(this).index();
		$(this).hover(function() {
			$(this).css('background', 'url(' + hoverArrya[hIndex] + ') no-repeat center')
		}, function() {
			$(this).css('background', 'url(' + origalArray[hIndex] + ') no-repeat center')
		});
	})
