package org.commoditysoftware.greentravel;


import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;

public class SettingsActivity extends Activity {
	
    String version;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.settings);
        LinearLayout layout = (LinearLayout) findViewById(R.id.settings_layout);
        ((TextView) findViewById(R.id.TextView01)).
        setText("Current model settings to use. Consult the nrdc site or other sources. ");
        ((TextView) findViewById(R.id.co2)).
        setText("" + GreenTravelService.co2Rate);
    }
    
}