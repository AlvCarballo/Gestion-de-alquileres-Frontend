import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Finca } from '../ficheros/fincas/finca';
import { of, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FincasService {

  private url:string = 'http://localhost:8080/api/fincas';
  currentTourney:any = {};
  httpHeaders= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');


  constructor(
    private http:HttpClient,
    private router: Router
  ) {}

  getFincas(): Observable<Finca[]> {
    return this.http.get(this.url).pipe(
      map((response) => response as Finca[])
    );
  }

  create(finca: Finca) : Observable<Finca> {
    return this.http.post<Finca>(this.url, finca, {headers: this.httpHeaders})
  }

  getFinca(id:any): Observable<Finca>{
    console.log(id);
    return this.http.get<Finca>(this.url+"/"+id).pipe(

      catchError(e => {
        this.router.navigate(['/ficheros/fincas']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })

    );

  }

  update(finca: Finca): Observable<Finca>{
    return this.http.put<Finca>(`${this.url}/${finca.id}`, finca, { headers: this.httpHeaders }).pipe(
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

  delete(id: any): Observable<Finca>{
    return this.http.delete<Finca>(`${this.url}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
