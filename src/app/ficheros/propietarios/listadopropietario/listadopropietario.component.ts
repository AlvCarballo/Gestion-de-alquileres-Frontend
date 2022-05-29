import { Component, OnInit } from '@angular/core';
import { PropietarioService } from 'src/app/services/propietario.service';
import { Propietario } from '../propietario';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listadopropietario',
  templateUrl: './listadopropietario.component.html',
})
export class ListadopropietarioComponent implements OnInit {
  propietarios:any;
  searchText: any;

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-2',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  constructor(private propietarioService:PropietarioService) { }

  ngOnInit(): void {
    this.obtenerPropietarios()
  }
  obtenerPropietarios(){
    this.propietarioService.getPropietarios()
      .subscribe(respuesta =>{
        this.propietarios = respuesta;
      })
  }

  delete(propietario: Propietario): void {
    this.swalWithBootstrapButtons.fire({
      icon: 'warning',
      title: '¿Eliminar?',
      text: `¿Seguro que desea eliminar al propietario ${propietario.nombre_propietario} ?`,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {

        this.propietarioService.delete(propietario.id).subscribe(
          () => {
            this.propietarios = this.propietarios.filter((finca: any) => finca !== finca)
            swal.fire(
              'Propietario Eliminado!',
              `Propietario ${propietario.nombre_propietario} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }
}
