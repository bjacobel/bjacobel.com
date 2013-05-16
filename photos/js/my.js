$(window).load(function() {
    var $wrapper = $('div.wrapper');
    $wrapper.css("width",parseInt($('body').css("width"))-getScrollbarWidth());
    $wrapper.imagesLoaded(function(){
	$wrapper.masonry({
	    itemSelector : '.picdiv',
	    isAnimated: !Modernizr.csstransitions,
	    columnWidth: function( containerWidth ) {
		return (containerWidth / 4);
	    }
	});
    });
    //kill the loading bar
    $("#loading").fadeOut();
    //fade in
    $("div.picdiv").each(function(i) {
	$(this).fadeIn(800);
    });
});

function jsonFlickrApi(o){
    $(document).ready(function() {
	for (var i=0; o.photos.photo[i]; i++){
	    var image_big = o.photos.photo[i].url_l;
	    var newhtml = '<div class="picdiv"><a class="pic" href="' + image_big + '" rel="lightbox[slideshow]"><img class="pic" src="' + image_big + '"></div>';
	    $('div.wrapper').append(newhtml);
	}
    });
}



$(document).ready(function(){
    sessionStorage.setItem("aboutCollapsed",1);
    $("div#about").click(function(){
	if (sessionStorage.getItem("aboutCollapsed")==1) { //about box is collapsed
	    //expand it, put in longer text
	    $("p#shortabout").css("visibility", "hidden");
	    $("p#longabout").css("visibility", "visible");
	    $("div#about").addClass("expandabout");
	    sessionStorage.setItem("aboutCollapsed",0);
	} else {
	    //collapse it, hide text
	    $("p#shortabout").css("visibility", "visible");
	    $("p#longabout").css("visibility", "hidden");
	    $("div#about").removeClass("expandabout");
	    sessionStorage.setItem("aboutCollapsed",1);
	}
    });
});

function getScrollbarWidth()
{
    if(window.navigator.platform!="MacIntel"){
	var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div></div>');
	$('body').append(div);
	var w1 = $('div', div).innerWidth();
	div.css('overflow-y', 'auto');
	var w2 = $('div', div).innerWidth();
	$(div).remove();
	return(w1 - w2);
    } else {
	return(0);
    }
}

//animate the loading banner
i = 0;
setInterval(function() {
    i = ++i % 4;
    $("#loading").html("LOADING"+Array(i+1).join("."));
}, 500);
