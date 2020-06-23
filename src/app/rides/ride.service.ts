import { Injectable } from "@angular/core";


export interface Ride {
    id : number;
    rideName : string;
    idPrevoznik : number;
    maxPassengers : number;
    requested : number[];
    rejected : number[];
    passengers : number[];
    stajalista:string,
    timeOfDeparture : Date;
    hourOfDeparture : number;
    minuteOfDeparture : number;
    hourOfArrival : number;
    minuteOfArrival : number;
    startingLocation : string;
    destination : string;
    status : 'otkazana' | 'čeka na zahteve' |  'tekuća' | 'završena' ;
}


@Injectable()
export class RideService {

    private rides : Array<Ride> = [
        {id: 0, rideName: "Prevoz studenata" ,idPrevoznik: 1, maxPassengers : 4, requested : [], rejected: [], passengers : [0],stajalista:"Bežanija/Savac centar" ,timeOfDeparture : new Date(), hourOfDeparture : 10,
        minuteOfDeparture :20,  hourOfArrival : 10,
        minuteOfArrival :36,startingLocation : "Šimanovci", destination : "Danijelova 32", status : 'otkazana' },
        {id: 1, rideName: "Prevoz studenata" ,idPrevoznik: 2, maxPassengers : 4, requested : [], rejected: [], passengers : [1,2],stajalista:"Ada/Mostar" , timeOfDeparture : new Date(), hourOfDeparture : 15,
        minuteOfDeparture :15, hourOfArrival : 16,
        minuteOfArrival :5,startingLocation : "Obrenovac", destination : "Danijelova 32", status : 'čeka na zahteve' }
    ]

    getRides() {
        return this.rides;
    }

    createRide(idPrevoznik:number, rideName:string ,maxPassengers:number,stajalista:string, timeOfDeparture : Date, hourOfArrival : number, minuteOfArrival : number,  hourOfDeparture : number, minuteOfDeparture : number,startingLocation : string, destination : string){
        var id = this.rides.length;


        this.rides.push( {id: id, rideName : rideName ,idPrevoznik: idPrevoznik, maxPassengers: maxPassengers,requested: [], rejected: [], passengers : [], stajalista:stajalista, 
        timeOfDeparture : timeOfDeparture, hourOfDeparture : hourOfDeparture, minuteOfDeparture : minuteOfDeparture, hourOfArrival : hourOfArrival,
        minuteOfArrival :minuteOfArrival,
        startingLocation : startingLocation, destination : destination, status : 'čeka na zahteve'} )
       
    }

    getStatusById(id : number){
        return this.getRides[id].status;
    }

    getRidesForDriverID(driverID){
        let returnList : Array<Ride> = []
        for (var i=0 ; i < this.rides.length ; i++){
            if (this.rides[i]["idPrevoznik"] == driverID) {
                returnList.push(this.rides[i]);
            }
        }
    return returnList;
    }

    getRideByID(rideID){
        for (var i=0 ; i < this.rides.length ; i++){
            if (this.rides[i]["id"] == rideID) {
                console.log(this.rides[i])
                return this.rides[i];
            }
        }
    }

    isPassengersListFull(rideID){
        for (var i=0 ; i < this.rides.length ; i++){
            if (this.rides[i]["id"] == rideID){
                if( this.rides[i]["passengers"].length >= this.rides[i]["maxPassengers"]){
                    return true;
                }
            }
        }
        return false;
    }

    isUserAlreadyInPassangers(rideID, userID){
        for (var i=0 ; i < this.rides.length ; i++){
            if (this.rides[i]["id"] == rideID){
                for (var j=0 ; j < this.rides[i]["passengers"].length ; j++){
                    if (this.rides[i]["passengers"][j] == userID ){
                        return true;
                    }
                }
                return false;
            }
        }
        return false;
    }

    addPassangerToPassangerList(rideID:number, passID:number){
        for (var i=0 ; i < this.rides.length ; i++){
            if (this.rides[i]["id"] == rideID){
               this.rides[i]["passengers"].push(passID)
            }
        }
    }

    removeRide(rideID:number){
        let returnList : Array<Ride> = []
        for (var i=0 ; i < this.rides.length ; i++){
            if (this.rides[i]["id"] != rideID) {
                returnList.push(this.rides[i]);
            }
        }
    this.rides =  returnList;

    }

}