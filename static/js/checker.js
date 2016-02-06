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
        
        $(check_in_friend).click(function() {
            console.log("what the fuck");
            console.log(userID);
            // action= "http://localhost:5000/api/checkin/" method ="post"
            var pathh = window.location.pathname;
            window.location.href = window.location.origin + '/key/' + userID + '/events' + pathh.slice(pathh.lastIndexOf('/'));
          //   $(formInput).submit(function(event) {
          //     console.log(event);
              
          // });
          

        });

        
    } else {
        	// go back to login page
        	window.location.href = window.location.origin;
  	}
  });
};

// function checkIn(key) {
// 	$.ajax({url: "/check-in/"+userID+"/"+key.toLowerCase(), success: function(result){
//         if(result === '200 OK') {
//         	// validation succeeded
//         } else {
//         	// validation fucked
//         }
//     }});
// }
