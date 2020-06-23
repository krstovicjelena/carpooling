import { Injectable } from "@angular/core";

export interface RequestModel{
    id          :number,
    id_prevoznik:number,
    id_putnik   :number,
    id_ride   :number,
    approved: boolean,
    rejected: boolean,
    seenByDriver : boolean,
    seenByPassenger : boolean
}

export interface rideEndModel{
    id          :number,
    id_vozac    :number,
    id_putnik   :Array<Number>,
    vrednovanje_uradio_vozac  : boolean,
    putnici_koji_nisu_vrednovali : Array<Number>,
    id_ride : number
}
@Injectable()
export class NotificationService {
    private requestList : Array<RequestModel> =[
        {
        id          :1,
        id_prevoznik:1,
        id_putnik   :0,
        id_ride   :1,
        approved : false,
        rejected : false,
        seenByDriver : false,
        seenByPassenger : false,
    },
    {
        id          :2,
        id_prevoznik :1,
        id_putnik   :0,
        id_ride   :0,
        approved : true,
        rejected : false,
        seenByDriver : false,
        seenByPassenger : false,
    },
    {
        id          :3,
        id_prevoznik :1,
        id_putnik   :0,
        id_ride   :0,
        approved : false,
        rejected : true,
        seenByDriver : false,
        seenByPassenger : false,
    }
    ]

    private rideEndList :  Array<rideEndModel>=[
        {
            id          :1,
            id_vozac    :1,
            id_putnik   :[0,3],
            vrednovanje_uradio_vozac  : false,
            putnici_koji_nisu_vrednovali : [0,3],
            id_ride: 0,
        }

    ]

    addRequest(prevoznikID : number ,putnikID:number,voznjaID:number){
        let newID = -1;
        if(this.requestList.length < 1){
            newID = 1;
        } else {
            newID = this.requestList[this.requestList.length - 1].id + 1;
        }

        this.requestList.push(
            {
                id          :newID,
                id_prevoznik :prevoznikID,
                id_putnik   :putnikID,
                id_ride   :voznjaID,
                approved : false,
                rejected: false,
                seenByDriver : false,
                seenByPassenger : false,
            }
        )

    }

