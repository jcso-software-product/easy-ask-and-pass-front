import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Factura } from '../facturas/models/factura';
import { FacturaService } from '../facturas/services/factura.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html', 
  styleUrls: ['./pedidos.component.css']

})
export class PedidosComponent implements OnInit {

  public facturas: Factura[]; 
  factura: Factura; 

  constructor(private facturaService: FacturaService,
    public authServ: AuthService) { }

  ngOnInit(): void {

    this.refreshList(); 

    console.log(this.authServ.usuario); 

  }

  
   refreshList():void {
    this.facturaService.getFacturas().subscribe(factura => this.facturas = factura as Factura[]); 
   }


   update(factura: Factura, estado: string): void{

    factura.estado = estado; 
    console.log(factura); 

    if(estado != 'CANCELADO'){
        this.updateFactura(factura,  `Pedido del estudiante ${factura.cliente.nombre}  ${factura.cliente.apellido} despachado con exito!`)
    } else {
      this.validarCancelacion(factura); 
    }

  }

  updateFactura(factura:Factura,  msg:string){
    this.facturaService.update(factura)
    .subscribe({
      next: (factura) => {
        this.refreshList(); 
        Swal.fire(msg, 'success');
      },
      error: (err) => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    });
  }


  validarCancelacion(factura: Factura): void {

    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Usted esta seguro?',
      text:  `¿Seguro que desea cancelar el pedido del estudiante ${factura.cliente.nombre}  ${factura.cliente.apellido} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        let msg: string = `Pedido del estudiante ${factura.cliente.nombre} ${factura.cliente.apellido} cancelado con éxito.`; 
          this.updateFactura(factura, msg); 
          swalWithBootstrapButtons.fire(
            'Pedido Cancelado!',
            msg,
            'success'
          );
          this.refreshList(); 

      } 
    });

  }

}
