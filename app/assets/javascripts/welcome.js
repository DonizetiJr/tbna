$( window ).ready(function() {


  var width = $(window).width();

  // Navbars

  if (width >= 920) {
    $('.cd-nav').addClass("cd-vertical-nav");
  } else {
    $('.cd-nav').removeClass("cd-vertical-nav").addClass("menu-trigger");
  }

  // ------------------- Dots Carousel ---------------------//

  $('.carousel-indicators > li').click(function() {
    const id = this.id;
    const desc = $('.products-desc');
    const nextProduct = $(desc).parent().find('div.' + id);

    $('.carousel-indicators').parent().find('li.active').removeClass('active');
    $(this).addClass('active');

    $(desc).parent().find('div.active').removeClass('active');
    $(nextProduct).addClass('active animated slideInUp');
    $(nextProduct).one(
      "webkitAnimationEnd oanimationend msAnimationEnd animationend",
      function() {
        $(this).removeClass("animated fadeInRight");
      }
    );
  })

  // ---------------- Landing page affects ---------------- //


  window.onscroll = function () {

    // Start Effects

    var temp = false;

    if (width >= 920) {

      if (!$('.front-scroll').hasClass("fade-in-active")) {
        if ($(window).scrollTop() > 0) {
          $('.site-nav').addClass("site-nav-out").removeClass("site-nav-in");

          if ($('.cd-list').css('opacity') == "0") {
            setTimeout(function() {
              $('.cd-list').addClass("animated fadeInRight");

              $(".cd-list").one(
                "webkitAnimationEnd oanimationend msAnimationEnd animationend",
                function() {
                  $(this).css("opacity","1").removeClass("animated fadeInRight");
                }
              );
            }, 200);
          }
        } else {

          $(".cd-list").addClass("animated fadeOutRight");
          $(".cd-list").one(
            "webkitAnimationEnd oanimationend msAnimationEnd animationend",
            function() {
              $(this).removeClass("animated fadeOutRight").css("opacity","0");
            }
          );

          $('.site-nav').removeClass("site-nav-out").addClass("site-nav-in");
        }
      }


      if (temp) return;
      temp = true;
      setTimeout(function() {
        temp = false;
      }, 200);


      var title = $(".landing-title").offset();
      var viewPortTitleTop = title.top - $(document).scrollTop() - 150;

      if (viewPortTitleTop < -3400 || (viewPortTitleTop < -1300 && viewPortTitleTop > -2200)) {
        $('.cd-label').css("color","#fff");

      } else if (viewPortTitleTop < 0) {
        $('.front-scroll').addClass("fade-in-active");
        $('.landing-page').css("z-index", "-1");
        $('.cd-label').css("color","rgb(130,130,130)");
        $('.container-stick').css("opacity", "1");

      } else if ($('.front-scroll').hasClass("fade-in-active")) {
        $('.front-scroll').removeClass("fade-in-active");
        $('.landing-page').css("z-index", "1");
        $('.cd-label').css("color","#fff");
        $('.container-stick').css("opacity", "0");
      }
    }

    // Floating Divs

    var workPosition = ($('#work').offset().top - $(window).scrollTop());
    var productsPosition = ($('#products').offset().top - $(window).scrollTop());
    var aboutPosition = $('#about').offset().top - $(window).scrollTop();

    if (workPosition < 520 && workPosition > -520) {
      $('.work-desc').css("transform", "translate3d(0px, "+ workPosition/20 +"%, 0px)")
    } else if (productsPosition < 850 && productsPosition > -850) {
      $('.products-desc').css("transform", "translate3d(0px, "+ productsPosition/25 +"%, 0px)")
      $('.products-info').css("border-left", " 5px solid rgba(126,35,202, "+ Math.abs(Math.abs(productsPosition/450) - 1) +")");
    }
  }


  $('.cd-vertical-nav #home-link').click(function() {
    $(".cd-list").addClass("animated fadeOutRight");
  });



  // Navbar scroll
  var contentSections = $('.cd-section'),
  navigationItems = $('.cd-label');

  $('.menu-trigger a').click(function() {
    $('.menu-trigger').toggleClass("menu-close").removeClass("menu-open");
    setTimeout(function() {
      $('.menu-trigger').removeClass("shadowing");
    }, 2000);
    $('.cd-list').removeClass("slideInUp").toggleClass("slideOutDown");
    $('.menu-icon').toggleClass("cross");
  });


  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  updateNavigation();
  $(window).on('scroll', function(){
    updateNavigation();
  });

  function updateNavigation() {
    contentSections.each(function(){
      $this = $(this);
      var activeSection = $('.cd-list a[href="#'+$this.attr('id')+'"]').data('number') - 1;
      if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
        navigationItems.eq(activeSection).addClass('is-selected');
      }else {
        navigationItems.eq(activeSection).removeClass('is-selected');
      }
    });
  }

  // Menu icon

  $(".menu-icon").click(function() {
    $(this).toggleClass("cross");

    if ($('.menu-trigger').hasClass("menu-open")) {
      $('.menu-trigger').toggleClass("menu-close").removeClass("menu-open");
      setTimeout(function() {
        $('.menu-trigger').removeClass("shadowing");
      }, 2000);
      $('.cd-list').removeClass("slideInUp").toggleClass("slideOutDown");

    } else {
      if (!$('.menu-trigger').hasClass("animated")) {
        $('.menu-trigger').addClass("animated");
        $('.cd-list').addClass("animated");
      }
      $('.cd-list').removeClass("slideOutDown").toggleClass("slideInUp");
      $('.menu-trigger').toggleClass("menu-open shadowing").removeClass("menu-close");
    }
  });

});
