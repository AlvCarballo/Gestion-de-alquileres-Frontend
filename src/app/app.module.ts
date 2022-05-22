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

const routes: Routes = [
  {path: '', redirectTo:'/ficheros', pathMatch:'full'},
  {path: 'ficheros', component:FicherosComponent},
  {path: 'ficheros/fincas', component:FincasComponent},
  {path: 'ficheros/fincas/modfinca/:id', component:ModfincaComponent},
  {path: 'ficheros/propietarios', component:PropietariosComponent},
  {path: 'ficheros/propietarios/modpropietario/:id', component:ModpropietarioComponent},
  {path: 'ficheros/inmuebles', component:InmueblesComponent},
  {path: 'ficheros/inmuebles/finca/:idfincainmueble', component:InmueblesComponent},
  {path: 'ficheros/inmuebles/propietario/:idpropietarioinmueble', component:InmueblesComponent},
  {path: 'ficheros/inmuebles/modinmueble/:id', component:ModinmuebleComponent},
  {path: 'ficheros/inquilinos', component:InquilinosComponent},
  {path: 'ficheros/inquilinos/modinquilino/:id', component:ModinquilinoComponent},
  {path: 'recibos', component:RecibosComponent},
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
