package org.commoditysoftware.greentravel;


import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;

public class Screen5 extends Activity {
	
    String version;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.results);
        LinearLayout layout = (LinearLayout) findViewById(R.id.screen5_layout);
        ((TextView) findViewById(R.id.TextView01)).
        setText("Stub for page 5 of the PDF: Modify Screen5.java,xml " +
        		" as needed. Screen1 does what PDF indicates this needs to.");
    }
    
}