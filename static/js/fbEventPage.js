// init facebook
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var userID;
var events;

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
        stalk();
        FB.api(
      		"/" + userID + "/events",
      		function (response) {
        		if (response && !response.error) {
          			(events = response.data.filter(function(e) {
          				return Date.parse(e.start_time)-36000000 < Date.now() && Date.now() < Date.parse(e.end_time)+36000000;
          			})).forEach(function(e) {
          		 		console.log(e);
          		});
        	}
      	}
  	);
      } else {
        // go backl to login page
        FB.login(stalk, {scope: 'user_events'});
      }
  });
};