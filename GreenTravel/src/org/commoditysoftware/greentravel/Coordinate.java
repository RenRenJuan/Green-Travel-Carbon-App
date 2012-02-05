package org.commoditysoftware.greentravel ;

import android.util.FloatMath;
import android.util.Log;


/**
 * Class for handling coordinates 
 * 
 * @author Linus Helgesson
 *
 */
public class Coordinate {
	private float mLongitude = 0;
	private float mLatitude = 0;
	private float[] mResults = new float[2];
	
	/**
	 * Empty constructor
	 */
	public Coordinate () {
		
	}
	
	/**
	 * Constructor taking a longitude and a latitude
	 * 
	 * @param longitude
	 * @param latitude
	 */
	public Coordinate(float longitude, float latitude) {
		this.mLongitude = longitude;
		this.mLatitude = latitude;
	}
	
	/**
	 * Get the longitude part of this coordinate
	 * 
	 * @return The longitude part of this coordinate
	 */
	public float getLongitude() {
		return mLongitude;
	}
	
	/**
	 * Set the longitude part of this coordinate
	 * 
	 * @param longitude The longitude part of this coordinate
	 */
	public void setLongitude(float longitude) {
		this.mLongitude = longitude;
	}
	
	/**
	 * Get the latitude part of this coordinate
	 * 
	 * @return The latitude part of this coordinate 
	 */
	public float getLatitude() {
		return mLatitude;
	}
	
	/**
	 * Set the latitude part of this coordinate
	 * 
	 * @param latitude The latitude part of this coordinate
	 */
	public void setLatitude(float latitude) {
		this.mLatitude = latitude;
	}
	
	private static final float PI_OVER_180 = 0.017453292519943295769236907684886f;
	
	// Earth medium radius, should maybe be changed to swedish latitude
	private static final float EARTH_RADIUS = 6371009;
	
	/**
	 * Calculates a bounding box of a certain size arund a coordinate. This is mainly used for a quick check 
	 * in the database for cameras that are close to a coordinate. This function takes a size ion meters as
	 * a parameter and returns an array of two Coordinate objects. The first Coordinate is the upper left corner
	 * while the last coordinate is the bottom right corner.
	 * 
	 * @param side The length of the square side in meters
	 * 
	 * @return Two cordinates where the first is smaller than the second.
	 */
	public Coordinate[] getBoundingBox(float side) {

			Coordinate[] ret = new Coordinate[2];

			float degLatM = 110574.235f;
			float degLongM = 110572.833f * FloatMath.cos(mLatitude * PI_OVER_180);
			float deltaLat = side / degLatM;
			float deltaLong = side / degLongM;

			ret[0] = new Coordinate(getLongitude() - deltaLong, getLatitude() - deltaLat);
			ret[1] = new Coordinate(getLongitude() + deltaLong, getLatitude() + deltaLat);

			return ret;
	}
	
	/**
	 * Calculates the distance between two Coordinate objects using the Spherical law of cosines found at:
	 * 
	 * http://www.movable-type.co.uk/scripts/latlong.html
	 * 
	 * @param coordinate The coordinate to measure the distance to.
	 * @return the distance in meters
	 */
	/*
	public float distanceTo(Coordinate coordinate) {
		float lat1 = mLatitude * PI_OVER_180;
		float lat2 = coordinate.getLatitude() * PI_OVER_180;
		float dLat = (coordinate.getLatitude() - mLatitude) * PI_OVER_180;
		float dLong = (coordinate.getLongitude() - mLongitude) * PI_OVER_180;

		float a = FloatMath.sin(dLat/2) * FloatMath.sin(dLat/2) + 
				FloatMath.cos(lat1) * FloatMath.cos(lat2) * 
				FloatMath.sin(dLong/2) * FloatMath.sin(dLong/2);
		
		return (float)(EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));				
	}
        public float distanceTo(Coordinate coordinate) {
                float lat1 = mLatitude*PI_OVER_180;
                float lat2 = coordinate.getLatitude() * PI_OVER_180;
                float long1 = mLongitude * PI_OVER_180;
                float long2 = coordinate.getLongitude() * PI_OVER_180;

                return (float)Math.acos(FloatMath.sin(lat1) * FloatMath.sin(lat2) + FloatMath.cos(lat1) * FloatMath.cos(lat2) * FloatMath.cos(long2-long1)) * EARTH_RADIUS;
        }
	*/
	
    public float distanceTo(Coordinate dest) {
    	// See if we already have the result
    	computeDistanceAndBearing(mLatitude, mLongitude, 
    			dest.getLatitude(), dest.getLongitude(), mResults);

        return mResults[0];
    }
    
