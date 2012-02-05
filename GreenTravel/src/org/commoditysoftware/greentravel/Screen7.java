package org.commoditysoftware.greentravel;


import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;

public class Screen7 extends Activity {
	
    String version;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.results);
        LinearLayout layout = (LinearLayout) findViewById(R.id.screen7_layout);
        ((TextView) findViewById(R.id.TextView01)).
        setText("Stub for screen7 of the PDF: Modify Screen7.java,xml " +
        		" as needed. Screen1 does what PDF indicates this needs to.");
    }
    
}