import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Inmueble } from '../ficheros/inmuebles/inmueble';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {

  url:string = 'http://localhost:8080/api/inmuebles';

  httpHeaders= new HttpHeaders();


  constructor(
    private http:HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private isNoAutorizado(e:any): boolean {
    if (e.status == 401 || e.status==403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getInmuebles(): Observable<Inmueble[]> {
    return this.http.get(this.url,{ headers: this.agregarAuthorizationHeader() }).pipe(
      map(response => response as Inmueble[]),
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
  getInmueblesP(page: number): Observable<any> {
    return this.http.get(this.url+'/page/'+page,{ headers: this.agregarAuthorizationHeader() }).pipe(
      map((response:any) => response as Inmueble[]),
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  create(inmueble: Inmueble) : Observable<Inmueble> {
    return this.http.post<Inmueble>(this.url, inmueble,{ headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getInmueble(id:any): Observable<Inmueble>{
    return this.http.get<Inmueble>(`${this.url}/${id}`,{ headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/inmuebles']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(inmueble: Inmueble): Observable<any>{
    return this.http.put<any>(`${this.url}/${inmueble.id}`, inmueble, { headers: this.agregarAuthorizationHeader() }).pipe(
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

  delete(id: any): Observable<Inmueble>{
    return this.http.delete<Inmueble>(`${this.url}/${id}`,{ headers: this.agregarAuthorizationHeader() }).pipe(
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
