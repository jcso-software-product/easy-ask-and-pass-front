import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/facturas/models/producto';
import Swal from 'sweetalert2';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html'
})
export class CrearProductoComponent implements OnInit {


  public producto: Producto = new Producto();
  public titulo: string = "Crear Producto";

  public errores: string[];

  constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.productoService.getProducto(id).subscribe((producto) => this.producto = producto);
      }
    });

  }


  create(): void {
    console.log(this.producto);
    this.productoService.guardar(this.producto)
      .subscribe({
        next: (producto) => {
          this.router.navigate(['/productos']);
          Swal.fire('Nuevo cliente', `El producto ${producto.nombre} ha sido creado con éxito`, 'success');
        },
        error: (err) => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      }
      );
  }

  update(): void {
    console.log(this.producto);
    this.productoService.guardar(this.producto)
      .subscribe({
        next: (json) => {
          this.router.navigate(['/productos']);
          Swal.fire('Producto Actualizado', `${json.mensaje}: ${json.producto.nombre}`, 'success');
        },
        error: (err) => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      })
  }

}
