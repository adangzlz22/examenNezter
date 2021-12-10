import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config';
import { TipoPeticionService } from './TipoPeticionService';
@Injectable()
export class  utileriasService {
    isLoged:any=false;
    url_principal:any;

    constructor(private http: HttpClient,
                private config: ConfigService,
                private _TipoPeticion: TipoPeticionService){

    }

    Post(endpoint:any,objModelDatos:any) {
        let usuario = new Promise((resolve,reject) => {
    
        const httpOptions = {
          headers: new HttpHeaders({
            "Content-type": "application/json"
          })
        };
    
        let url = this.config.APIURL + endpoint 
     
        let Model = objModelDatos;
        let Peticion = {
          Model: JSON.stringify(Model),
          TipoPeticion: this._TipoPeticion.TipoPeticionController.Usuarios,
          Formato: 2
        };
        this.http.post(url, JSON.stringify(Peticion), httpOptions).subscribe(
          val => {
              resolve(val);
          },
          Error => {
            console.log("POST call in error", Error);
              reject(Error);
          }
        );
      });
      return usuario;
      }



}