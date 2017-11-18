package com.inproxi.geofence;

import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.util.Log;

//import com.google.gson.Gson;

import org.apache.cordova.CallbackContext;

public class GeofenceLib {
    private static final String TAG = "GeofenceLib";

    private Context mContext;
    //private Gson gson;

    public GeofenceLib(Context context) {
        //Log.d(TAG, "Constructor");

        mContext = context;
        //this.gson = new Gson();
    }

    public void funcWithoutArg(final CallbackContext callbackContext) {
        try {
            Log.d(TAG, "funcWithoutArg");
        } catch (Exception e) {
            Log.e(TAG, e.getMessage(), e);
            callbackContext.error("funcWithoutArg error : " + e.getMessage());
        }
        callbackContext.success("Ok");
    }

    public void funcWithArg(String arg, final CallbackContext callbackContext){
        try {
            callbackContext.success(arg/*gson.toJson(arg)*/);
        } catch (Exception e) {
            Log.e(TAG, e.getMessage(), e);
            callbackContext.error("funcWithArg error : " + e.getMessage());
        }
    }
}
