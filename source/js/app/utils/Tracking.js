define([
  'keen',
  '../Defaults'
],function(
  Keen,
  Defaults
) {

  var Tracking = {};

  Tracking.send = function( collection, data ) {

    keen = new Keen({
      projectId: Defaults.tracking.projectId,
      writeKey: Defaults.tracking.writeKey,
      readKey: Defaults.tracking.readKey,
      protocol: "https",
      host: "api.keen.io/3.0",
      requestType: "jsonp"
    });

    keen.addEvent(collection, data, function(err, res){
      if (err) {
        console.log("Error writing to Tracking API:", err);
      }
    });

  };

  return Tracking;

});
