import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Coordinate } from "./Coordinate";
import { Text, View } from './components/Themed';
import { Button, StyleSheet } from 'react-native';

       var   debug:boolean      = false;
export var   endPending:boolean = false;
       var   expoGeoState:any   = null;
export var   locEnabled:boolean = false;

       const heartbeat:number   = 500; 
       const displayBeat:number = 3;  

export function getEndPending() { return(endPending) }
export function toggleEndPending() { endPending = !endPending;}

const styles = StyleSheet.create({
    tripText: {
     marginHorizontal: -10,
     marginVertical: 60,
     textAlign: 'left',
     width: "80%",
     fontSize: 12,
     fontWeight: 'bold',
    }});


function Monitor() {

        const [location, setLocation] = useState(Object);
        const [errorMsg, setErrorMsg] = useState("");
      
        useEffect(() => {
          (async () => {
            let { status } = await Location.requestBackgroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to monitor location was denied');
              return;
            } else Trips.setLocEnabled(true);
      
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            Trips.deltaLoc(location);
          })();
        }, []);
      
        expoGeoState = 'Waiting..';
        if (errorMsg) {
          expoGeoState = errorMsg;
        } else if (location) { 
          expoGeoState = JSON.stringify(location);
        }
      
      
      }
      

class Trip {

    public elapsed:string     = "00.00.00";
           ticks:number       = 0;
           interval:any;
           segments:number    = 1;
           distance:number    = 0;
           ds:number          = 0;
           CO2:number         = 0.0;
       
	       loc:Coordinate        = new Coordinate(0.0,0.0);
           startPoint:Coordinate = new Coordinate(0.0,0.0)

           tick()  {let hours:number   = 0, minutes:number = 0, seconds:number = 0;                   
                    this.ticks++; 
                    hours   = this.ticks < 3600 ? 0 : (this.ticks / 3600);
                    minutes = this.ticks < 60 ? 0 : (this.ticks - (hours * 3600)) / 60;
                    seconds = this.ticks % 60;
                    this.elapsed = hours.toFixed(0) + ":" + minutes.toFixed(0) + ":" + seconds.toFixed(0);   
                   }           
    public start()   { this.interval = setInterval(() => this.tick(), heartbeat);   }
    public resume()  { this.startPoint = new Coordinate(0.0,0.0)
                       this.loc = new Coordinate(0.0, 0.0);
                       this.segments++;
                       this.interval   = setInterval(() => this.tick(), heartbeat); }               
    public  stop()   { this.ds         = this.loc.distanceTo(this.startPoint);
                       this.distance  += this.ds;
                       clearInterval(this.interval); 
                           
                     }

}

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

        lastFix = JSON.stringify(lastFix);
        let expoFix:expoGeoObj = JSON.parse(lastFix);  

        this.trip.loc.setLongitude(expoFix.coords['longitude']);
        this.trip.loc.setLatitude(expoFix.coords['latitude']);

        if (this.trip.startPoint.mLatitude == 0.0) {
            this.trip.startPoint.mLatitude  = this.trip.loc.mLatitude;
            this.trip.startPoint.mLongitude = this.trip.loc.mLongitude;
        }

        this.trip.ds = this.trip.loc.distanceTo(this.trip.startPoint);

    }

    public end()   {
        
        this.trip.stop();
        this.inProgress = false;
        this.nTrips++;
        toggleEndPending();
        
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
        this.co2Rate    = 0.0;  
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

     return ( 
      'Elapsed -        ' + this.trip.elapsed + '\n' +
      'Origin:             ' + 'lat: ' + this.trip.loc.mLatitude.toFixed(8) +
                   ' long: ' + this.trip.loc.mLongitude.toFixed(8) + '\n' +
      'Destination:  ' + 'lat: ' + this.trip.loc.mLatitude.toFixed(8) +
                   ' long: ' + this.trip.loc.mLongitude.toFixed(8) + '\n' +
      'CO2:                ' + this.trip.CO2 + ' grams ' + this.CO2Effect );
       
    }

    public getTripPanel() : string   {

        if (this.inProgress) {
        return ( 
        'Elapsed -    ' + this.trip.elapsed + '\n' +
        'Geo:             ' + 'lat: ' + this.trip.loc.mLatitude.toFixed(8) +
                          ' long: ' + this.trip.loc.mLongitude.toFixed(8) + '\n' +
        'Vector:        ' + 'distance: ' + this.trip.ds + ' velocity: ' + this.v + '\n' + 
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

        if (!debug) 
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
    
  constructor(props:any) {
      super(props);
      this.state = { slug: null };
    }

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
