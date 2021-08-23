import * as React from 'react';
import { Coordinate } from "./Coordinate";
import { Text, View } from './components/Themed';
import { Alert, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

const styles = StyleSheet.create({
    tripText: {
     marginHorizontal: -10,
     marginVertical: 60,
     textAlign: 'left',
     width: "80%",
     fontSize: 12,
     fontWeight: 'bold',
    }});

var   lastLoc:any        = null; 
const heartbeat:number   = 500; 
const displayBeat:number = 3;  

class Chronometer {

    public display:string = "00.00.00";
           clock:number   = 0;
           intervalID:any = null;
       
           tick()  {let hours:number   = 0, minutes:number = 0, seconds:number = 0;                   
                    this.clock++; 
                    hours   = this.clock < 3600 ? 0 : (this.clock / 3600);
                    minutes = this.clock < 60 ? 0 : (this.clock - (hours * 3600)) / 60;
                    seconds = this.clock % 60;
                    this.display = hours + ":" + minutes + ":" + seconds;                   
                   }           
    public start() { this.clock = 0;
                     this.intervalID = setInterval(this.tick, heartbeat);                     
                   }
    public  resume() { this.intervalID = setInterval(this.tick, heartbeat); }               
    public  stop() { clearInterval(this.intervalID); }

}

  
export class GT2 {

	       loc:Coordinate        = new Coordinate(0,0);
           clock:Chronometer     = new Chronometer();
           startPoint:Coordinate = new Coordinate(0,0);

           displayInterval:number = displayBeat * heartbeat;
    public distance:number        = 0.0;
           co2Rate:number         = 0.0;   
	       currTime:number        = 0;
           lastTime:number        = 0;
           z:number               = 0.0;
	public v:number               = 0.0;
    public inProgress:boolean     = false;
    public paused:boolean         = false;
    public elapsed:number         = 0.0;
           segments:number        = 0;
           elevation:number       = 0.0;

           nTrips:number  = 0;

           parseGeoExpo(key:string, value:any) {}

    public deltaLoc(lastFix:any) {


    }

    public reset() {

        this.startPoint = new Coordinate(0,0);
        this.distance   = 0.0;
        this.co2Rate    = 0.0;   
        this.currTime   = 0;
        this.lastTime   = 0;
        this.loc        = new Coordinate(0,0);
        this.v          = 0;
        this.inProgress = false;
        this.paused     = false;
        this.elapsed    = 0.0;

    }

    public end()   {
        
        this.clock.stop();
        this.inProgress = false;
        this.nTrips++;
    
    }

    public pause() {
    
        if (!this.paused) {
            this.clock.stop();
            this.paused = true;
        } else {
            this.clock.start();
            this.paused = false;
        }
    
    }

    public start() {

        this.reset();
        this.clock.start();     
        this.inProgress = true;
    }
   
    public getTripPanel() : string   {

        if (this.inProgress)
        return (
        'Elapsed -    ' + this.clock.display + '\n' +
        'Geo:             ' + 'lat: ' + this.loc.mLatitude + ' long: ' + this.loc.mLatitude + '\n' +
        'Vector:        ' + 'distance: ' + this.distance + ' velocity: ' + this.v + '\n' + 
        'Altitude:     ' + this.elevation + '\n');
        else return("No trip in progress. " + this.nTrips + " trip(s) completed");

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

        return(
        <View>
           <Text style={styles.tripText}>
             {Trips.getTripPanel() }
           </Text>
        </View> );
    }

}
 
export var Trips:GT2 = new GT2();
