import { Driver } from "./driver.model";

export interface Car {
    
    number : number,
    color : string,
    carDriver? : Driver,
    currentDistance : number,
    status : string,
    start() : void,
    updateDistance?() : void,
    stop() : void

}