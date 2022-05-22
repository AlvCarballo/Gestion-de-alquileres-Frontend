import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropietarioService } from 'src/app/services/propietario.service';
import { Propietario } from '../propietario';
import swal from 'sweetalert2';

@Component({
  selector: 'app-addpropietario',
  templateUrl: './addpropietario.component.html',
})
export class AddpropietarioComponent implements OnInit {

  propietario:Propietario =new Propietario();
  titulo:string = "Añadir Propietario"

  constructor(
    private propietarioService:PropietarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
  create(): void {
    this.propietarioService.create(this.propietario)
      .subscribe(propietario => {
        this.router.navigate(['/propietario'])
        swal.fire('Nueva finca', `Finca ${propietario.nombre_propietario} creada con éxito!`, 'success')

       }
      );
  }
}
