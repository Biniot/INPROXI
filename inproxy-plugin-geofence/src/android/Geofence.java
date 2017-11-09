package com.inproxi.geofence;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import android.content.pm.PackageManager;
import android.Manifest;

import android.util.Log;

public class Geofence extends CordovaPlugin {
  private static final String TAG = "Geofence";

  private GeofenceLib geofenceLib;

  private static final int PERMISSION_REQUEST_COARSE_LOCATION = 1;

  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
    geofenceLib = new GeofenceLib(this.cordova.getActivity().getApplicationContext());
    Log.d(TAG, "Initializing Geofence");
    //checkApplicationLocationPermission();
  }

  public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
    if (action.equals("funcWithoutArg")) {
        geofenceLib.funcWithoutArg(callbackContext);
    } else if (action.equals("funcWithArg")) {
        String arg = args.getString(0);
        geofenceLib.funcWithArg(arg, callbackContext);
    }
    return true;
  }

/*
    @Override
    public void onRequestPermissionResult(int requestCode,
                                          String[] permissions, int[] grantResults) throws JSONException {
        switch (requestCode) {
            case PERMISSION_REQUEST_COARSE_LOCATION: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Log.d(TAG, "PERMISSION_REQUEST_COARSE_LOCATION PERMISSION_GRANTED");
                } else {
                    Log.d(TAG, "PERMISSION_REQUEST_COARSE_LOCATION PERMISSION_NOT_GRANTED");
                }
                return;
            }

            // other 'case' lines to check for other
            // permissions this app might request
        }
    }

  private void checkApplicationLocationPermission()
  {
      Log.d(TAG, "checkApplicationLocationPermission");
      // Location permission check.
      if (!cordova.hasPermission(Manifest.permission.ACCESS_COARSE_LOCATION))
      {
          // Location permission needed. Ask user.
          cordova.requestPermission(this, PERMISSION_REQUEST_COARSE_LOCATION,
                  Manifest.permission.ACCESS_COARSE_LOCATION);
      }
  }*/
}
