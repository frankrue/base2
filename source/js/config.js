require.config({
  shim: {
    'bootstrap-sass-official': {
      deps: [
        'jquery'
      ]
    }
  },
  baseUrl: 'js/app',
  paths: {
    app: 'app',
    'bootstrap-sass-official': '../lib/bootstrap-sass-official/assets/javascripts/bootstrap',
    fastclick: '../lib/fastclick/lib/fastclick',
    requirejs: '../lib/requirejs/require',
    text: '../lib/requirejs-text/text',
    jquery: '../lib/jquery/dist/jquery',
    almond: '../lib/almond/almond',
    gsap: '../lib/gsap/src/uncompressed/TweenMax',
    keen: '../lib/keen-js/dist/keen'
  }
});

require(['app']);
