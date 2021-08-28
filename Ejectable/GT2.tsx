import React, { useState, useEffect, Component } from 'react';
import * as Location from 'expo-location';
import { Text, View } from './components/Themed';
import { StyleSheet } from 'react-native';
import * as geolib from 'geolib';

       var   debug:number       = 0;
       var   endIsNigh:boolean  = false;
       var   testCount          = 0;
       var   bgEnabled:boolean  = false;
       var   expoGeoState:any   = null;
export var   locEnabled:boolean = false;

       const heartbeat:number   = 500; 
       const displayBeat:number = 3;

       const geoLibAccuracy:number   = 0.1;
       const minExpoAccuracy:number  = 5;

export function getEndIsLast() : boolean       { return endIsNigh;  }  
export function setEndIsLast(value:boolean)    { endIsNigh = value;  }       

const styles = StyleSheet.create({
    tripText: {
     marginHorizontal: -10,
     marginVertical: 60,
     textAlign: 'left',
     width: "80%",
     fontSize: 12,
     fontWeight: 'bold',
    }});
  
interface expoGeoObj {
  coords: [
    altitude:number,
    altitudeAccuracy:number,
    latitude:number,
    accuracy:number,
    longitude:number,
    heading:number,
    speed:number,
    timestamp:number
  ]  
}


  class Coordinate {

    public mLatitude:number  = 0.0;
    public mLongitude:number = 0.0;
    public glCoords:any      = {};
    
    constructor (latitude:number, longitude:number ) {
      this.mLongitude = longitude;
      this.mLatitude  = latitude;      
      this.get_glcoords();
    }

    public set(lat:number,lon:number) {
      this.mLatitude  = lat;
      this.mLongitude = lon;
      this.get_glcoords();
    }

    public get_glcoords() {
      this.glCoords['lat'] = this.mLatitude;
      this.glCoords['lon'] = this.mLongitude;
          }

    public set_glcoords(lat:number,lon:number) {
      this.glCoords['lat'] = lat;
      this.glCoords['lon'] = lon;
    }      

    public roundTo(precision:number) {
         var lat = this.mLatitude  * Math.pow(10,precision);
         var lon = this.mLongitude * Math.pow(10,precision);
             lat = (Math.round(lat)) / Math.pow(10,precision);
             lon = (Math.round(lon)) / Math.pow(10, precision);
         this.set_glcoords(lat,lon);   
    }

    public distanceTo(otherPoint:Coordinate) : number {
      this.roundTo(Trips.sensitivity)
      otherPoint.roundTo(Trips.sensitivity);
      return geolib.getPreciseDistance(this.glCoords,otherPoint.glCoords,geoLibAccuracy);
    }

  }
          

 async function startTracking(client:any){
  if (debug > 5) console.log('Starting tracking')
  if(!client.location){
      client.location = await Location.watchPositionAsync({
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 3,
          timeInterval: (heartbeat / 2),
      }, (loc) => {
         Trips.deltaLoc(loc)
      });
  }
}

async function stopTracking(client:any){
  if (debug > 5) console.log('Remove tracking')
  await client.location.remove();
}

class Trip {

    public elapsed:string      = "00.00.00";
           ticks:number        = 0;
           interval:any;
           segments:number     = 1;
           ds:number           = 0;
           CO2:number          = 0.0;
           location:any        = null;
           lastDSFixTick       = 0;
           lastFix:Coordinate  = new Coordinate(0.0,0.0);
	         loc:Coordinate      = new Coordinate(0.0,0.0);

           tick()  {let hours:number   = 0, minutes:number = 0, seconds:number = 0, totals:number = 0;
                    this.ticks++;
                    totals = this.ticks * ( heartbeat / 1000 ) ; 
                    hours   = totals < 3600 ? 0 : (totals / 3600);
                    minutes = totals < 60   ? 0 : (totals - (hours * 3600)) / 60;
                    seconds = totals % 60;
                    this.elapsed = hours.toFixed(0) + ":" + minutes.toFixed(0) + ":" + seconds.toFixed(0); 
                   }       

    public start()   { this.interval = setInterval(() => this.tick(), heartbeat);
                       if (!bgEnabled) startTracking(this);
    }

    public resume()  { this.lastFix.mLatitude = 0.0;
                       this.segments++;
                       this.interval   = setInterval(() => this.tick(), heartbeat); }               

    public stop()    { Trips.distance += this.ds;
                       this.ds = 0.0;
                       clearInterval(this.interval); 
                       if (!bgEnabled) stopTracking(this);              
                     }

}


export class GT2 {

           trip:Trip             = new Trip();
           endPoint:Coordinate   = new Coordinate(0.0,0.0);
           startPoint:Coordinate = new Coordinate(0.0,0.0);

           displayInterval:number = displayBeat * heartbeat;
    public distance:number        = 0.0;
           co2Rate:number         = 250.0;  
           sensitivity:number     = 3;
           z:number               = 0.0;
	  public v:number               = 0.0;
    public inProgress:boolean     = false;
    public paused:boolean         = false;
    public elapsed:number         = 0.0;
           elevation:number       = 0.0;
    public units:string           = "km";
    public CO2Effect:string       = "carbon burden";

           nTrips:number  = 0;

           n:number = 0.0;
           m:number = 0.0;

