import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './clientes/form.component';
import { PaginatorComponent } from './paginator/paginator.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';


import localES from '@angular/common/locales/es-CO'; 
import { LoginComponent } from './usuarios/login.component';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FacturasComponent } from './facturas/facturas.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { ClienteService } from './clientes/cliente.service';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProductosComponent } from './productos/productos.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { PaginadorComponent } from './productos/paginador/paginador.component';
import { ClientePedidoComponent } from './clientes/cliente-pedido/cliente-pedido.component';
import { RegistrarUsuarioComponent } from './usuarios/registrar-usuario/registrar-usuario.component';




registerLocaleData(localES, 'es'); 

const routes: Routes = [
  { path: '', redirectTo: '/clientes/identificacion', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'clientes/identificacion', component: ClientePedidoComponent },
  { path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'login', component: LoginComponent },
  { path: 'facturas/:id', component: DetalleFacturaComponent }, /*, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_USER' }*/
  { path: 'facturas/form/:clienteId', component: FacturasComponent}, /*, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } */
  { path: 'pedidos', component: PedidosComponent }, 
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/page/:page', component: ProductosComponent },
  { path: 'productos/form', component: CrearProductoComponent  }, /*, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } */
  { path: 'productos/form/:id', component: CrearProductoComponent}, /*, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } */
  { path: 'registrar', component: RegistrarUsuarioComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent,
    PedidosComponent,
    ProductosComponent,
    CrearProductoComponent,
    PaginadorComponent,
    ClientePedidoComponent,
    RegistrarUsuarioComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes), 
    BrowserAnimationsModule,
    MatDatepickerModule, 
    MatMomentDateModule,
    ReactiveFormsModule, 
    MatAutocompleteModule, 
    MatInputModule, 
    MatFormFieldModule


  ],
  providers: [ 
              ClienteService, {provide: LOCALE_ID, useValue: 'es'},
              { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
              
  bootstrap: [AppComponent]
})
export class AppModule { }
