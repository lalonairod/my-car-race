import { Component } from '@angular/core';
import { Race } from './models/race.model';
import { Driver } from './models/driver.model';
import { Car } from './models/car.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-car-race';

  constructor(){

    const DRIVER_1 : Driver = {
      id : 1,
      name : 'Ignacio',
      lastname : 'Pérez',
      nationality : 'Mexican'
    }

    const DRIVER_2 : Driver = {
      id : 2,
      name : 'Jason',
      lastname : 'Durán',
      nationality : 'American'
    }

    const DRIVER_3 : Driver = {
      id : 3,
      name : 'Eduardo',
      lastname : 'Alvárez',
      nationality : 'Mexican'
    }

    const DRIVER_4 : Driver = {
      id : 4,
      name : 'Julión',
      lastname : 'Camerón',
      nationality : 'Mexican'
    }

    let CAR1 : Car = {
      number : 1,
      color : 'Red',
      carDriver : DRIVER_2,
      currentDistance : 0,
      status : 'Stopped',
      start(){
        this.status = 'Moving';
      },
      stop() {
        this.status = 'Stopped';
      }
    }

    let CAR2 : Car = {
      number : 2,
      color : 'Green',
      currentDistance : 0,
      status : 'Stopped',
      start(){
        this.status = 'Moving';
      },
      stop() {
        this.status = 'Stopped';
      }
    }

    let CAR3 : Car = {
      number : 3,
      color : 'Blue',
      carDriver : DRIVER_1,
      currentDistance : 0,
      status : 'Stopped',
      start(){
        this.status = 'Moving';
      },
      stop() {
        this.status = 'Stopped';
      }
    }

    let CAR4 : Car = {
      number : 4,
      color : 'Pink',
      carDriver : DRIVER_3,
      currentDistance : 0,
      status : 'Stopped',
      start(){
        this.status = 'Moving';
      },
      stop() {
        this.status = 'Stopped';
      }
    }

    let CAR5 : Car = {
      number : 5,
      color : 'Black',
      carDriver : DRIVER_4,
      currentDistance : 0,
      status : 'Stopped',
      start(){
        this.status = 'Moving';
      },
      stop() {
        this.status = 'Stopped';
      }
    }

    let race : Race ={
      competitors : [CAR1, CAR3, CAR4, CAR5],
      laps : 3,
      distance : 150,
      status: 'New'
    };

    this.startRace(race);

    do{
      this.showPositions(race);
    }while(race.status != 'Finished');

    const ORDERLY_RACE : Car[] = this.checkPositions(race.competitors);
    const { number : winnerCar, carDriver : winnerDriver} = ORDERLY_RACE[0];
    const WINNER : string = `
    El ganador es 
    Nacionalildad: ${winnerDriver?.nationality}
    Piloto: ${winnerDriver?.name} ${winnerDriver?.lastname}
    Car: ${winnerCar}`;

    console.log(WINNER);

  }

  getRandomNumber() : number {
    return Math.round(Math.random() * (50-1) + 1);
  }

  startRace(race : Race) : void {
    
    if(race.status == 'New'){
      race.competitors.forEach( value => value.start() );
      race.status = "Process";
    }

  }

  updateRace(race : Race) : void {
    if(race.status == "Process"){
      const RACE_DISTANCE = race.distance * race.laps;
      let finishedCars = 0;

      race.competitors.forEach ( value => {
        value.start = () => {
          if(value.currentDistance >= RACE_DISTANCE){
            finishedCars++;
            value.currentDistance += 50;
          } else{
            value.currentDistance += this.getRandomNumber();
          }
        }

        if(value.status == 'Moving'){
          value.start();
        }
      });

      if(race.competitors.length == finishedCars){
        race.status = 'Finished';
      }
    }
  }

  checkPositions(competitors : Car[]) : Car[]{
    return competitors.sort(((a:Car,b:Car) => b.currentDistance - a.currentDistance));
  }

  showPositions(race : Race) : void {
    this.updateRace(race);
    console.log(race.status);

    let position : any[] = [];
    const ORDER_RACE : Car[] = this.checkPositions(race.competitors);
    ORDER_RACE.forEach((value, index) => {

      let competitor : any = {
        position : index+1,
        country : value.carDriver?.nationality,
        name : value.carDriver?.name,
        carNumber : value.number
      }

      position.push(competitor);
    });

    console.table(position);

  }
}
