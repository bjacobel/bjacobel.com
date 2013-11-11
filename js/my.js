//jQuery to expand the content drawer and fade elements
$(document).ready(function(){
    var activeTile = -1;

    $(".nav-item").click(function() {
        // if expanded & the active tile is clicked on again, close it, set everyone back to bright
        if ($("#content-drawer").css("height")!="0px" && $(this).attr("tag")==activeTile){
            // collapse the backdrop
            $(".content-backdrop").css("height", "0%");

            // collapse the drawer
            $("#content-drawer").css("height", "0px");

            // hide all content - set html equal to ""
            $(".content").html("");

            // set no tile as active
            activeTile = -1;
        }

        //if not expanded and no other tile is active, open it
        else if ($("#content-drawer").css("height")=="0px" && activeTile==-1) {
            //open the drawer
            $("#content-drawer").css("height", "50%");

            // put up the backdrop
            $(".content-backdrop").css("height", "100%");

            // make the correct content visible
            $(".content").load($(this).attr("exthtml"));

            //set this tile as active
            activeTile = $(this).attr("tag");
        }

        //if expanded & a new tile is clicked, switch the tile focus but don't do anything to the drawer
        else if ($("#content-drawer").css("height")!="0px" && activeTile!=-1 && activeTile!=$(this).attr("tag")){
            // make the correct content visible
            $(".content").load($(this).attr("exthtml"));

            // set this tile as active
            activeTile = $(this).attr("tag");
        }

    });
});
