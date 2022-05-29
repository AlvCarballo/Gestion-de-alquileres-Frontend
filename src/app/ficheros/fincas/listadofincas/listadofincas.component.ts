import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FincasService } from 'src/app/services/fincas.service';
import swal from 'sweetalert2';
import { Finca } from '../finca';

@Component({
  selector: 'app-listadofincas',
  templateUrl: './listadofincas.component.html'
})
export class ListadofincasComponent implements OnInit {

  fincas:any;
  searchText:any;
  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-2',
      cancelButton: 'btn btn-danger',

    },
    buttonsStyling: false
  })

  constructor(private fincasService:FincasService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerFincas();
  }
  obtenerFincas(){
    this.fincasService.getFincas()
      .subscribe(respuesta =>{
        this.fincas = respuesta;
      })
  }
  delete(finca: Finca): void {
     this.swalWithBootstrapButtons.fire({
      icon: 'warning',
      title: '¿Eliminar?',
      text: `¿Seguro que desea eliminar la finca ${finca.nombre_finca} ?`,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['ficheros/fincas'])
        this.fincasService.delete(finca.id).subscribe(
          () => {
            this.fincas = this.fincas.filter((finca: any) => finca !== finca)
            swal.fire(
              'Finca Eliminada!',
              `Finca ${finca.nombre_finca} eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }
}
