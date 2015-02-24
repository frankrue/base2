require([
  'jquery',
  'fastclick',
  'bootstrap-sass-official',
  'gsap',
  './utils/Preloader',
  './utils/Modal',
  './utils/Tracking'
],
function(
  $,
  FastClick,
  _bootstrap,
  _gsap,
  Preloader,
  Modal,
  Tracking
) {

  'use strict';

  var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
  var preloader;
  var keen;

  // wait for DOM
  $(function() {

    // all the things!
    basicInits();
    binds();

  });

  function basicInits() {

    // fastclick
    FastClick.attach(document.body);

    // prevent unauthorized scrolling
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

    // set up preloader
    preloader = new Preloader({
      radius: 30,
      dotSize: 12,
      dotCount: 10,
      colors:["#5883c3","#1e5692"],
      boxOpacity: 0.1,
      boxColor: "#000",
      boxBorder: "none",
      animationOffset: 1.8
    });

    // start the preloader
    preloader.active(true);

    // eventually, stop the preloader (preferably when all external loads are done, but, for demo, after 1 second)
    setTimeout(stopPreloader, 1000);

    // tracking
    Tracking.send("global", { name: "app-init" } );

    // set up login modal
    // var modal = new Modal({
    //   type: "login"
    // });

    // show modal after burn in (1 second delay)
    // setTimeout(function() {
    //   modal.show()
    // }, 1000);

  }

  function binds() {


  }

  function stopPreloader() {
    preloader.active(false);
  }

});
