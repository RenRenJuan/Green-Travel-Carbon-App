

/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */
/**
 * Constructor taking a longitude and a latitude
 *
 * @param {number} longitude
 * @param {number} latitude
 * @class
 * @author Linus Helgesson
 */
 var Coordinate = /** @class */ (function () {
    function Coordinate(longitude, latitude) {
        if (((typeof longitude === 'number') || longitude === null) && ((typeof latitude === 'number') || latitude === null)) {
            var __args = arguments;
            this.mLongitude = 0;
            this.mLatitude = 0;
            this.mResults = [0, 0];
            this.mLongitude = longitude;
            this.mLatitude = latitude;
        }
        else if (longitude === undefined && latitude === undefined) {
            var __args = arguments;
            this.mLongitude = 0;
            this.mLatitude = 0;
            this.mResults = [0, 0];
        }
        else
            throw new Error('invalid overload');
    }
    /**
     * Get the longitude part of this coordinate
     *
     * @return {number} The longitude part of this coordinate
     */
    Coordinate.prototype.getLongitude = function () {
        return this.mLongitude;
    };
    /**
     * Set the longitude part of this coordinate
     *
     * @param {number} longitude The longitude part of this coordinate
     */
    Coordinate.prototype.setLongitude = function (longitude) {
        this.mLongitude = longitude;
    };
    /**
     * Get the latitude part of this coordinate
     *
     * @return {number} The latitude part of this coordinate
     */
    Coordinate.prototype.getLatitude = function () {
        return this.mLatitude;
    };
    /**
     * Set the latitude part of this coordinate
     *
     * @param {number} latitude The latitude part of this coordinate
     */
    Coordinate.prototype.setLatitude = function (latitude) {
        this.mLatitude = latitude;
    };
    /**
     * Calculates a bounding box of a certain size arund a coordinate. This is mainly used for a quick check
     * in the database for cameras that are close to a coordinate. This function takes a size ion meters as
     * a parameter and returns an array of two Coordinate objects. The first Coordinate is the upper left corner
     * while the last coordinate is the bottom right corner.
     *
     * @param {number} side The length of the square side in meters
     *
     * @return {Coordinate[]} Two cordinates where the first is smaller than the second.
     */
    Coordinate.prototype.getBoundingBox = function (side: number) {
        var ret = [null, null];

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
     *
     * http://www.movable-type.co.uk/scripts/latlong.html
     *
     * @param coordinate The coordinate to measure the distance to.
     * @return {number} the distance in meters
     * @param {Coordinate} dest
     */
    Coordinate.prototype.distanceTo = function (dest) {
        Coordinate.computeDistanceAndBearing(this.mLatitude, this.mLongitude, dest.getLatitude(), dest.getLongitude(), this.mResults);
        return this.mResults[0];
    };
    /*private*/ Coordinate.computeDistanceAndBearing = function (lat1, lon1, lat2, lon2, results) {
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
    Coordinate.PI_OVER_180 = 0.017453292;
    Coordinate.EARTH_RADIUS = 6371009;
    return Coordinate;
}());
Coordinate["__class"] = "Coordinate";
