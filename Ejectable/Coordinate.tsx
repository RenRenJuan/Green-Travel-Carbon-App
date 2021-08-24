/**  Class for handling coordinates  original by Linus Helgesson   */
 export class Coordinate {

      public mLatitude:number    = 0.0;
      public mLongitude:number   = 0.0;
      mResults:any               = [0, 0];
      PI_OVER_180:number         = 0.017453292519943295769236907684886;
      EARTH_RADIUS:number        = 6371009;

    constructor (longitude:number, latitude:number) {
            this.mLongitude = longitude;
            this.mLatitude  = latitude;
    }
    getLongitude()                 {  return this.mLongitude;  }
    setLongitude(longitude:number) {  this.mLongitude = longitude;  }
    getLatitude()                  {  return this.mLatitude;  }
    setLatitude(latitude:number)   {  this.mLatitude = latitude;  }
    /**
     * Calculates a bounding box of a certain size arund a coordinate.This function takes a size in meters as
     * a parameter and returns an array of two Coordinate objects. The first Coordinate is the upper left corner
     * while the last coordinate is the bottom right corner.er than the second.
     */
    getBoundingBox(side: number) {
        var ret:any = [Coordinate, Coordinate];

        var degLatM:number , degLatM:number, degLongM:number, deltaLat:number, deltaLong:number;

        degLatM   = 110574.235;
        degLongM  = 110572.833 * Math.cos(this.mLatitude * this.PI_OVER_180);
        deltaLat  = side / degLatM;
        deltaLong = side / degLongM;

        ret[0] = new Coordinate(this.getLongitude() - deltaLong, this.getLatitude() - deltaLat);
        ret[1] = new Coordinate(this.getLongitude() + deltaLong, this.getLatitude() + deltaLat);

        return ret;
    };
    /**
     * Calculates the distance between two Coordinate objects using the Spherical law of cosines found at:
     */
    distanceTo(dest:Coordinate) {
        this.computeDistanceAndBearing(this.mLatitude, this.mLongitude, dest.getLatitude(), dest.getLongitude(), this.mResults);
        return this.mResults[0];
    };
    computeDistanceAndBearing(lat1:number, lon1:number, lat2:number, lon2:number, results:any) {
        var MAXITERS = 20;
        lat1 *= Math.PI / 180.0;
        lat2 *= Math.PI / 180.0;
        lon1 *= Math.PI / 180.0;
        lon2 *= Math.PI / 180.0;
        var a = 6378137.0;
        var b = 6356752.3142;
        var f = (a - b) / a;
        var aSqMinusBSqOverBSq = (a * a - b * b) / (b * b);
        var L = lon2 - lon1;
        var A = 0.0;
        var U1 = Math.atan((1.0 - f) * Math.tan(lat1));
        var U2 = Math.atan((1.0 - f) * Math.tan(lat2));
        var cosU1 = Math.cos(U1);
        var cosU2 = Math.cos(U2);
        var sinU1 = Math.sin(U1);
        var sinU2 = Math.sin(U2);
        var cosU1cosU2 = cosU1 * cosU2;
        var sinU1sinU2 = sinU1 * sinU2;
        var sigma = 0.0;
        var deltaSigma = 0.0;
        var cosSqAlpha = 0.0;
        var cos2SM = 0.0;
        var cosSigma = 0.0;
        var sinSigma = 0.0;
        var cosLambda = 0.0;
        var sinLambda = 0.0;
        var lambda = L;
        for (var iter = 0; iter < MAXITERS; iter++) {
            {
                var lambdaOrig = lambda;
                cosLambda = Math.cos(lambda);
                sinLambda = Math.sin(lambda);
                var t1 = cosU2 * sinLambda;
                var t2 = cosU1 * sinU2 - sinU1 * cosU2 * cosLambda;
                var sinSqSigma = t1 * t1 + t2 * t2;
                sinSigma = Math.sqrt(sinSqSigma);
                cosSigma = sinU1sinU2 + cosU1cosU2 * cosLambda;
                sigma = Math.atan2(sinSigma, cosSigma);
                var sinAlpha = (sinSigma === 0) ? 0.0 : cosU1cosU2 * sinLambda / sinSigma;
                cosSqAlpha = 1.0 - sinAlpha * sinAlpha;
                cos2SM = (cosSqAlpha === 0) ? 0.0 : cosSigma - 2.0 * sinU1sinU2 / cosSqAlpha;
                var uSquared = cosSqAlpha * aSqMinusBSqOverBSq;
                A = 1 + (uSquared / 16384.0) * (4096.0 + uSquared * (-768 + uSquared * (320.0 - 175.0 * uSquared)));
                var B = (uSquared / 1024.0) * (256.0 + uSquared * (-128.0 + uSquared * (74.0 - 47.0 * uSquared)));
                var C = (f / 16.0) * cosSqAlpha * (4.0 + f * (4.0 - 3.0 * cosSqAlpha));
                var cos2SMSq = cos2SM * cos2SM;
                deltaSigma = B * sinSigma * (cos2SM + (B / 4.0) * (cosSigma * (-1.0 + 2.0 * cos2SMSq) - (B / 6.0) * cos2SM * (-3.0 + 4.0 * sinSigma * sinSigma) * (-3.0 + 4.0 * cos2SMSq)));
                lambda = L + (1.0 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SM + C * cosSigma * (-1.0 + 2.0 * cos2SM * cos2SM)));
                var delta = (lambda - lambdaOrig) / lambda;
                if (Math.abs(delta) < 1.0E-12) {
                    break;
                }
            }
            ;
        }
        var distance = (b * A * (sigma - deltaSigma));
        results[0] = distance;
        if (results.length > 1) {
            var initialBearing = Math.atan2(cosU2 * sinLambda, cosU1 * sinU2 - sinU1 * cosU2 * cosLambda);
            initialBearing *= 180.0 / Math.PI;
            results[1] = initialBearing;
            if (results.length > 2) {
                var finalBearing = Math.atan2(cosU1 * sinLambda, -sinU1 * cosU2 + cosU1 * sinU2 * cosLambda);
                finalBearing *= 180.0 / Math.PI;
                results[2] = finalBearing;
            }
        }
    };

}



