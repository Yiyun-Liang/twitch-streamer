var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getChannelInfo(){
  channels.forEach(function(channel){

    var game = '', status = '';

    function makeUrl(type, name){
      return "https://wind-bow.gomix.me/twitch-api/" + type + '/' + name + "?callback=?";
    }

    $.getJSON(makeUrl("streams", channel), function(res){

      if(res.stream === null){
        game = 'Offline';
        status = 'offline';
      }else if(res.stream === undefined){
        game = 'Account Closed';
        status = 'offline';
      }else{
        game = res.stream.game;
        status = 'online';
      }
    });

    $.getJSON(makeUrl("channels", channel), function(res){

      var logo = res.logo !== null ? res.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
          name = res.display_name !== null ? res.display_name : channel,
          description = status === "online" ? ': ' + res.status : "";
      var html = '<div class="row ' +
          status + '"><div class="col-xs-2 col-sm-1" id="icon"><img src="' +
          logo + '" class="logo"></div><div class="col-xs-10 col-sm-3" id="name"><a href="' +
          res.url + '" target="_blank">' +
          name + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">'+
          game + '<span class="hidden-xs">' +
          description + '</span></div></div>';

      if(status === 'online'){
        $(".form").prepend(html);
      }else{
        $(".form").append(html);
      }
    });
  });
}

$(document).ready(function(){
  getChannelInfo();
  $(".selector").on('click', function(){
    $(".selector").removeClass("active");
    $(this).addClass("active");
    var status = $(this).attr("id");
    if(status === 'all'){
      $(".online").removeClass("hidden");
      $(".offline").removeClass("hidden");
    }else if(status === 'online'){
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
    }else{
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }
  });
});
