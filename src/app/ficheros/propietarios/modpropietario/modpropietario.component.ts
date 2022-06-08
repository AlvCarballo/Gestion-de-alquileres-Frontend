import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropietarioService } from 'src/app/services/propietario.service';
import { Propietario } from '../propietario';
import swal from 'sweetalert2'

@Component({
  selector: 'app-modpropietario',
  templateUrl: './modpropietario.component.html',
})
export class ModpropietarioComponent implements OnInit {

  propietario:Propietario =new Propietario();
  titulo:string = "Modificar Propietario";
  errores!: string[];

  constructor(
    private propietarioService:PropietarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarPropietario();
  }

  cargarPropietario(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.propietarioService.getPropietario(id).subscribe( (propietario) => this.propietario = propietario)
      }
    })
  }

  update():void{
    this.propietarioService.update(this.propietario)
    .subscribe( propietario => {
      this.router.navigate(['ficheros/propietarios']);
      swal.fire('Propietario Actualizado', `Propietario actualizado con éxito!`, 'success');
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }
    )
  }
}
