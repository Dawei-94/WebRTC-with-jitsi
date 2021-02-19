//Room
var owl = $("#Room");

owl.owlCarousel({

  items: 5, //10 items above 1000px browser width
  itemsDesktop: [1000, 5], //5 items between 1000px and 901px
  itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
  itemsTablet: [600, 2], //2 items between 600 and 0;
  itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option

});

// Custom Navigation Events
$(".next").click(function () {
  owl.trigger('owl.next');
})
$(".prev").click(function () {
  owl.trigger('owl.prev');
});

//Stream
var owl1 = $("#Stream");

owl1.owlCarousel({

  items: 5, //10 items above 1000px browser width
  itemsDesktop: [1000, 5], //5 items between 1000px and 901px
  itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
  itemsTablet: [600, 2], //2 items between 600 and 0;
  itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option

});

// Custom Navigation Events
$(".next1").click(function () {
  owl1.trigger('owl.next');
})
$(".prev1").click(function () {
  owl1.trigger('owl.prev');
});

//Effects
var owl2 = $("#Effects");

owl2.owlCarousel({

  items: 5, //10 items above 1000px browser width
  itemsDesktop: [1000, 5], //5 items between 1000px and 901px
  itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
  itemsTablet: [600, 2], //2 items between 600 and 0;
  itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option

});

// Custom Navigation Events
$(".next2").click(function () {
  owl2.trigger('owl.next');
})
$(".prev2").click(function () {
  owl2.trigger('owl.prev');
});

//User Photos
var owl3 = $("#UserPhotos");

owl3.owlCarousel({

  items: 5, //10 items above 1000px browser width
  itemsDesktop: [1000, 5], //5 items between 1000px and 901px
  itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
  itemsTablet: [600, 2], //2 items between 600 and 0;
  itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option

});

// Custom Navigation Events
$(".next3").click(function () {
  owl3.trigger('owl.next');
})
$(".prev3").click(function () {
  owl3.trigger('owl.prev');
});


//Live
var owl4 = $("#Live");

owl4.owlCarousel({

  items: 5, //10 items above 1000px browser width
  itemsDesktop: [1000, 5], //5 items between 1000px and 901px
  itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
  itemsTablet: [600, 2], //2 items between 600 and 0;
  itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option

});

// Custom Navigation Events
$(".next4").click(function () {
  owl4.trigger('owl.next');
})
$(".prev4").click(function () {
  owl4.trigger('owl.prev');
});

//B Rolls
var owl5 = $("#BRolls");

owl5.owlCarousel({

  items: 5, //10 items above 1000px browser width
  itemsDesktop: [1000, 5], //5 items between 1000px and 901px
  itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
  itemsTablet: [600, 2], //2 items between 600 and 0;
  itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option

});

// Custom Navigation Events
$(".next5").click(function () {
  owl5.trigger('owl.next');
})
$(".prev5").click(function () {
  owl5.trigger('owl.prev');
});


// DJ Box
$(document).on('click', '.dj-img', function () {
  $(this).addClass('dj-img-active');
});
$(document).on('click', 'body', function (e) {
  if (!$(e.target).is('.dj-img-active'))
    $('.dj-img-active').removeClass('dj-img-active');
})

// Left Right Button
$('.btn-right-img').click(function () {
  $('.left-img').attr('src', 'assets/img/arrow-left1.png');
});

$('#stream-right-img').click(function () {
  $('#stream-left-img').attr('src', 'assets/img/arrow-left1.png');
});

$('#effect-right-img').click(function () {
  $('#effect-left-img').attr('src', 'assets/img/arrow-left1.png');
});
$('#user-right-img').click(function () {
  $('#user-left-img').attr('src', 'assets/img/arrow-left1.png');
});
$('#live-right-img').click(function () {
  $('#live-left-img').attr('src', 'assets/img/arrow-left1.png');
});
$('#rolls-right-img').click(function () {
  $('#rolls-left-img').attr('src', 'assets/img/arrow-left1.png');
});