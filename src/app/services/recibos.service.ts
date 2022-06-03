import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Recibo } from '../recibos/recibo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {

  url:string = 'http://localhost:8080/api/recibos';

  httpHeaders= new HttpHeaders();


  constructor(
    private http:HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  private isNoAutorizado(e:any): boolean {
    if (e.status == 401 || e.status==403) {
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
  getRecibos(): Observable<Recibo[]> {
    return this.http.get(this.url,{ headers: this.agregarAuthorizationHeader() }).pipe(
      map(response => response as Recibo[]),
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
  getRecibosP(page: number): Observable<any> {
    return this.http.get(this.url+'/page/'+page,{ headers: this.agregarAuthorizationHeader() }).pipe(
      map((response:any) => response as Recibo[]),
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
  create(recibo: Recibo) : Observable<Recibo> {
    return this.http.post<Recibo>(this.url, recibo, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getRecibo(id:any): Observable<Recibo>{
    return this.http.get<Recibo>(`${this.url}/${id}`,{ headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['recibos']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


}
