import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {

    constructor(private router: Router) {}

    token: string;

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            );
    }
    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    //here signin success
                    this.router.navigate(['/']);
                    //response => console.log(response)
                    //getIdToken() is a promise
                    //.then -> wait for the token
                    firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token
                    )
                }
            )
            .catch(error => console.log(error));
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    getIdToken() {
        //returns a promise
        //return firebase.auth().currentUser.getIdToken();
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            )
        //will not wait for it and return a token anyway
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
}