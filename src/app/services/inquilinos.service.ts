import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Inquilino } from '../ficheros/inquilinos/inquilino';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InquilinosService {
  url:string = 'http://localhost:8080/api/inquilinos';

  httpHeaders= new HttpHeaders();

  constructor(
    private http:HttpClient,
    private router: Router,
    private authService: AuthService) { }

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
  getInquilinos(): Observable<Inquilino[]> {
    return this.http.get(this.url,{ headers: this.agregarAuthorizationHeader() }).pipe(
      map(response => response as Inquilino[]),
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
  getInquilinosP(page: number): Observable<any> {
    return this.http.get(this.url+'/page/'+page,{ headers: this.agregarAuthorizationHeader() }).pipe(
      map((response:any) => response as Inquilino[]),
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
  create(inquilino: Inquilino) : Observable<Inquilino> {
    return this.http.post<Inquilino>(this.url, inquilino, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getInquilino(id: any): Observable<Inquilino>{
    return this.http.get<Inquilino>(`${this.url}/${id}`,{ headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  update(inquilino: Inquilino): Observable<Inquilino>{
    return this.http.put<any>(`${this.url}/${inquilino.id}`, inquilino, { headers: this.agregarAuthorizationHeader() }).pipe(
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

  delete(id: number): Observable<Inquilino>{
    return this.http.delete<Inquilino>(`${this.url}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
}
