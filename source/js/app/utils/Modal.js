define([
  'jquery',
  'gsap',
  'text!../templates/login.html'
],
function(
  $,
  _gsap,
  htmlLogin
){

  function Modal( userOptions ) {

    var defaults = {
      type: "login"
    };

    // override defaults with any user options
    $.extend( defaults, userOptions );

    // point to new defaults
    this.options = defaults;

  }

  Modal.prototype = {

    show: function() {

      var $modal = $(htmlLogin);

      switch( this.options.type ) {

        case 'login':
        // default is login, so do nothing here so far
        break;

        default:
        break;

      }

      $modal.on("hidden.bs.modal",onModalHidden);
      $modal.on("shown.bs.modal",onModalShown);
      $('body').append( $modal );
      $modal.modal();

    }

  };

  function onModalHidden() {
    $('.modal').remove();
  }

  function onModalShown() {
    $('#login_unixId').focus();
  }

  return Modal;

});
