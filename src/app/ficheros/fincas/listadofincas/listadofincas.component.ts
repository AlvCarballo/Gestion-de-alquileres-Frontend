import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FincasService } from 'src/app/services/fincas.service';
import swal from 'sweetalert2';
import { Finca } from '../finca';

@Component({
  selector: 'app-listadofincas',
  templateUrl: './listadofincas.component.html'
})
export class ListadofincasComponent implements OnInit {

  fincas:any;
  paginador:any;
  searchText:any;
  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-2',
      cancelButton: 'btn btn-danger',

    },
    buttonsStyling: false
  })

  constructor(
    private fincasService:FincasService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public authService: AuthService
    ) { }

  ngOnInit(): void {

    this.activatedRouter.paramMap.subscribe(params=>{
      let page:number;
      let parametro = params.get('page');
      if(!parametro){
        page = 0;
      }else{
        page = +parametro;
      }

      this.fincasService.getFincasP(page)
      .subscribe(response =>{
        this.fincas = response.content as Finca[];
        this.paginador = response;
      })
    });


  }
  ngOnChanges() {
    this.activatedRouter.paramMap.subscribe(params=>{
      let page:number;
      let parametro = params.get('page');
      if(!parametro){
        page = 0;
      }else{
        page = +parametro;
      }

      this.fincasService.getFincasP(page)
      .subscribe(response =>{
        this.fincas = response.content as Finca[];
        this.paginador = response;
      })
    });
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
