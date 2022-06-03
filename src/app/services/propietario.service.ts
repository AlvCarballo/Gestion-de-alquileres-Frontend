import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Propietario } from '../ficheros/propietarios/propietario';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {
  url:string = 'http://localhost:8080/api/propietarios';

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

  getPropietarios(): Observable<Propietario[]> {
    return this.http.get(this.url,{ headers: this.agregarAuthorizationHeader() }).pipe(
      map(response => response as Propietario[]),
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getPropietariosP(page: number): Observable<any> {
    return this.http.get(this.url+'/page/'+page,{ headers: this.agregarAuthorizationHeader() }).pipe(
      map((response:any) => response as Propietario[]),
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
  create(propietario: Propietario) : Observable<Propietario> {
    return this.http.post<Propietario>(this.url, propietario, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getPropietario(id: any): Observable<Propietario>{
    return this.http.get<Propietario>(`${this.url}/${id}`,{ headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  update(propietario: Propietario): Observable<Propietario>{
    return this.http.put<any>(`${this.url}/${propietario.id}`, propietario,{ headers: this.agregarAuthorizationHeader() }).pipe(
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

  delete(id: number): Observable<Propietario>{
    return this.http.delete<Propietario>(`${this.url}/${id}`,{ headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
}

