package org.commoditysoftware.greentravel;


import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.net.Uri;

public class Screen4 extends Activity {
	
    String version;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.results);
        LinearLayout layout = (LinearLayout) findViewById(R.id.screen4_layout);
        ((TextView) findViewById(R.id.TextView01)).
        setText("Stub for page 4 of the PDF: Modify Screen4.java,xml " +
        		" as needed. Screen1 does what PDF indicates this needs to.");
        ((Button) findViewById(R.id.donateNow)).setOnClickListener(mDonate);
        ((Button) findViewById(R.id.whoYouIs)).setOnClickListener(mWRU);
    }

    /**
     * A call-back for when the user presses the Do Something button.
     */
    OnClickListener mDonate = new OnClickListener() {
        public void onClick(View v) {    
            Intent i = new Intent(Intent.ACTION_VIEW);
            i.setData(Uri.parse("http://paypal.com"));
            startActivity(i);       
        }
    };
    /**
     * A call-back for when the user presses the Do Something button.
     */
    OnClickListener mWRU = new OnClickListener() {
        public void onClick(View v) {    
            startActivity(new Intent(Screen4.this, Screen5.class)); 
        }
    };
}