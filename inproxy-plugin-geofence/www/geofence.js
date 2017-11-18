
var exec = require('cordova/exec');

var PLUGIN_NAME = 'Geofence';

var Geofence = {
	funcWithoutArg: function(succes, error) {
		exec(succes, error, PLUGIN_NAME, 'funcWithoutArg', []);
	},
	funcWithArg: function(arg, succes, error) {
		exec(succes, error, PLUGIN_NAME, 'funcWithArg', [arg]);
	}
};

module.exports = Geofence;