    public deltaLoc(lastFix:any) {
 
        var t:number   = 0.0; 
        var lat:number = 0.0;
        var lon:number = 0.0;
        lastFix                = JSON.stringify(lastFix);
        let expoFix:expoGeoObj = JSON.parse(lastFix);  

        if (debug > 10) {

             console.log("lat " + expoFix.coords['latitude'] + " lon " + expoFix.coords['longitude']);
             console.log("heading " + expoFix.coords['heading']);
             console.log("accuracy " + expoFix.coords['accuracy']);
             console.log("speed " + expoFix.coords['speed']);

        }      

        lat = expoFix.coords['latitude']; lon = expoFix.coords['longitude'];

        this.trip.loc.set(lat,lon);

        if (Trips.startPoint.mLatitude == 0.0) Trips.startPoint.set(lat,lon);
    
        t = expoFix.coords['accuracy']; if (t <  minExpoAccuracy )  return;

        if (this.trip.lastFix.mLatitude == 0.0)             this.trip.lastFix.set(lat,lon);
        else 
          {this.trip.ds += this.trip.lastFix.distanceTo(this.trip.loc);          
           this.trip.lastFix.set(lat,lon);
           if (debug > 10) console.log('delta ' + this.trip.ds);
           
          }

    }

    public end()   {
        

        this.trip.stop();
        this.inProgress = false;
        this.trip.CO2   = ( this.distance / 1000 ) * this.co2Rate;
        this.nTrips++;
        
    }

    public from(last:GT2) {

         this.startPoint  =  last.startPoint;
         this.trip.loc    =  last.trip.loc;
         this.elapsed     =  last.elapsed;
         this.endPoint    =  last.endPoint;
         this.CO2Effect   =  last.CO2Effect;
         this.co2Rate     =  last.co2Rate;
         this.units       =  last.units;
         this.sensitivity =  last.sensitivity;

    }

    public setLocEnabled(value:boolean) { locEnabled = value}

    public pause() {
    
        if (!this.paused) {
            this.trip.stop();
            this.paused = true;
        } else {
            this.trip.resume();
            this.paused = false;
        }
    
    }

    public reset() {

        this.distance   = 0.0;
        this.endPoint   = new Coordinate(0,0);
        this.startPoint = new Coordinate(0,0);
        this.v          = 0;
        this.inProgress = false;
        this.paused     = false;
        this.elapsed    = 0.0;

    }

    public start() {

        this.reset();
        this.trip       = new Trip();
        this.trip.start();     
        this.inProgress = true;

    }

    lt:number = 0.0;

    public getTripSummary() : string   {

      var preferredUnits:number = ((this.units == 'km') ? (this.distance / 1000)
           : (this.distance / 1609.34));

     return ( 
      'Elapsed -        ' + this.trip.elapsed + '\n' +
      'Origin:             ' + 'lat: ' + this.startPoint.mLatitude.toFixed(8) +
                   ' long: ' + this.startPoint.mLongitude.toFixed(8) + '\n' +
      'Destination:  ' + 'lat: ' + this.trip.loc.mLatitude.toFixed(8) +
                   ' long: ' + this.trip.loc.mLongitude.toFixed(8) + '\n' +             
      'CO2:                ' + this.trip.CO2.toFixed(1) + ' grams ' + this.CO2Effect + '\n\n' +
      'CO2 Rate / Sensitivity: ' + this.co2Rate + " / " + this.sensitivity + '\n' + 
      'Distance covered while consuming fuel: ' + preferredUnits.toFixed(2) + ' ' + this.units );
       
    }

    public getTripPanel() : string   {

        var bigDS:number = this.distance + this.trip.ds;
        var seconds:number = this.trip.ticks;

        if (this.inProgress) {
        this.v          = this.trip.ds / seconds;
        return ( 
        'Elapsed -    ' + this.trip.elapsed + '\n' +
        'Geo:             ' + 'lat: ' + this.trip.loc.mLatitude.toFixed(8) +
                          ' long: ' + this.trip.loc.mLongitude.toFixed(8) + '\n' +
        'Vector:        ' + 'distance: ' + bigDS.toFixed(2) + ' meters, velocity: ' + this.v.toFixed(1) + ' m/s \n' + 
        'Altitude:     ' + this.elevation + '\n');
        }
        else return("No trip in progress. " + this.nTrips + " trip(s) completed.");

    }

}

export class TripDisplay extends React.Component {
    
    constructor(props:any) {
        super(props);
        this.state = { seconds: 0 };
      }

      interval:any;

      tick() {
        this.setState(state => ({
          seconds:  1
        }));
      }
    
      componentDidMount() {
        this.interval = setInterval(() => this.tick(), Trips.displayInterval);
      }
    
      componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {

        if (debug > 10) 
         return(
         <View>
           <Text style={styles.tripText}>
             {Trips.getTripPanel() }
           </Text>
         </View> );
         else; 
         return(
         <View>
           <Text style={styles.tripText}>
             {Trips.getTripPanel() }
           </Text>
           <Text>{expoGeoState}</Text>
         </View> );
         
    }

}

export class TripSummary extends React.Component {
    
  handleRefresh = () => {
    // by calling this method react re-renders the component
    this.setState({});
  };

  render() {
 
      if (endIsNigh) {
        setEndIsLast(false); 
        return(
          <View>
            <Text style={styles.tripText}>
              {LastTrip.getTripSummary() }
            </Text>
          </View> );
         
      } else
       return(
       <View>
         <Text style={styles.tripText}>
           {Trips.getTripSummary() }
         </Text>
       </View> );
       
  }

}

export var Trips:GT2    = new GT2();
export var LastTrip:GT2 = new GT2();