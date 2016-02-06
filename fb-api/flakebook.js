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
      } else {
        FB.login(stalk, {scope: 'user_events'});
      }
  });
};

var stalk = function(response) {
  FB.api(
      "/" + userID + "/events",
      function (response) {
        if (response && !response.error) {
          (events = response.data.filter(function(e) {
          	return Date.parse(e.start_time)-3600000 < Date.now() && Date.now() < Date.parse(e.end_time)+3600000;
          })).forEach(function(e) {
          	 // 
          });
        }
      }
  );
}

var eventPhoto = function(event) {
	FB.api(
    "/"+event.id+"/picture",
    {type:"normal"},
    function (response) {
      if (response && !response.error) {
        console.log(response);
      }
    }
);}

function checkIn(key) {
	$.ajax({url: "/check-in/"+userID+"/"+key.toLowerCase(), success: function(result){
        if(result === '200 OK') {
        	// validation succeeded
        } else {
        	// validation fucked
        }
    }});
}

function getKey() {
	$.ajax({url: "/key/"+userID, success: function(result){
        console.log(result);
        // gots key
    }});
}