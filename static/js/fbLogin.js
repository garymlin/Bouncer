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
        		FB.login(goToCheckIn, {scope: 'user_events'});
      		}
  		});
	});
}
var goToCheckIn = function() {
	window.location.href += 'checkin';
}