    getReceivedRequestsFalse_number(inID:number){
        let sum = 0;
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id_prevoznik"] == inID && this.requestList[i]["approved"] == false && this.requestList[i]["rejected"] == false && this.requestList[i]["seenByDriver"] == false ){
                sum +=1;
            }
        }
        return sum;
    }

    getReceivedRequestsTrue_number(inID:number){
        let sum = 0;
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id_prevoznik"] == inID && this.requestList[i]["approved"] == true && this.requestList[i]["seenByDriver"] == false ){
                sum +=1;
            }
        }
        return sum;
    }

    getSentRequestsFalse_number(inID:number){
        let sum = 0;
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id_putnik"] == inID && this.requestList[i]["approved"] == false && this.requestList[i]["seenByPassenger"] == false ){
                sum +=1;
            }
        }
        return sum;
    }

    getSentRequestsTrue_number(inID:number){
        let sum = 0;
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id_putnik"] == inID && this.requestList[i]["approved"] == true  && this.requestList[i]["seenByPassenger"] == false  ){
                sum +=1;
            }
        }
        return sum;
    }

    setSeenByDriverTrue(in_type:string, inID:number){
        switch(in_type) {
            case 'ReceivedRequestsFalse':
                    for (var i=0 ; i < this.requestList.length ; i++){
                        if (this.requestList[i]["id_prevoznik"] == inID && this.requestList[i]["approved"] == false && this.requestList[i]["rejected"] == false ){
                            this.requestList[i]["seenByDriver"] = true;
                        }
                    }
              // code block
              break;
            case 'ReceivedRequestsTrue':
                    for (var i=0 ; i < this.requestList.length ; i++){
                        if (this.requestList[i]["id_prevoznik"] == inID && this.requestList[i]["approved"] == true ){
                            this.requestList[i]["seenByDriver"] = true;
                        }
                    }
              // code block
              break;
          } 
    }

    setSeenByPassengerTrue(in_type:string, inID:number){
        switch(in_type) {
            case 'SentRequestsFalse':
                    for (var i=0 ; i < this.requestList.length ; i++){

                        if (this.requestList[i]["id_putnik"] == inID && this.requestList[i]["approved"] == false ){
                            this.requestList[i]["seenByPassenger"] = true
                        }
                    }
              // code block
              break;
            case 'SentRequestsTrue':
                    for (var i=0 ; i < this.requestList.length ; i++){
                        if (this.requestList[i]["id_putnik"] == inID && this.requestList[i]["approved"] == true ){
                            this.requestList[i]["seenByPassenger"] = true
                        }
                    }
              // code block
              break;
          } 
    }

    getSentRequests(inID:number){
        let tempList = [];
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id_putnik"] == inID){
                tempList.push(this.requestList[i]);
            }
        }
        return tempList;
    }

    getSentUniqueRequest(inID:number){
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id"] == inID){
                return this.requestList[i];
            }
        }
    }

    setAsRejectedRequest(reqID){
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id"] == reqID ){ 
                this.requestList[i]["rejected"] = true;
            }
        }
    }



    setAsApproved(reqID){
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id"] == reqID ){ 
                this.requestList[i]["approved"] = true;
            }
        }
    }

    removeRequest(reqID){
        let tempList = [];
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id"] != reqID ){ 
                tempList.push(this.requestList[i]);
            }
        }
        this.requestList = tempList;
    }

    getSentRequestsFalse(inID:number){
        let tempList = [];
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id_putnik"] == inID && this.requestList[i]["approved"] == false ){
                tempList.push(this.requestList[i]);
            }
        }
        return tempList;
    }
    getSentRequestsTrue(inID:number){
        let tempList = [];
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id_putnik"] == inID && this.requestList[i]["approved"] == true ){
                tempList.push(this.requestList[i]);
            }
        }
        return tempList;
    }

    getReceivedRequestsFalseDriver(inID:number){
        let tempList = [];
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id_prevoznik"] == inID && this.requestList[i]["approved"] == false && this.requestList[i]["rejected"] == false ){
                tempList.push(this.requestList[i]);
            }
        }
        return tempList;
    }

    getReceivedRequestsFalse(inID:number){
        let tempList = [];
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id_prevoznik"] == inID && this.requestList[i]["approved"] == false ){
                tempList.push(this.requestList[i]);
            }
        }
        return tempList;
    }

    getReceivedRequestsTrue(inID:number){
        let tempList = [];
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id_prevoznik"] == inID && this.requestList[i]["approved"] == true ){
                tempList.push(this.requestList[i]);
            }
        }
        return tempList;
    }


    isPassangerRequestedARide(rideID, putnikID){
        for (var i=0 ; i < this.requestList.length ; i++){
            if (this.requestList[i]["id_ride"] == rideID && this.requestList[i]["id_putnik"] ==putnikID ){
                return true;
            }
        }
        return false;
    }
    ///////////////////////

    addRideEnd(vozacID, putniciList , rideID){
        let newID = -1;
        if(this.rideEndList.length < 1){
            newID = 1;
        } else {
            newID = this.rideEndList[this.rideEndList.length - 1].id + 1;
        }

        this.rideEndList.push(
            {
                id          :newID,
                id_vozac    :vozacID,
                id_putnik   :putniciList,
                vrednovanje_uradio_vozac  : false,
                putnici_koji_nisu_vrednovali : putniciList,
                id_ride : rideID
            }
        );
    }

    getUnrated(userID){
        let returnArray = [];
        for (var i=0 ; i < this.rideEndList.length ; i++){
            if (this.rideEndList[i]["id_vozac"] == userID && this.rideEndList[i]["vrednovanje_uradio_vozac"] == false  ){
                returnArray.push(this.rideEndList[i])
            }
             else if (this.rideEndList[i]["putnici_koji_nisu_vrednovali"].includes(userID)){
                returnArray.push(this.rideEndList[i])
            }
        }
        return returnArray;
    }

    setUserRatedTrue(notID, userID){
        for (var i=0 ; i < this.rideEndList.length ; i++){
            if (this.rideEndList[i]["id"] == notID){
                if ( this.rideEndList[i]["id_vozac"] == userID){
                    this.rideEndList[i]["vrednovanje_uradio_vozac"] = true;
                } else {
                    let tmpArray = [];
                    for (var j=0 ; j < this.rideEndList[i]["putnici_koji_nisu_vrednovali"].length ; j++){ 
                        if (this.rideEndList[i]["putnici_koji_nisu_vrednovali"][j] != userID){
                            tmpArray.push(this.rideEndList[i]["putnici_koji_nisu_vrednovali"][j])
                        }
                    }
                    this.rideEndList[i]["putnici_koji_nisu_vrednovali"] = tmpArray;
                }

            }
        }

    }

    

}