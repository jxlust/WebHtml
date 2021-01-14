//Cookie取值
function readCookie(name) {
	var cookieValue = "";
	var search = name + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
				end = document.cookie.length;
			cookieValue = decodeURIComponent(document.cookie.substring(offset, end))
		}
	}
	return cookieValue;
}
//Cookie设置值
function writeCookie(name, value, hours) {
	var expire = "";
	if (hours != null) {
		expire = new Date((new Date()).getTime() + hours * 3600000);
		expire = "; expires=" + expire.toGMTString();
	}
	document.cookie = name + "=" + encodeURIComponent(value) + expire;
}
//调用设置
writeCookie("myCookie", "my name", 24);
//调用取值
alert(readCookie("myCookie"));
