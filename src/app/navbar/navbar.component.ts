import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title: string = 'Alquileres'

  constructor( private router: Router) { }
  logout(): void {

    swal.fire('Logout', `Hola , has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

}
