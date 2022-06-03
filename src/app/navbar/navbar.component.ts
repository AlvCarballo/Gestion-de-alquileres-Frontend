import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title: string = 'Alquileres'

  constructor( public authService: AuthService, private router: Router) { }
  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username} , has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

}
