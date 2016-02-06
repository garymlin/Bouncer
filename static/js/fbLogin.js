// init facebook
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
  	FB.init({
        appId      : '1678482825757904',
        xfbml      : true,
        version    : 'v2.5'
  	});
	$(loginButton).click(function() {
		FB.getLoginStatus(function(response) {
    		if (response.status === 'connected') {
        		goToCheckIn();
     	 	} else {
        		var isMobile = false;
            try {
              isMobile = (window.location.href == top.location.href && window.location.href.indexOf("/mobile/") != -1);
            } catch (e) {}
            if (!isMobile) {
              FB.login(goToCheckIn, {scope: 'user_events'});
            } else {
              var permissionUrl = "https://m.facebook.com/dialog/oauth?client_id=1678482825757904&response_type=code&redirect_uri="+window.location.href+"events&scope=user_events";
              window.location = permissionUrl;
              return;
            }
      		}
  		});
	});
}
var goToCheckIn = function() {
	window.location.href += 'events';
}