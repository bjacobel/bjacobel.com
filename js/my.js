//jQuery to expand the content drawer and fade elements
$(document).ready(function(){
    var activeTile = -1;

    $(".nav-item").click(function() {
        // if expanded & the active tile is clicked on again, close it
        if ($(this).attr("tag")==activeTile){
            $(".content").fadeOut("fast", function(){
                $(".content").html("");
            });
            activeTile = -1;
        }
        //if not expanded and no other tile is active, open it
        else if (activeTile==-1) {
            $(".content").load($(this).attr("exthtml"), function(){
                $(".content").fadeIn();
            });
            activeTile = $(this).attr("tag");
        }
        //if expanded & a new tile is clicked, switch the tile focus
        else if (activeTile!=$(this).attr("tag")){
            // yo dawg I heard you like callbacks
            $newtile = $(this).attr("exthtml");
            $(".content").fadeOut("fast", function(){
                $(".content").load($newtile, function(){
                    $(".content").fadeIn();
                });
            });
            activeTile = $(this).attr("tag");
        }

    });
});