    private static void computeDistanceAndBearing(double lat1, double lon1,
        double lat2, double lon2, float[] results) {
        // Based on http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf
        // using the "Inverse Formula" (section 4)

        int MAXITERS = 20;
        // Convert lat/long to radians
        lat1 *= Math.PI / 180.0;
        lat2 *= Math.PI / 180.0;
        lon1 *= Math.PI / 180.0;
        lon2 *= Math.PI / 180.0;

        double a = 6378137.0; // WGS84 major axis
        double b = 6356752.3142; // WGS84 semi-major axis
        double f = (a - b) / a;
        double aSqMinusBSqOverBSq = (a * a - b * b) / (b * b);

        double L = lon2 - lon1;
        double A = 0.0;
        double U1 = Math.atan((1.0 - f) * Math.tan(lat1));
        double U2 = Math.atan((1.0 - f) * Math.tan(lat2));

        double cosU1 = Math.cos(U1);
        double cosU2 = Math.cos(U2);
        double sinU1 = Math.sin(U1);
        double sinU2 = Math.sin(U2);
        double cosU1cosU2 = cosU1 * cosU2;
        double sinU1sinU2 = sinU1 * sinU2;

        double sigma = 0.0;
        double deltaSigma = 0.0;
        double cosSqAlpha = 0.0;
        double cos2SM = 0.0;
        double cosSigma = 0.0;
        double sinSigma = 0.0;
        double cosLambda = 0.0;
        double sinLambda = 0.0;

        double lambda = L; // initial guess
        for (int iter = 0; iter < MAXITERS; iter++) {
            double lambdaOrig = lambda;
            cosLambda = Math.cos(lambda);
            sinLambda = Math.sin(lambda);
            double t1 = cosU2 * sinLambda;
            double t2 = cosU1 * sinU2 - sinU1 * cosU2 * cosLambda;
            double sinSqSigma = t1 * t1 + t2 * t2; // (14)
            sinSigma = Math.sqrt(sinSqSigma);
            cosSigma = sinU1sinU2 + cosU1cosU2 * cosLambda; // (15)
            sigma = Math.atan2(sinSigma, cosSigma); // (16)
            double sinAlpha = (sinSigma == 0) ? 0.0 :
                cosU1cosU2 * sinLambda / sinSigma; // (17)
            cosSqAlpha = 1.0 - sinAlpha * sinAlpha;
            cos2SM = (cosSqAlpha == 0) ? 0.0 :
                cosSigma - 2.0 * sinU1sinU2 / cosSqAlpha; // (18)

            double uSquared = cosSqAlpha * aSqMinusBSqOverBSq; // defn
            A = 1 + (uSquared / 16384.0) * // (3)
                (4096.0 + uSquared *
                 (-768 + uSquared * (320.0 - 175.0 * uSquared)));
            double B = (uSquared / 1024.0) * // (4)
                (256.0 + uSquared *
                 (-128.0 + uSquared * (74.0 - 47.0 * uSquared)));
            double C = (f / 16.0) *
                cosSqAlpha *
                (4.0 + f * (4.0 - 3.0 * cosSqAlpha)); // (10)
            double cos2SMSq = cos2SM * cos2SM;
            deltaSigma = B * sinSigma * // (6)
                (cos2SM + (B / 4.0) *
                 (cosSigma * (-1.0 + 2.0 * cos2SMSq) -
                  (B / 6.0) * cos2SM *
                  (-3.0 + 4.0 * sinSigma * sinSigma) *
                  (-3.0 + 4.0 * cos2SMSq)));

            lambda = L +
                (1.0 - C) * f * sinAlpha *
                (sigma + C * sinSigma *
                 (cos2SM + C * cosSigma *
                  (-1.0 + 2.0 * cos2SM * cos2SM))); // (11)

            double delta = (lambda - lambdaOrig) / lambda;
            if (Math.abs(delta) < 1.0e-12) {
                break;
            }
        }

        float distance = (float) (b * A * (sigma - deltaSigma));
        results[0] = distance;
        if (results.length > 1) {
            float initialBearing = (float) Math.atan2(cosU2 * sinLambda,
                cosU1 * sinU2 - sinU1 * cosU2 * cosLambda);
            initialBearing *= 180.0 / Math.PI;
            results[1] = initialBearing;
            if (results.length > 2) {
                float finalBearing = (float) Math.atan2(cosU1 * sinLambda,
                    -sinU1 * cosU2 + cosU1 * sinU2 * cosLambda);
                finalBearing *= 180.0 / Math.PI;
                results[2] = finalBearing;
            }
        }
    }
}
