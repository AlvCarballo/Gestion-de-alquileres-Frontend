import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
  paginador:any;
  searchText:any;

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-2',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  constructor(
    private inquilinosService:InquilinosService,
    private activatedRouter: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.obtenerInquilinos()
  }

  ngOnChanges() {
    this.obtenerInquilinos();
  }
  obtenerInquilinos(){
    this.activatedRouter.paramMap.subscribe(params=>{
      let page:number;
      let parametro = params.get('page');
      if(!parametro){
        page = 0;
      }else{
        page = +parametro;
      }

      this.inquilinosService.getInquilinosP(page)
      .subscribe(response =>{
        this.inquilinos = response.content as Inquilino[];
        this.paginador = response;
      })
    });
  }

  delete(inquilino: Inquilino): void {
    this.swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al propietario ${inquilino.nombre_inquilino} ?`,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
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
