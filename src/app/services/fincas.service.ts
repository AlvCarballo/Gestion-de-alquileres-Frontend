import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Finca } from '../ficheros/fincas/finca';
import { of, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FincasService {

  private url:string = 'http://localhost:8080/api/fincas';
  currentTourney:any = {};
  httpHeaders= new HttpHeaders();


  constructor(
    private http:HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }
  private isNoAutorizado(e:any): boolean {
    if (e.status == 401 || e.status==403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getFincas(): Observable<Finca[]> {
    return this.http.get(this.url,{ headers: this.agregarAuthorizationHeader() }).pipe(
      map((response) => response as Finca[]),
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
  getFincasP(page: number): Observable<any> {
    return this.http.get(this.url+'/page/'+page,{ headers: this.agregarAuthorizationHeader() }).pipe(
      map((response:any) => response as Finca[]),
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  create(finca: Finca) : Observable<Finca> {
    return this.http.post<Finca>(this.url, finca, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getFinca(id:any): Observable<Finca>{
    console.log(id);
    return this.http.get<Finca>(this.url+"/"+id,{ headers: this.agregarAuthorizationHeader() }).pipe(

      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/ficheros/fincas']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })

    );

  }

  update(finca: Finca): Observable<Finca>{
    return this.http.put<Finca>(`${this.url}/${finca.id}`, finca, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
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
    return this.http.delete<Finca>(`${this.url}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
