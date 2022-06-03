import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ListadofincasComponent } from './ficheros/fincas/listadofincas/listadofincas.component';
import { FincasComponent } from './ficheros/fincas/fincas.component';
import { FicherosComponent } from './ficheros/ficheros.component';

import { AddfincaComponent } from './ficheros/fincas/addfinca/addfinca.component';

import { FincasService } from './services/fincas.service';
import { ModfincaComponent } from './ficheros/fincas/modfinca/modfinca.component';
import { PropietariosComponent } from './ficheros/propietarios/propietarios.component';
import { AddpropietarioComponent } from './ficheros/propietarios/addpropietario/addpropietario.component';
import { ModpropietarioComponent } from './ficheros/propietarios/modpropietario/modpropietario.component';
import { ListadopropietarioComponent } from './ficheros/propietarios/listadopropietario/listadopropietario.component';
import { InmueblesComponent } from './ficheros/inmuebles/inmuebles.component';
import { AddinmuebleComponent } from './ficheros/inmuebles/addinmueble/addinmueble.component';
import { ListadoinmuebleComponent } from './ficheros/inmuebles/listadoinmueble/listadoinmueble.component';
import { ModinmuebleComponent } from './ficheros/inmuebles/modinmueble/modinmueble.component';
import { InquilinosComponent } from './ficheros/inquilinos/inquilinos.component';
import { AddinquilinoComponent } from './ficheros/inquilinos/addinquilino/addinquilino.component';
import { ListadoinquilinoComponent } from './ficheros/inquilinos/listadoinquilino/listadoinquilino.component';
import { ModinquilinoComponent } from './ficheros/inquilinos/modinquilino/modinquilino.component';
import { RecibosComponent } from './recibos/recibos.component';
import { ListadorecibosComponent } from './recibos/listadorecibos/listadorecibos.component';
import {NgPipesModule} from 'ngx-pipes';
import { DetallepropietarioComponent } from './ficheros/propietarios/detallepropietario/detallepropietario.component';
import { DetalleinquilinoComponent } from './ficheros/inquilinos/detalleinquilino/detalleinquilino.component';
import { AddreciboComponent } from './recibos/addrecibo/addrecibo.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DetallereciboComponent } from './recibos/detallerecibo/detallerecibo.component';
import { PaginafincaComponent } from './ficheros/fincas/paginafinca/paginafinca.component';
import { PaginainmuebleComponent } from './ficheros/inmuebles/paginainmueble/paginainmueble.component';
import { PaginainquilinoComponent } from './ficheros/inquilinos/paginainquilino/paginainquilino.component';
import { PaginapropietarioComponent } from './ficheros/propietarios/paginapropietario/paginapropietario.component';
import { PaginarecibosComponent } from './recibos/paginarecibos/paginarecibos.component';

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'ficheros', component:FincasComponent},
  {path: 'ficheros/fincas', component:FincasComponent},
  {path: 'ficheros/fincas/page/:page', component:FincasComponent},
  {path: 'ficheros/fincas/modfinca/:id', component:ModfincaComponent},
  {path: 'ficheros/propietarios', component:PropietariosComponent},
  {path: 'ficheros/propietarios/page/:page', component:PropietariosComponent},
  {path: 'ficheros/propietarios/modpropietario/:id', component:ModpropietarioComponent},
  {path: 'ficheros/propietarios/detallepropietario/:id', component:DetallepropietarioComponent},
  {path: 'ficheros/inmuebles', component:InmueblesComponent},
  {path: 'ficheros/inmuebles/page/:page', component:InmueblesComponent},
  {path: 'ficheros/inmuebles/finca/:idfincainmueble', component:InmueblesComponent},
  {path: 'ficheros/inmuebles/propietario/:idpropietarioinmueble', component:InmueblesComponent},
  {path: 'ficheros/inmuebles/modinmueble/:id', component:ModinmuebleComponent},
  {path: 'ficheros/inquilinos', component:InquilinosComponent},
  {path: 'ficheros/inquilinos/page/:page', component:InquilinosComponent},
  {path: 'ficheros/inquilinos/modinquilino/:id', component:ModinquilinoComponent},
  {path: 'ficheros/inquilinos/detalleinquilino/:id', component:DetalleinquilinoComponent},
  {path: 'recibos', component:RecibosComponent},
  {path: 'recibos/page/:page', component:RecibosComponent},
  {path: 'recibos/addrecibo', component:AddreciboComponent},
  {path: 'recibos/:idinquilino', component:RecibosComponent},
  {path: 'recibos/detallerecibo/:id', component:DetallereciboComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ListadofincasComponent,
    FincasComponent,
    FicherosComponent,
    AddfincaComponent,
    ModfincaComponent,
    PropietariosComponent,
    AddpropietarioComponent,
    ModpropietarioComponent,
    ListadopropietarioComponent,
    InmueblesComponent,
    AddinmuebleComponent,
    ListadoinmuebleComponent,
    ModinmuebleComponent,
    InquilinosComponent,
    AddinquilinoComponent,
    ListadoinquilinoComponent,
    ModinquilinoComponent,
    RecibosComponent,
    ListadorecibosComponent,
    DetallepropietarioComponent,
    DetalleinquilinoComponent,
    AddreciboComponent,
    DetallereciboComponent,
    PaginafincaComponent,
    PaginainmuebleComponent,
    PaginainquilinoComponent,
    PaginapropietarioComponent,
    PaginarecibosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgPipesModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
