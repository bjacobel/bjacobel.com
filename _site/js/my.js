$(".mobile-burger").click(function(){
    $(".main").toggleClass("slide-visible");
    $(".burger-lines").toggleClass("active");
});

$(function() {
    FastClick.attach(document.body);
});