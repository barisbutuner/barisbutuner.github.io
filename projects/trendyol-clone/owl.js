$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        dots: false,
        
        responsive:{
            0:{
                items:5
            },
            600:{
                items:7
            },
            1000:{
                items:11
            }
        }
    });
  })


$(".up").hover(function () {
    $(".bi1").slideToggle(()=>{
        $(".bi1").show();
        $(".bi2").hide();
    });
}, function () {
    // out
}
);  