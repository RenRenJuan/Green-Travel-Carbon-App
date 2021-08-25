import React, { useState, useEffect, Component } from 'react';
import * as Location from 'expo-location';
import { Text, View } from './components/Themed';
import { StyleSheet } from 'react-native';
import * as geolib from 'geolib';

       var   debug:number       = 9;
       var   testCount          = 0;
       var   bgEnabled:boolean  = false;
       var   expoGeoState:any   = null;
export var   locEnabled:boolean = false;

       const heartbeat:number   = 500; 
       const displayBeat:number = 3;  
       const ticksPerDs         = 1;
       const geoLibAccuracy     = 0.01;
       const waitForSettle      = 6;   /* ticks of initial motion to discard */

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

    public distanceTo(otherPoint:Coordinate) : number {
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

           tick()  {let hours:number   = 0, minutes:number = 0, seconds:number = 0;                   
                    this.ticks += ( 1000 / heartbeat ) ; 
                    { /* TODO: guard by actual second discrimination later */
                    hours   = this.ticks < 3600 ? 0 : (this.ticks / 3600);
                    minutes = this.ticks < 60 ? 0 : (this.ticks - (hours * 3600)) / 60;
                    seconds = this.ticks % 60;
                    }
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

        var t:number = 0.0;
        lastFix                = JSON.stringify(lastFix);
        let expoFix:expoGeoObj = JSON.parse(lastFix);  

             this.trip.loc.set(expoFix.coords['latitude'],expoFix.coords['longitude']);
  
        if (Trips.startPoint.mLatitude == 0.0) 
            Trips.startPoint.set(this.trip.loc.mLatitude,this.trip.loc.mLongitude);
    
        if (this.trip.lastFix.mLatitude == 0.0)
            this.trip.lastFix.set(this.trip.loc.mLatitude,this.trip.loc.mLongitude);
        else 
          {if ((this.trip.ticks - this.trip.lastDSFixTick) >= ticksPerDs) {           
      
                this.trip.ds += this.trip.lastFix.distanceTo(this.trip.loc);
            this.trip.lastFix.set(this.trip.loc.mLatitude,this.trip.loc.mLongitude);
            if (debug > 10) console.log(this.trip.ds);
           }
          }

    }

    public end()   {
        

        this.trip.stop();
        this.inProgress = false;
        this.trip.CO2   = ( this.distance / 1000 ) * this.co2Rate;
        this.nTrips++;
        
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
      'Origin:             ' + 'lat: ' + this.trip.loc.mLatitude.toFixed(8) +
                   ' long: ' + this.trip.loc.mLongitude.toFixed(8) + '\n' +
      'Destination:  ' + 'lat: ' + this.trip.loc.mLatitude.toFixed(8) +
                   ' long: ' + this.trip.loc.mLongitude.toFixed(8) + '\n' +             
      'CO2:                ' + this.trip.CO2.toFixed(1) + ' grams ' + this.CO2Effect + '\n\n' +
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

       return(
       <View>
         <Text style={styles.tripText}>
           {Trips.getTripSummary() }
         </Text>
       </View> );
       
  }

}

export var Trips:GT2 = new GT2();
