import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Inquilino } from '../ficheros/inquilinos/inquilino';

@Injectable({
  providedIn: 'root'
})
export class InquilinosService {
  url:string = 'http://localhost:8080/api/inquilinos';

  httpHeaders= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private http:HttpClient) { }

  getInquilinos(): Observable<Inquilino[]> {
    return this.http.get(this.url).pipe(
      map(response => response as Inquilino[])
    );
  }

  create(inquilino: Inquilino) : Observable<Inquilino> {
    return this.http.post<Inquilino>(this.url, inquilino, {headers: this.httpHeaders})
  }

  getInquilino(id: any): Observable<Inquilino>{
    return this.http.get<Inquilino>(`${this.url}/${id}`)
  }

  update(inquilino: Inquilino): Observable<Inquilino>{
    return this.http.put<any>(`${this.url}/${inquilino.id}`, inquilino, { headers: this.httpHeaders }).pipe(
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

  delete(id: number): Observable<Inquilino>{
    return this.http.delete<Inquilino>(`${this.url}/${id}`, {headers: this.httpHeaders})
  }
}
