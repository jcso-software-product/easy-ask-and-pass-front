import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ProductoModalService } from './detalle/producto-modal.service';
import { Producto } from '../facturas/models/producto';
import { AuthService } from '../usuarios/auth.service';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productos: Producto[]; 
  paginador: any;
  productoSeleccionado: Producto;
  

  constructor(private productoService: ProductoService,
    private modalService: ProductoModalService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.productoService.getProductos(page)
        .pipe(
          tap(response => {
            console.log('ClientesComponent: tap 3');
            (response.content as Producto[]).forEach(producto => console.log(producto.nombre));
          })
        ).subscribe(response => {
          this.productos = response.content as Producto[];
          this.paginador = response;
        });
    });

    this.modalService.notificarUpload.subscribe(producto => {
      this.productos = this.productos.map(productoOriginal => {
        console.log(producto)
        console.log(productoOriginal)
        if (producto.id == productoOriginal.id) {
          productoOriginal.foto = producto.foto;
        }
        return productoOriginal;
      })
    })

  }


  delete(producto: Producto): void {


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Usted esta seguro?',
      text:  `¿Seguro que desea eliminar el producto ${producto.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(producto.id).subscribe
        (response => {
          this.productos = this.productos.filter(pr => pr !== producto)
          swalWithBootstrapButtons.fire(
            'Producto Eliminado!',
            `Producto ${producto.nombre} eliminado con éxito.`,
            'success'
          )
        })
        
      } 
    });

   
  }

  abrirModal(producto: Producto) {
    console.log(producto);
    this.productoSeleccionado = producto;
    this.modalService.abrirModal();
  }

  

}
