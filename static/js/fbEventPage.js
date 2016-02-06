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
var count = 0;

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
        FB.api(
      		"/" + userID + "/events",
      		function (response) {
        		if (response && !response.error) {
          			(events = response.data.filter(function(e) {
          				return Date.parse(e.start_time)-36000000 < Date.now() && Date.now() < Date.parse(e.end_time)+36000000;
          			})).forEach(function(e) {
                  count++;
                  var class_num;

                  if (count % 2 == 1){
                    class_num = "gary-table-row-even";
                  }
                  else {
                    class_num = "gary-table-row-odd";
                  }
          		 		console.log(e);
                  var d = new Date(Date.parse(e.start_time))
                  // var month = d.getMonth() + 1;
                  // var day = d.getDay();
                  var time;
                  var ampm;
                  if (d.getHours() > 12){
                    time = d.getHours() % 12;
                    ampm = 'pm';
                  }
                  else if (d.getHours() == 12){
                    time = 12;
                    ampm = 'pm';
                  }
                  else if (d.getHours() == 0){
                    ampm = 'am';
                    time = 12;
                  }
                  else {
                    time = d.getHours();
                    ampm = 'am';
                  }
                  console.log(time + ampm);
                  console.log(e.place.name);
                  console.log(e.name);
                  console.log(e.id);

                  var tables = document.getElementById("table-entry-formation");

                  //do shit here
                  var tr = document.createElement("tr");
                  tr.className = class_num + " clickable-row";
                  tr.setAttribute("data-href", "http://localhost:5000/checkin/" + userID + '/events/' + e.id);

                  var td_event = document.createElement("td");
                  td_event_text = document.createTextNode(e.name);
                  td_event.appendChild(td_event_text);

                  var td_location = document.createElement("td");
                  td_location_text = document.createTextNode(e.place.name);
                  td_location.appendChild(td_location_text);

                  var td_time = document.createElement("td");
                  td_time_text = document.createTextNode(time + ampm);
                  td_time.appendChild(td_time_text);

                  tr.appendChild(td_event);
                  tr.appendChild(td_location);
                  tr.appendChild(td_time);

                  console.log(tables);
                  tables.appendChild(tr);

                  $(".clickable-row").click(function() {
                  window.document.location = $(this).data("href");
              });

          		});
        	}
      	}
  	);
      } else {
        // go backl to login page
        window.location.href = window.location.origin;
      }
  });
};