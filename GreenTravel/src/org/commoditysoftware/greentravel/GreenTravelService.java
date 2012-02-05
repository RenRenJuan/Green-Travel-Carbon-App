package org.commoditysoftware.greentravel ;

import android.util.Log;
import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.os.Bundle;
import java.util.ArrayList;
import android.content.Context;
import android.app.Notification;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
 
public class GreenTravelService extends Service implements LocationListener {

    public static Coordinate  startPoint;
    public static double        distance;
    public static double         co2Rate = 0.66666;
    
	private static StartTrip TRIP_HOME;
    private static final boolean debug = true;	
	private LocationManager mLocationManager;
	private long            lCurrTime = 0, lLastTime = 0;
	private static Location mLoc = new Location("");
	private static float    mSpeed = 0;
		
    ArrayList<Messenger> mClients = new ArrayList<Messenger>();

    public static String co2Produced() {
    	String result = "";
    	
    	result += (distance * 0.6214) * co2Rate;
    	
    	return result;    	
    }
    
	public static Location getLocation() {
		return mLoc;
	}
	
	public static float getSpeed() {
		return mSpeed;
	}
	
    public class LocalBinder extends Binder {
        GreenTravelService getService() {
            return GreenTravelService.this;
        }
    }

	public static void setTripHome(StartTrip home) {
    	startPoint = null;
    	distance   = 0.0;
		TRIP_HOME  = home;
		Log.d("oppm","trip reset");
	}
	
    @Override
    public void onCreate() {
    	startListening();    	
    	Log.d("oppm","gps started");
    }

    @Override
    public void onDestroy() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    // This is the object that receives interactions from clients.  See
    // RemoteService for a more complete example.
    private final IBinder mBinder = new LocalBinder();

	private void startListening() {
		
		Criteria criterion = new Criteria();
		String  bestProvider;
				
		if (mLocationManager == null) {
			mLocationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
		}	
		
		if (debug) {
						
		criterion.setAccuracy(Criteria.ACCURACY_FINE);
		bestProvider = mLocationManager.getBestProvider(criterion, true);
		Log.d("oppm","best gps: " + bestProvider + " enabled: " + mLocationManager.isProviderEnabled(bestProvider));
		
		}
				
		mLocationManager.requestLocationUpdates(
				LocationManager.NETWORK_PROVIDER, 
				0, 
				0, 
				this
		);
	}

	private void stopListening() {
		if (mLocationManager != null)
				mLocationManager.removeUpdates(this);
	}

	//@Override
	public void onLocationChanged(Location loc) {
    	lLastTime = lCurrTime;
    	lCurrTime = System.currentTimeMillis();
    	
    	float fDist = 0; //Holds distance since last GPS update
    	
    	if (mLoc != null) 
            {fDist     = loc.distanceTo(mLoc);
             distance += fDist;
            }

       	long lElapsedTime = (lCurrTime - lLastTime);
    	mSpeed = fDist / lElapsedTime * 1000;

		Coordinate coordCurrent = new Coordinate(
				(float)loc.getLongitude(), 
				(float)loc.getLatitude());
		Coordinate coordOld = new Coordinate(
				(float)mLoc.getLongitude(), 
				(float)mLoc.getLatitude());

		mLoc = loc;

    	//Let MainActivity know about the new location
    	TRIP_HOME.updateGPS();    
	}

	//@Override
	public void onProviderDisabled(String provider) {
		if (debug) Log.d("oppm","gps provider " + provider + " disabled.");
	}
	
	//@Override
	public void onProviderEnabled(String provider) {
		if (debug) Log.d("oppm","gps provider " + provider + " enabled.");
	}
		
	//@Override
	public void onStatusChanged(String provider, int status, Bundle extras) {
		if (debug) Log.d("oppm","gps provide r" + provider + " status: " + status);
	}
	

}    
