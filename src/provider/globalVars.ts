import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {

    userAuthtenticate: false;


    constructor() {
        this.userAuthtenticate = false;
    }

    setUserAuthtenticate(value) {
        this.userAuthtenticate = value;
    }

    getUserAuthtenticatelVar() {
        return this.userAuthtenticate;
    }

}