//jQuery to expand the content drawer and fade elements
$(document).ready(function(){
    $(".nav-item").click(function() {
        //read which tile is active from session storage
        var activeTile = sessionStorage.getItem("activeTile");

        //if expanded & the active tile is clicked on again, close it, set everyone back to bright
        if ($("#content-drawer").css("height")!="0px" && $(this).attr("tag")==activeTile){
            //collapse the backdrop
            $(".content-backdrop").css("height", "0%");

            //get rid of the arrow
            $(".arrow").css("visibility","hidden");

            setTimeout(function() {
                //collapse the drawer after the content is gone
                $("#content-drawer").css("height", "0px");

                //hide all content - set html equal to ""
                $(".content").html("");
            }, 130);

            //set no tile as active
            sessionStorage.setItem("activeTile", -1);
        }

        //if not expanded and no other tile is active, open it
        else if ($("#content-drawer").css("height")=="0px" && activeTile==-1) {
            console.log("asdf");
            //open the drawer
            $("#content-drawer").css("height", "40%");

            thistile = $(this);

            //only do this stuff after the drawer is open
            setTimeout(function() {
                //put up the backdrop and make the arrow visible on the correct tab
                $(".content-backdrop").css("height", "82%");
                $(".arrow").css("left", arrowPos($(thistile).attr("tag")));
                $(".arrow").css("visibility", "visible");

                //make the right content visible
                $(".content").load($(thistile).attr("exthtml"));
            }, 150);

            //set this tile as active
            sessionStorage.setItem("activeTile", $(this).attr("tag"));
        }

        //if expanded & a new tile is clicked, switch the tile focus but don't do anything to the drawer
        else if ($("#content-drawer").css("height")!="0px" && activeTile!=-1 && activeTile!=$(this).attr("tag")){
            //move the arrow
            $(".arrow").css("left", arrowPos($(this).attr("tag")));

            thistile = $(this);

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
            return "10%";
        case "1":
            return "35.5%";
        case "2":
            return "61%";
        case "3":
            return "87%";
        default:
            return null;
    }
}
