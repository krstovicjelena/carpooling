import { Injectable } from "@angular/core";

export interface User {
    id : number;
    email : string;
    password : string;
    firstName : string;
    lastName : string;
    phone : string;
    address: string;
    dateOfRegistration : Date;
    typeOfUser : 'Prevoznik' | 'Putnik';
}

export interface Comment {
    idFrom : number;
    idTo : number;
    date : Date;
    comment: string;
}

export interface Rating {
    idFrom : number;
    idTo : number;
    rating : number;
}

@Injectable()
export class UserService {


    profileToShow = -1;
    loggedInUser : User  = {id: 0, email: '0', password: "0", firstName: '0', lastName: "0", phone: "0", address: "0 1", dateOfRegistration: new Date(), typeOfUser: 'Putnik'};


    private listOfUsers : Array<User> = [
       {id: 0, email: 'jelena@gmail.com', password: "singidunum", firstName: 'Jelena', lastName: "Krstović", phone: "066-555-777", address: "Nemanjina 61", dateOfRegistration: new Date(), typeOfUser: 'Putnik'},
       {id: 1, email: 'nemanja@gmail.com', password: "singidunum", firstName: 'Nemanja', lastName: "Milutinović", phone: "069-774-669", address: "Nemanjina 61", dateOfRegistration: new Date(), typeOfUser: 'Prevoznik'},
       {id: 2, email: 'petar@gmail.com', password: "singidunum", firstName: 'Petar', lastName: "Petrović", phone: "062-887-6454", address: "Nehruova 15", dateOfRegistration: new Date(), typeOfUser: 'Prevoznik'},
       {id: 3, email: 'milos@gmail.com', password: "singidunum", firstName: 'Miloš', lastName: "Milošević", phone: "064-123-456", address: "Agostina Neta 25", dateOfRegistration: new Date(), typeOfUser: 'Putnik'},
    ]


    private listOfAllComments : Array<Comment> = [
        {idFrom : 1, idTo: 0, date: new Date(), comment : "Korektan putnik"},
        {idFrom : 0, idTo: 0, date: new Date(), comment : "Vožnja je malo prebrza"},
        {idFrom : 0, idTo: 1, date: new Date(), comment : "Izuzetno prijatna vožnja"}
    ]

    private listOfAllRatings : Array<Rating> = [
        {idFrom : 1, idTo: 0, rating: 4},
        {idFrom : 2, idTo: 0, rating: 5},
        {idFrom : 0, idTo: 1, rating: 5},
        {idFrom : 1, idTo: 2, rating: 4},
        {idFrom : 0, idTo: 2, rating: 5},
    ]


    getListOfUsers() {
        return this.listOfUsers;
    }

    getCurrentUser(){
        return this.loggedInUser;
    }


    getProfileToShow(){
        return this.getListOfUsers()[this.profileToShow];
    }

    registerUser(email : string, password : string, firstName : string, lastName : string, phone: string, address : string, typeOfUser ){
        var id = this.getListOfUsers()[this.getListOfUsers().length - 1].id + 1;

        this.listOfUsers.push( {id, email,password, firstName, lastName, phone, address, typeOfUser, dateOfRegistration: new Date()} )
        this.loggedInUser = this.getListOfUsers()[this.getListOfUsers().length - 1]
        


    }

    checkEmail(email:string) {
        var results = [];
        var searchField = "email";
        var searchVal = email;
        for (var i=0 ; i < this.listOfUsers.length ; i++)
        {
            if (this.listOfUsers[i][searchField] == searchVal) {
                results.push(this.listOfUsers[i]);
            }
        }
        if (results.length)
            return false;
        return true;
    }

    checkEmailUpdate(email:string) {
        var results = [];
        var searchField = "email";
        var searchVal = email;
        for (var i=0 ; i < this.listOfUsers.length ; i++)
        {
            if (this.listOfUsers[i] != this.getCurrentUser()){
                if (this.listOfUsers[i][searchField] == searchVal) {
                    results.push(this.listOfUsers[i]);
                }
            }
        }
        if (results.length)
            return false;
        return true;
    }

    checkLogin(email:string, password : string) {
        var results = [];
        var searchField = "email";
        var searchVal = email;
        for (var i=0 ; i < this.listOfUsers.length ; i++)
        {
            if (this.listOfUsers[i][searchField] == searchVal) {
                results.push(this.listOfUsers[i]);
            }
        }
      
        if (!results.length)
            return false;
        else{
            if(results[0].password  ==  password){
                this.loggedInUser = results[0];
           
                return true;
            }
        }
        return false;
    }

    getCommentsForId(id : number)  {
        var results = [];
        var searchField = "idTo";
        var searchVal = id;
        for (var i=0 ; i < this.listOfAllComments.length ; i++)
        {
            if (this.listOfAllComments[i][searchField] == searchVal) {
                results.push(this.listOfAllComments[i]);
            }
        }
       
        return results;
    }

    getNameById(id : number){
        return this.listOfUsers[id].firstName + " " + this.listOfUsers[id].lastName;
    }

    getRatingById(id: number){       
        let ratingsSum = 0;
        let ratingsNum = 0;
        let final = [];
        for (var i=0 ; i < this.listOfAllRatings.length ; i++){
            if (this.listOfAllRatings[i]["idTo"] == id) {
                ratingsSum += Number(this.listOfAllRatings[i]["rating"])
                ratingsNum += 1;
            }
        }
        let sum = 0;
        if (ratingsNum != 0){
            sum =  Math.round((ratingsSum/ratingsNum) * 100) / 100  ;
        }
        
        final.push(sum);
        final.push(ratingsNum)
        return final;

        
    }

    addComment(idFrom:number, idTo:number, comment:string){
        this.listOfAllComments.push({idFrom,idTo,date: new Date(), comment})
    }

    addRating(from:number, to:number, rating:number){
        this.listOfAllRatings.push( {idFrom : from, idTo: to, rating: rating})
       
    }



}