import { Component, OnInit } from '@angular/core';
import { PropietarioService } from 'src/app/services/propietario.service';
import { Propietario } from '../propietario';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listadopropietario',
  templateUrl: './listadopropietario.component.html',
})
export class ListadopropietarioComponent implements OnInit {
  propietarios:any;
  paginador:any;
  searchText: any;

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-2',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  constructor(
    private propietarioService:PropietarioService,
    private activatedRouter: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.obtenerPropietarios()
  }
  ngOnChanges() {
    this.obtenerPropietarios();
  }
  obtenerPropietarios(){
    this.activatedRouter.paramMap.subscribe(params=>{
      let page:number;
      let parametro = params.get('page');
      if(!parametro){
        page = 0;
      }else{
        page = +parametro;
      }

      this.propietarioService.getPropietariosP(page)
      .subscribe(response =>{
        this.propietarios = response.content as Propietario[];
        this.paginador = response;
      })
    });
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
