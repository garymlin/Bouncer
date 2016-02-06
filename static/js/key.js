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
        // console.log(url);
        getKey();
        $(doneButton).click(function() {
          var pathh = window.location.pathname;
          window.location.href = window.location.origin + '/checkin/' + userID + '/events' + pathh.slice(pathh.lastIndexOf('/'));
        });


    } else {
          // go back to login page
          window.location.href = window.location.origin;
    }
  });
};

function getKey() {
  $.ajax({url: "api/key/"+userID, success: function(result){
        console.log(result);
        var text = document.createTextNode(result);
        var unique_key = document.getElementById("unique_key");
        unique_key.appendChild(text);

    }});
}