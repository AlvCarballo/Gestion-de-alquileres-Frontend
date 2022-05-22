import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Inmueble } from '../ficheros/inmuebles/inmueble';

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {

  url:string = 'http://localhost:8080/api/inmuebles';

  httpHeaders= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');


  constructor(
    private http:HttpClient,
    private router: Router
  ) {}

  getInmuebles(): Observable<Inmueble[]> {
    return this.http.get(this.url).pipe(
      map(response => response as Inmueble[])
    );
  }

  create(inmueble: Inmueble) : Observable<Inmueble> {
    return this.http.post<Inmueble>(this.url, inmueble, {headers: this.httpHeaders})
  }

  getInmueble(id:number): Observable<Inmueble>{
    return this.http.get<Inmueble>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/inmuebles']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(inmueble: Inmueble): Observable<any>{
    return this.http.put<any>(`${this.url}/${inmueble.id}`, inmueble, { headers: this.httpHeaders }).pipe(
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

  delete(id: any): Observable<Inmueble>{
    return this.http.delete<Inmueble>(`${this.url}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
