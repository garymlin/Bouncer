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
        FB.api(window.location.pathname.slice(window.location.pathname.lastIndexOf('/')),
          function(ev) {
              $(party).text(ev.name);
              FB.api(window.location.pathname.slice(window.location.pathname.lastIndexOf('/')) + "/admins",
          function(response) {
            for(var i = 0; i < response.data.length; i++) {
              if(response.data[i].id === userID) {
                  window.location.href = window.location.origin + '/checker/' + userID + '/events' + window.location.pathname.slice(window.location.pathname.lastIndexOf('/'));
                  return;
              }
            }
          $(checkinbutton).click(function() {
            $.ajax({
                url:'/api/checkin/'+userID,
                type:'post',
                data:{passcode:$(formInput).val()},
                sucess:function() {
                  console.log("GREAT SUCCESS");
                },
                error:function() {
                  console.log("request failed");
                }, complete:function() {
                  console.log("Complete");
                  window.location.href = window.location.origin + '/checker/' + userID + '/events' + window.location.pathname.slice(window.location.pathname.lastIndexOf('/'));
                }
          });
          });
        });
          });

        
    } else {
        	// go back to login page
        	window.location.href = window.location.origin;
  	}
  });
};