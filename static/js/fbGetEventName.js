// init facebook
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var userID;

window.fbAsyncInit = function() {
  FB.init({
        appId      : '1678482825757904',
        xfbml      : true,
        version    : 'v2.5'
  }); 
  //login
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
        userID = response.authResponse.userID;
        var pathh = window.location.pathname;
        FB.api(
    	pathh.slice(pathh.lastIndexOf('/')),
    	function (response) {
      	if (response && !response.error) {
        	// what do reponse.name = event name
      	}
    }
);
    } else {
        // go back to login page
		window.location.href = window.location.origin;
  	}
  });
};
