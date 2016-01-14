$(function(){
  var redirect_url = "http://home.a-know.me";
  if (document.referrer) {
    var referrer = "referrer=" + encodeURIComponent(document.referrer);
    redirect_url = redirect_url + (location.search ? '&' : '?') + referrer;
  }
  location.href = redirect_url;
});