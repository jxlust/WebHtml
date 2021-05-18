// 防劫持
(function() {
  var href = window.self.location.href;

  if (window.frameElement) {
    (window.top || window.parent).location.href = href;
    return;
  };

  // var site = window.self.location.protocol + '//' + window.self.location.hostname;

  // try {
  //   if (window.top.location.href !== href) {
  //     window.top.location.href = site + '/404.html';
  //   };
  // } catch(e) {
  //   window.self.location.href = site + '/404.html';
  // };
})();


/**
 * 代码高亮
 */
hljs.initHighlightingOnLoad();

// 导航高亮当前位置
(function() {
  // console.log(typeof document.querySelector)
  if (typeof document.querySelectorAll !== 'function') {return};

  var hrefs = {
    full: location.href,
    path: location.href
  };

  if (hrefs.path.indexOf('?') >= 0) {
    hrefs.path = hrefs.path.slice(0, hrefs.path.indexOf('?'));
  };

  var links = document.getElementById('nav').querySelectorAll('a');
  var _link;
  var _index;

  // console.log(hrefs);

  for (var i = 0, l = links.length; i < l; i++) {
    _link = links[i].href;

    if (_link === hrefs.full) {
      _index = i;
      break;
    };

    if (_link.indexOf('?') >= 0) {
      _link = _link.slice(0, _link.indexOf('?'));
    };

    if (_link === hrefs.path) {
      _index = i;
      break;
    };
  };

  if (typeof _index === 'number' && _index >= 0) {
    links[_index].parentNode.classList.add('n');
  };
})();

