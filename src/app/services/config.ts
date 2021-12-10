import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {


    public static APIURL:string;

    APIURL ='https://localhost:44348/Api/';

 constructor() {
    console.log('Hello Config');
  }
}