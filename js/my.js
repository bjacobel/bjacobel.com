//jQuery to expand the content drawer and fade elements
$(document).ready(function(){
    $(".navitem").click(function() {
        //read which tile is active from session storage
        var activeTile = sessionStorage.getItem("activeTile");

        //if expanded & the active tile is clicked on again, close it, set everyone back to bright
        if ($("#contentdrawer").css("height")!="0px" && $(this).attr("tag")==activeTile){
            //collapse the backdrop
            $(".contentbackdrop").css("height", "0%");

            //hide all content - set html equal to ""
            $(".content").html("");

            //get rid of the arrow
            $(".arrow").css("visibility","hidden");

            setTimeout(function() {
                //collapse the drawer after the content is gone
                $("#contentdrawer").css("height", "0px");

                //delay putting the shadow back until the drawer is closed
                setTimeout(function() { 
                    $("#navshadow").addClass("bottomshadow"); 
                }, 250);
            }, 175);

            //set no tile as active
            sessionStorage.setItem("activeTile", -1);
        }

        //if not expanded and no other tile is active, open it
        else if ($("#contentdrawer").css("height")=="0px" && activeTile==-1) {
            //open the drawer
            $("#contentdrawer").css("height", "40%");

            //take the shadow off the bottom of the navbar
            $("#navshadow").removeClass("bottomshadow");

            var thistile = $(this);

            //only do this stuff after the drawer is open
            setTimeout(function() {
                //put up the backdrop and make the arrow visible on the correct tab
                $(".contentbackdrop").css("height", "82%");
                $(".arrow").css("left", arrowPos($(thistile).attr("tag")));
                $(".arrow").css("visibility", "visible");

                //make the right content visible
                $(".content").load($(thistile).attr("exthtml"));
                require("js/swipeview.js", function () {
                    SwipeView($("#swipeview-slider"));
                });
            }, 150);

            //set this tile as active
            sessionStorage.setItem("activeTile", $(this).attr("tag"));
        }

        //if expanded & a new tile is clicked, switch the tile focus but don't do anything to the drawer
        else if ($("#contentdrawer").css("height")!="0px" && activeTile!=-1 && activeTile!=$(this).attr("tag")){
            //move the arrow
            $(".arrow").css("left", arrowPos($(this).attr("tag")));

            var thistile = $(this);

            //make the right content visible
            $(".content").load($(thistile).attr("exthtml"));

            //set this tile as active
            sessionStorage.setItem("activeTile", $(this).attr("tag"));
        }

    });
});

//stores a local variable... shitty coding alert (but it works)
function setupStorage() {
    sessionStorage.setItem("activeTile", -1);
}

function arrowPos(tile) {
    switch (tile) {
        case "0":
        return "10%"; break;
        case "1":
        return "35.5%"; break;
        case "2":
        return "61%"; break;
        case "3":
        return "87%"; break;
        default:
        return null;
    }
}
