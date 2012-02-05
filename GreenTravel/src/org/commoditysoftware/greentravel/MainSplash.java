package org.commoditysoftware.greentravel;

import android.app.Activity;
import android.os.IBinder;
import android.os.Bundle;
import android.content.ServiceConnection;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.util.Log;

public class MainSplash extends Activity {
	
    String version;
    
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            version = getPackageManager().getPackageInfo(getPackageName(),
                    PackageManager.GET_ACTIVITIES).versionName;
        } catch (NameNotFoundException e) {
            e.printStackTrace();
            version = "Unknown";
        }
        Log.d("oppm","main");
        setContentView(R.layout.main);	
        LinearLayout layout = (LinearLayout) findViewById(R.id.splash_screen_layout);
        ((TextView) findViewById(R.id.version)).setText("Version " + version);
        
        
        // wait three seconds and start our activity
        layout.postDelayed(new Runnable() {
            //@Override
            public void run() {
                startActivity(new Intent(MainSplash.this, Screen1.class));         
                //finish();
            }
        }, 2000);	
    }
    
}