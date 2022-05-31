import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Propietario } from '../ficheros/propietarios/propietario';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {
  url:string = 'http://localhost:8080/api/propietarios';

  httpHeaders= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private http:HttpClient) { }

  getPropietarios(): Observable<Propietario[]> {
    return this.http.get(this.url).pipe(
      map(response => response as Propietario[])
    );
  }

  getPropietariosP(page: number): Observable<any> {
    return this.http.get(this.url+'/page/'+page).pipe(
      map((response:any) => response as Propietario[])
    );
  }
  create(propietario: Propietario) : Observable<Propietario> {
    return this.http.post<Propietario>(this.url, propietario, {headers: this.httpHeaders})
  }

  getPropietario(id: any): Observable<Propietario>{
    return this.http.get<Propietario>(`${this.url}/${id}`)
  }

  update(propietario: Propietario): Observable<Propietario>{
    return this.http.put<any>(`${this.url}/${propietario.id}`, propietario, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Propietario>{
    return this.http.delete<Propietario>(`${this.url}/${id}`, {headers: this.httpHeaders})
  }
}

