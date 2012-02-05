package org.commoditysoftware.greentravel;

import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class EndTripActivity extends Activity {
	
    String version;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.results);
        LinearLayout layout = (LinearLayout) findViewById(R.id.results_layout);
        ((TextView) findViewById(R.id.TextView01)).
        setText("Carbon burden of this trip: ");
        
        ((TextView) findViewById(R.id.co2)).
        setText(GreenTravelService.co2Produced());
        // Hook up button presses to the appropriate event handler.
        ((Button) findViewById(R.id.doStuff)).setOnClickListener(mDo);
    }

    /**
     * A call-back for when the user presses the Do Something button.
     */
    OnClickListener mDo = new OnClickListener() {
        public void onClick(View v) {    
            startActivity(new Intent(EndTripActivity.this, Screen4.class)); 
            Intent i = new Intent(Intent.ACTION_VIEW);
            startActivity(i);       
        }
    };
}