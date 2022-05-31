import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Inmueble } from '../ficheros/inmuebles/inmueble';
import { Recibo } from '../recibos/recibo';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {

  url:string = 'http://localhost:8080/api/recibos';

  httpHeaders= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');


  constructor(
    private http:HttpClient,
    private router: Router
  ) {}

  getRecibos(): Observable<Recibo[]> {
    return this.http.get(this.url).pipe(
      map(response => response as Recibo[])
    );
  }
  getRecibosP(page: number): Observable<any> {
    return this.http.get(this.url+'/page/'+page).pipe(
      map((response:any) => response as Recibo[])
    );
  }
  create(recibo: Recibo) : Observable<Recibo> {
    return this.http.post<Recibo>(this.url, recibo, {headers: this.httpHeaders})
  }

  getRecibo(id:any): Observable<Recibo>{
    return this.http.get<Recibo>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['recibos']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


}
