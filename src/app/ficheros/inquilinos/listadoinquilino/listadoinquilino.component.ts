import { Component, OnInit } from '@angular/core';
import { InquilinosService } from 'src/app/services/inquilinos.service';
import swal from 'sweetalert2';
import { Inquilino } from '../inquilino';

@Component({
  selector: 'app-listadoinquilino',
  templateUrl: './listadoinquilino.component.html',
  styles: [
  ]
})
export class ListadoinquilinoComponent implements OnInit {

  inquilinos:any;
  searchText:any;

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  constructor(private inquilinosService:InquilinosService) { }

  ngOnInit(): void {
    this.obtenerInquilinos()
  }
  obtenerInquilinos(){
    this.inquilinosService.getInquilinos()
      .subscribe(respuesta =>{
        this.inquilinos = respuesta;
      })
  }

  delete(inquilino: Inquilino): void {
    this.swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al propietario ${inquilino.nombre_inquilino} ?`,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.inquilinosService.delete(inquilino.id).subscribe(
          () => {
            this.inquilinos = this.inquilinos.filter((finca: any) => finca !== finca)
            swal.fire(
              'Propietario Eliminado!',
              `Propietario ${inquilino.nombre_inquilino} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

}
