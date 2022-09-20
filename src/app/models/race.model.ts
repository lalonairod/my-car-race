import { Car } from "./car.model";

export interface Race {

    competitors : Car[],
    laps : number,
    distance : number,
    status: string //New//Process//Finished

}