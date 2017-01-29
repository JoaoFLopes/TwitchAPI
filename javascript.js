$(document).ready(function () {

    var urlFCC = "https://wind-bow.gomix.me/twitch-api/streams/freecodecamp";
    var channels = ["ESL_SC2", "test_channel", "Nightblue3" , "TSM_Bjergsen", "Dyrus", "Ebonusgg", "NALCS2", "NALCS1"];


    //Get the data from the Free Code Camp channel
    $.getJSON(urlFCC, function(data){

        if(data.stream === null){
            $("#fccstatus").html("<h3 class='text-danger'>Free Code Camp is Offline</h3>");
        }
        else{
            $("#fccstatus").html("<h3 class='text-success'>Free Code Camp is Online</h3>");
        }

    });

    var createURL = function(name){
        return "https://www.twitch.tv/"+name;
    }

    channels.forEach(function (channel){
        var game;
        var status;
        var logo;
        var name;
        var streamURL;
        var boxClass;
        var description;

        var url = 'https://wind-bow.gomix.me/twitch-api/streams/' + channel + '?callback=?';
        $.getJSON(url, function(data){

            name = channel;
            streamURL = createURL(name);
            boxClass = "offline";
            if(data.stream === null){
                description = status = "Offline";
                game = "";
                logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=Offline";
            } else if(data.stream === undefined){
                description = status = "Account Doesn't Exist";
                game = "";
                logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
            } else {
                game = data.stream.game + ":";
                description = data.stream.channel.status;
                status = "online";
                name = data.stream.channel.display_name;
                logo = data.stream.channel.logo;
                boxClass = "online";
            }
            var html = "<br><div class='row " + boxClass + "'><div class='col-md-4'><img class='small-image' src='"+ logo + "'></div><div class='col-md-4'><a class='link-unstyled' href='" + streamURL + "' target='_blank' >" + name + " <i class='fa fa-twitch' aria-hidden='true'></i></a></div><div class='col-md-4'>" + game + description + "</div></div>";

            if(status != "online"){
                $("#followerInfo").append(html);
            } else {
                $("#followerInfo").prepend(html);
            }
        });
    });
});