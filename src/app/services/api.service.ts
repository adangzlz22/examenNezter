import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryTypeService } from './query-type.service';

@Injectable({
  providedIn: 'root'
})
export class  ApiService {
    isLogged=false;
    constructor(private readonly http: HttpClient,
                private readonly _queryType: QueryTypeService){

    }

      post(endpoint:any,obj:any): Observable<any>{
        const httpOptions = {
          headers: new HttpHeaders({
            "Content-type": "application/json"
          })
        };
        const url = environment.API_URL + endpoint 
        const query = {
          Model: JSON.stringify(obj),
          TipoPeticion: this._queryType.TipoPeticionController.Usuarios,
          Formato: 2
        };
       return this.http.post<any>(url, JSON.stringify(query), httpOptions); 
      }
 



}