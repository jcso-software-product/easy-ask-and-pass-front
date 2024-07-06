import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap, map, catchError, throwError } from 'rxjs';
import { Producto } from '../facturas/models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  [x: string]: any;
  private urlEndPoint: string = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient, 
    private router: Router) { }

    getProducto(id): Observable<Producto> {
      return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          if (e.status != 401 && e.error.mensaje) {
            this.router.navigate(['/productos']);
            console.error(e.error.mensaje);
          }

          return throwError(() => e);
        }));
    }

    getProductos(page: number): Observable<any> {
      return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
        tap((response: any) => {
          console.log('ClienteService: tap 1');
          (response.content as Producto[]).forEach(producto => console.log(producto.nombre));
        }),
        map((response: any) => {
          (response.content as Producto[]).map(producto => {
            producto.nombre = producto.nombre.toUpperCase();
            return producto;
          });
          return response;
        }),
        tap(response => {
          console.log('ClienteService: tap 2');
          (response.content as Producto[]).forEach(producto => console.log(producto.nombre));
        }));
    }  


    guardar(producto: Producto): Observable<any> {
      return this.http.post(this.urlEndPoint, producto)
        .pipe(
          map((response: any) => response.producto as Producto),
          catchError(e => {
            if (e.status == 400) {
              return throwError(() =>e);
            }
            if (e.error.mensaje) {
              console.error(e.error.mensaje);
            }
            return throwError(() => e);
          }));
    }


    delete(id: number): Observable<Producto> {
      return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(() => e);
        }));
    }


    subirFoto(archivo: File, id: any): Observable<HttpEvent<{}>> {
      let formData = new FormData();
      formData.append("archivo", archivo);
      formData.append("id", id);
  
      const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
        reportProgress: true
      });
  
      return this.http.request(req);
    }

}
