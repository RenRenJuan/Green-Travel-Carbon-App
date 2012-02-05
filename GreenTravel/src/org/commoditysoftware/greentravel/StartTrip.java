package org.commoditysoftware.greentravel;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Chronometer;
import android.view.Menu;
import android.view.MenuItem;
import android.util.Log;
import android.content.Context;
import java.text.DecimalFormat;

public class StartTrip extends Activity {

	private static boolean paused;
	private Chronometer    clock;
    private Menu           mMenu;
    private MenuItem       mPauseResume;
    private TextView       mDistance,mLatitude,mLongitude,mVelocity;
    
    private static final int MENU_START     = Menu.FIRST;
    private static final int MENU_PAUSE     = Menu.FIRST + 1;
    private static final int MENU_END       = Menu.FIRST + 2;
    private static final int MENU_SETTINGS  = Menu.FIRST + 3;
    
    private Intent                gdsIntention;
    
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.start_trip);
        LinearLayout layout = (LinearLayout) findViewById(R.id.start_trip_layout);
        ((TextView) findViewById(R.id.TextView01)).
           setText("Use the Android menu to control your trip. ");
        ((TextView) findViewById(R.id.TextView02)).
        setText("Use pause if the fuel burning portion of your "
     		 + "trip is interrupted. Use end to "
     		 + "see the environmental footprint of this trip."
     		   );
        ((TextView) findViewById(R.id.TextView03)).
        setText("This is an early version, exiting "
     	 	  + " will cancel trip and there is no power optimization. " 
     		   );
        mLatitude  = ((TextView) findViewById(R.id.latitude));
        mLongitude = ((TextView) findViewById(R.id.longitude));
        mDistance  = ((TextView) findViewById(R.id.distance));
        mVelocity  = ((TextView) findViewById(R.id.velocity));
        clock      = ((Chronometer) findViewById(R.id.Chronometer01));
    }

    @Override
    public boolean onCreateOptionsMenu(final Menu menu) {
        super.onCreateOptionsMenu(menu);
        mMenu    = menu;
        MenuItem menuItem = menu.add(0, MENU_START, 0, "Start Trip");
        menuItem.setIcon(R.drawable.ic_menu_start);
        menuItem = menu.add(0, MENU_SETTINGS, 0, "Change Model Settings");
        menuItem.setIcon(R.drawable.ic_menu_settings);
        mPauseResume = menu.add(0, MENU_PAUSE, 0, "Pause");
        mPauseResume.setIcon(R.drawable.ic_menu_pause);
        menuItem = menu.add(0, MENU_END, 0, "End Trip");
        menuItem.setIcon(R.drawable.ic_menu_end);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(final MenuItem item) {
        int itemid = item.getItemId();
        switch (itemid) {
            case MENU_START:
            	//Start GPS service 
            	paused     = false;
                GreenTravelService.setTripHome(this);
                startService(new Intent(this, GreenTravelService.class));
                clock.start();
                break;
            case MENU_PAUSE:
                if (!paused) {
                    mPauseResume.setIcon(R.drawable.ic_menu_resume);
                    clock.stop();
                    paused = true;
                }
                else {paused = false;
                    clock.start();
                    mPauseResume.setIcon(R.drawable.ic_menu_pause);
                }
                break;
            case MENU_END:
                clock.stop();
				stopService (new Intent(this, GreenTravelService.class));
				if ((GreenTravelService.distance * 0.6214) > 10) {
                startActivity(new Intent(StartTrip.this, EndTripActivity.class)
                        .setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP));
				} else {
	                startActivity(new Intent(StartTrip.this, Screen7.class)
                    .setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP));					
				}
                break;
            case MENU_SETTINGS:
                startActivity(new Intent(StartTrip.this, SettingsActivity.class));
                break;
            default:
                break;
        }
        return super.onOptionsItemSelected(item);
    }
    
    public void updateGPS() {
    	boolean       starting = (GreenTravelService.startPoint == null);
    	DecimalFormat sevenDecimal = new DecimalFormat("#0.0000000");
    	DecimalFormat noDecimal = new DecimalFormat("#0");
    	
		Coordinate here = new Coordinate(
				(float)GreenTravelService.getLocation().getLongitude(), 
				(float)GreenTravelService.getLocation().getLatitude());
		
		if (starting) {
			GreenTravelService.startPoint = new Coordinate(
					(float)GreenTravelService.getLocation().getLongitude(), 
					(float)GreenTravelService.getLocation().getLatitude());
		}
		
		
		if(!starting) {			
			mLatitude.setText(sevenDecimal.format(here.getLatitude()));
			mLongitude.setText(sevenDecimal.format(here.getLongitude()));
			mDistance.setText(noDecimal.format(here.distanceTo(GreenTravelService.startPoint)));
			mVelocity.setText(noDecimal.format(GreenTravelService.getSpeed()));
        }
		else { 
			mLatitude.setText("---");
			mLongitude.setText("---");
			mDistance.setText("---");
	    	mVelocity.setText(noDecimal.format(0.0));
		}
		
    }
}