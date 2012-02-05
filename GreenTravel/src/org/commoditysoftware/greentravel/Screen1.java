package org.commoditysoftware.greentravel;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Button;
import android.view.View;
import android.view.View.OnClickListener;
import android.net.Uri;

public class Screen1 extends Activity {

    private static final String LEARNMORE_URL = "http://www.nrdc.org/globalwarming/f101.asp";
    
    String version;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.screen1);
        LinearLayout layout = (LinearLayout) findViewById(R.id.screen1_layout);
        ((TextView) findViewById(R.id.TextView01)).
           setText("This app uses GPS to apply a model of energy consumption "
        		 + "to distance and time on trip. " 
        		   );
        ((TextView) findViewById(R.id.TextView02)).
        setText("In the finished Green Driving app this would support users contributing "
     		 + "in direct proportion to thier contributed carbon burden. " 
     		   );
        // Hook up button presses to the appropriate event handler.
        ((Button) findViewById(R.id.learnMore)).setOnClickListener(mLearnMore);
        ((Button) findViewById(R.id.proceedToTrip)).setOnClickListener(mProceedToTrip);
  
    }
    
    /**
     * A call-back for when the user presses the Learn More button.
     */
    OnClickListener mLearnMore = new OnClickListener() {
        public void onClick(View v) {    
            Intent i = new Intent(Intent.ACTION_VIEW);
            i.setData(Uri.parse(LEARNMORE_URL));
            startActivity(i);       
        }
    };
    
    /**
     * A call-back for when the user presses the Proceed button.
     */
    OnClickListener mProceedToTrip = new OnClickListener() {
        public void onClick(View v) {
            startActivity(new Intent(Screen1.this, StartTrip.class)); 
            finish();     
        }
    };
}